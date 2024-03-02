import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGetTodosQuery } from "./api/mainApi";
import { TodoTypes } from "./lib/types";
import { Link } from "react-router-dom";

function App() {
	const [count, setCount] = useState(0);
	const {
		data: todos,
		// currentData,
		error,
		// isUninitialized,
		isLoading,
		isSuccess,
		isError,
		// isFetching,
		// refetch
	} = useGetTodosQuery();
	//    		^
	// Query Hook Options:
	// useGetTodosQuery(queryArg?, queryOptions?)
	// queryOptions => skip, pollingInterval, selectFromResult,
	// refetchOnMountOrArgChange, refetchOnFocus, refetchOnReconnect

	let content;
	if (isLoading) {
		content = <p>Loading...!</p>;
	} else if (isSuccess) {
		content = (
			<ul style={{ listStyle: "numeric" }}>
				{todos.map((todo: TodoTypes) => (
					<li key={todo.id} style={{ color: "crimson", textAlign: "left" }}>
						<Link to={`/post/${todo.id}`}>{todo.title}</Link>
					</li>
				))}
			</ul>
		);
	} else if (isError) {
		content = JSON.stringify(error);
	}

	return (
		<>	
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				{content}
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
