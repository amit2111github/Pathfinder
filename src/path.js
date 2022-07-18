import React,{useState} from "react";
import Dijsktra from "./Dijsktra"
import App from "./App"
const Path = () => {
	const [method , setMethod] = useState(1);
	return (
		<div className="App">
			<h1>Path Finder</h1>
			<h3>{method?"Unweighted Graph" : "Weighted Graph"}</h3>
			<button onClick = {e => setMethod(1)}>UnWeighted Graph</button>
			<button onClick = {e => setMethod(0)}>Weighted Graph </button>
			<div style = {{marginTop : "50px"}}>
				{method?<App/>:<Dijsktra/>}
			</div>
		</div>
	)
}
export default Path;