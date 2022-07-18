import React from "react";
const Row = ({M , N , setEndPoints,cords , foundPath , obstacle}) => {
	const elem = [];
	for(let i = 1;i <= M;i++) {
		let textContent = "";
		let cellInPath = foundPath.has(N + " " + i);
		let obstacleInPath = false;
		obstacle.forEach(ob => {
			if(ob[0] == N && ob[1] == i) {
				obstacleInPath = true;
				textContent = 'X';
			} 
		});
		let className;
		if(N === cords.sx && i === cords.sy) {
			className = "start";
			textContent  = "S";
		}
		if(N === cords.ex && i === cords.ey) {
			className = "end";
			textContent = "E";
		}
		if(cellInPath) className = "path";
		if(obstacleInPath) className = "obstacle";
		elem.push(
			<div id = "cell" key = {i} r = {N} c = {i} className = {className} onClick  = {setEndPoints}>
				{textContent}
			</div>
		);
	}
	return (
		<div id = "row">
			{elem}
		</div>
	)
}
const Grid = ({N, M , setEndPoints,cords , foundPath , obstacle}) => {
	let elem = []
	for(let i = 1;i <= N;i++) {
		elem.push(<Row M = {M} key = {i} N = {i} setEndPoints=  {setEndPoints} cords = {cords} obstacle = {obstacle} foundPath = {foundPath}/>)
	}
	return (
		<div id = "grid">
			{elem}
		</div>
	)
}
export default Grid;