import React from "react";
const Row = ({M , N , setEndPoints,cords , foundPath , obstacle}) => {
	const elem = [];
	for(let i = 1;i <= M;i++) {
		let cellInPath = foundPath.has(N + " " + i);
		let obstacleInPath = false;
		obstacle.forEach(ob => {
			if(ob[0] == N && ob[1] == i) obstacleInPath = true;
		});
		let className = (N === cords.sx && i === cords.sy)?"start":"";
		className = (N === cords.ex && i === cords.ey)?"end":className;
		className  += (cellInPath?" path":"");
		className += (obstacleInPath?" obstacle":"");
		elem.push(
			<div id = "cell" key = {i} r = {N} c = {i} className = {className} onClick  = {setEndPoints}>
				{obstacleInPath?"X":className.substr(0,1)}
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