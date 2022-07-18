import React,{useState,useEffect}from "react";
import DGrid from "./DGrid";
const Dijkstra  = () => {
	const [N , setN] = useState(0);
  	const [M , setM] = useState(0);
  	const [grid , setGrid] = useState(null);
  	const [start , setStart] = useState(false);
  	const [calculate , setCalculate] = useState(false);
  	const [cords , setCords] = useState({sx : -1 ,sy : -1 , ex : -1 ,ey : -1});
  	const [path , setPath] = useState([]);
  	const [totalCost , serTotalCost] = useState(null);
  	const changeValue = (e) => {
		setGrid(old => {
			const g = [...old];
			g[Number(e.target.attributes.r.value)-1][Number(e.target.attributes.c.value)-1] = +e.target.value;
			return g;

		})
  	}
  	useEffect(()=> {
  		if(calculate) {
  			alert("Click on cell for starting  and Ending point.");
  		}
  	},[calculate]);
  	const setEndPoints = (e) => {
  		console.log("HERE");
  		if(e.target.id !== "cell") return;
  		if(calculate) {
  			if(cords.sx != -1 && cords.sy != -1 && cords.ex != -1 && cords.ey != -1) return;
  			if(cords.sx === -1 || cords.sy === -1) {
  			  setCords({...cords , sx: Number(e.target.attributes.r.value) , sy : Number(e.target.attributes.c.value)});
  			}
  			else setCords({...cords , ex: Number(e.target.attributes.r.value) , ey :Number(e.target.attributes.c.value)});
  		}
  	}
  	const dijkstra = () => {
  		if(!cords) return;
  		const colx = [1 ,-1 ,0,0] , coly = [0,0,1,-1];
  		console.log(cords);
  		let que = [ [cords.sx-1 , cords.sy-1 , grid[cords.sx-1][cords.sy-1]] ];
  		let parent = new Map() , vis = new Set() , distance = new Map();
  		for(let i = 0;i<N;i++) {
  			for(let j = 0;j < M;j++) {
  				distance.set(i + " " + j , Infinity);
  			}
  		}
  		distance.set((cords.sx-1) + " " + (cords.sy-1) , grid[cords.sx-1][cords.sy-1]);
  		vis.add((cords.sx-1) + " " +(cords.sy-1));
  		// console.log(que);
  		while(que.length > 0) {
  		  let [x , y , cost] = que.pop();
  		  // console.log(x  , y , cost);
  		  if(x == cords.ex-1 && y == cords.ey-1) break;
  		  vis.add(x + " " + y);
  		  for(let i =0;i < 4;i++) {
  		  	let nr = colx[i] + x , nc = coly[i] + y;
  		  	if(nr < 0 || nc < 0 || nr >= N || nc >= M) continue;
  		  	if(vis.has(nr + " " + nc)) continue;
  		  	if(distance.get(nr + " "+ nc) > cost + grid[nr][nc]) {
  		  		distance.set(nr + " " + nc , cost + grid[nr][nc]);
  		  		que.push([nr , nc ,cost + grid[nr][nc]]);
  		  		parent.set(nr + " " + nc , x + " " + y);
  		  		que.sort((one , two) => two[2]-one[2]);
  		  	}
  		  }
  		}
  		let path = [] , cx = cords.ex -1 , cy = cords.ey-1;
  		path.push([cx ,cy]);
  		let sum = grid[cx][cy];
  		while(cx != cords.sx-1 || cy != cords.sy-1) {
  			if(!parent.has(cx + " " + cy)) break;
  			let comp = parent.get(cx + " " + cy);
  			cx = Number(comp.split(" ")[0]) ; cy = Number(comp.split(" ")[1]);
  			sum += grid[cx][cy];
  			path.push([cx ,cy]);
  		}
  		path.reverse();
  		if(path[0][0] != cords.sx-1 || path[0][1] != cords.sy-1) {
  			alert("No path found");
  			return;
  		}
  		setPath(path);
  		serTotalCost(sum);
  	}
  	const makeGrid = () => {
  	  if(!N || !M ||N < 1 || M < 1) return;
  	  let g = [];
  	  for(let i = 1;i <= N;i++) {
  	  	const gcol = new Array(M);
  	  	for(let j = 0;j < M;j++) {
  	  		gcol[j] = Math.floor(Math.random()*(10 - 1))+ 1;
  	  	}
  	    g.push(gcol);
  	  }
  	  setGrid(g);
  	  setStart(true);
  	  setTimeout(() => {
  	    alert("Change Value of Grid to new distance if u want Then Press Done Button");
  	  },30);
  	}
	return (
		<div>
		  <div>
		    <input type = "number" placeholder = "Enter Row" min = {1} max = {20} onChange = {e => setN(e.target.value)}/>
		    <input type = "number" placeholder = "Enter Column" min = {1} max = {20} onChange = {e => setM(e.target.value)}/>
		    <button onClick = {e => makeGrid()}>Make Grid</button>
		    {start && N > 0 && M > 0 ? <DGrid grid = {grid} N = {N} M = {M} changeValue = {changeValue} setEndPoints = {setEndPoints} cords = {cords} path = {path}/> : <p/>}
		  </div>
		  {start && !calculate && <button style = {{marginTop : "20px"}}onClick = {e => setCalculate(o => !o)}>Done</button>}
		  {start && calculate && <button onClick = {dijkstra} style = {{marginTop : "20px"}}>Calculate</button>}
		  {totalCost && <p>Total Cost is {totalCost}</p>}
		  {start && <p> Note grid[r][c] means that it will cost grid[r][c] to go from (r , c) to any adjacent cell.</p>}
		</div>
	)
}
export default Dijkstra;