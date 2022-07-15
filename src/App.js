import logo from './logo.svg';
import './App.css';
import {useState , useEffect} from "react";
import Grid   from "./Grid"
function App() {
  const [N , setN] = useState(0);
  const [M , setM] = useState(0);
  const [grid , setGrid] = useState(null);
  const [start , setStart] = useState(false);
  const [cords , setCords] = useState({sx : -1 ,sy : -1 , ex : -1 ,ey : -1});
  const [foundPath , setFoundPath] = useState(new Set());
  const [takeObstacle ,  setTakeObstacle] = useState(false);
  const [obstacle , setObstacle] = useState([]);
  // console.log("A PATH SET " , foundPath);
  const dijkstra = () => {
    setTakeObstacle(false);
    // 1 is start 2 is end 0 is free -1 is obstacle;
    if(!cords) return;
    const colx = [1 ,-1 ,0,0] , coly = [0,0,1,-1];
    for(let i = 0;i < N;i++) {
      for(let j = 0;j < M;j++) {
        if(i == cords.sx-1 && j == cords.sy-1) grid[i][j] = 1; //start
        else if(i == cords.ex-1 && j == cords.ey-1) grid[i][j] = 2; // end
        else grid[i][j] = 0;
      }
    }
    for(let a of obstacle) {
      grid[a[0]-1][a[1]-1] = -1;
    }  
    // for(let a of grid) {
    //   console.log(a , " grid");
    // }

    let que = [[cords.sx-1 , cords.sy-1]];
    const s = new Set();
    let parent = new Map();
    let vis = new Set();
    vis.add((cords.sx-1) + " " +(cords.sy-1));
    let found = false;
    outer : while(que.length > 0) {
      let size = que.length;
      // for(let z of que) console.log(z);
      // console.log("end");
      while(size-- > 0) {
        let [x , y] = que.shift();
        if(Number(grid[x][y]) === 2) {
          found = true;
        }
        for(let i = 0;i < 4;i++) {
          let nx = x + colx[i],ny =  y + coly[i];
          if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
          if(vis.has(nx + " " + ny)) continue;
          if(grid[nx][ny] == -1) continue;
          vis.add(nx + " " + ny);
          que.push([nx , ny]);
          parent.set(nx + " " + ny , x +" " + y);
        }
      }
    }
    let path = [] , cx = cords.ex -1, cy = cords.ey-1;
    path.push([+cx , +cy]);
    while(cx != cords.sx-1 || cy != cords.sy-1) {
      if(!parent.has(cx + " " + cy))  break;
      let compress = cx + " " + cy;
      cx = parent.get(compress).split(" ")[0];
      cy = parent.get(compress).split(" ")[1];
      path.push([+cx , +cy]);
      // console.log(cx , cy);
    }
    path.reverse();
    // console.log(parent);
    // for(let z of path) console.log(z , "Path");
    if(!found) {
      alert("No Path is Available");
      return;
    }
    const g = new Set();
    for(let pair of path) {
      g.add((pair[0] + 1) + " " + (pair[1] + 1));
    }
    setFoundPath(g);
  }
  const makeGrid = () => {

    if(!N || !M ||N < 1 || M < 1) return;
    let g = [];
    for(let i = 1;i <= N;i++) {
      g.push(new Array(M));
    }
    setGrid(g);
    setStart(true);
    setTimeout(() => {
      alert("Tap on Two Cell , start and end cell respectively");
    },100);
  }
  useEffect(() => {
    if(cords.sx != -1 && cords.sy != -1 && cords.ex != -1 && cords.ey != -1) {
      setTakeObstacle(true);
      setTimeout(() => {
       alert("Now press on cells which u want to be blocked\n Then press Find Path button") 
      } , 100);
    }
  },[cords]);
  const setEndPoints = (e) => {
    if(takeObstacle) {
      let nx = Number(e.target.attributes.r.value) , ny = Number(e.target.attributes.c.value);
      if(nx == cords.ex && ny == cords.ey) {
        alert("Target cell can not have obstacle");
        return;
      }
      if(nx == cords.sx && ny == cords.sy) {
        alert("start cell can not have obstacle");
        return;
      }
      setObstacle(old => [...old , [nx , ny]]);
      return;
    }
    if(e.target.id !== "cell") return;
    if(cords.sx != -1 && cords.sy != -1 && cords.ex != -1 && cords.ey != -1) return;
    if(cords.sx === -1 || cords.sy === -1) {
      setCords({...cords , sx: Number(e.target.attributes.r.value) , sy : Number(e.target.attributes.c.value)});
    }
    else setCords({...cords , ex: Number(e.target.attributes.r.value) , ey :Number(e.target.attributes.c.value)});
  }
  return (
    <div className="App">
      <h1>Path Finder</h1>
      <div>
        <input type = "number" placeholder = "Enter Row" min = {1} max = {20} onChange = {e => setN(e.target.value)}/>
        <input type = "number" placeholder = "Enter Column" min = {1} max = {20} onChange = {e => setM(e.target.value)}/>
        <button onClick = {e => makeGrid()}>Make Grid</button>
      </div>
      {(N && M&& N > 0 && M > 0 &&start)?<Grid N = {N} M = {M} setEndPoints= {setEndPoints} cords = {cords} foundPath = {foundPath} obstacle = {obstacle}/>:<p></p>}
      <button onClick = {dijkstra}>Find Path</button>
    </div>

  );
}

export default App;
