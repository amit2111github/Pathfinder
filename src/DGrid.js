import React,{useState}from "react";
const Row = ({M , N ,grid,changeValue , setEndPoints,cords , path}) => {
	const elem = [];
	for(let i = 1;i <= M;i++) {
		let classname = (cords?.sx === N && cords?.sy === i)?"start":"";
		classname = (cords?.ex === N && cords?.ey === i)? "end" : classname;
		for(let z of path) {
			if(z[0] + 1 === N && z[1] + 1 === i) {
				classname = " path";
			}
		}
		elem.push(
			<input style = {{textAlign : "center" , fontSize : "20px"}}onChange = {changeValue} id = "cell" key = {i} r = {N} c = {i} value = {grid[N-1][i-1]} onClick=  {setEndPoints} className= {classname} />
		);
	}
	return (
		<div id = "row">
			{elem}
		</div>
	)
}
const DGrid  = ({N , M, grid,changeValue , setEndPoints,cords , path}) => {
	let elem = [];
	for(let i = 1;i <= N;i++) {
		elem.push(<Row M = {M} key = {i} N = {i} grid= {grid} path = {path}cords ={cords} changeValue= {changeValue} setEndPoints = {setEndPoints}/>)
	}
	return (
		<div id = "grid">
			{elem}
		</div>
	)
}
export default DGrid;