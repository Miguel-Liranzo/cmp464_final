import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:3001";

function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		getTodos();
		console.log(todos);
	}, []);

	const getTodos = async () => {
		const data = await fetch(API_BASE + "/todos")
			.then(res => res.json())
			.catch(err => console.error("Error: ", err))

			setTodos(data);
	}

	const completeTodo = async id => {
		const data = await fetch(API_BASE + "/todo/complete/" + id, {
			method: "PUT"
		}).then(res => res.json()).then(res => console.log(res.text + ", " + res.complete + ", " + res._id));
 
		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) todo.complete = data.complete;
			return todo;
		}))
	}

	const deleteTodo = async id => {
		const data = await fetch(API_BASE + "/todo/delete/" + id, {
			method: "DELETE"
		}).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}

	return (
		<div className="App">
			<h1>Welcome, Miguel</h1>
			<h4>Your Tasks</h4>
			<div className="todos">
				{todos.map(todo => (
					<div className={"todo" + (todo.complete ? " is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}>

						<div className="checkbox"></div>

						<div className="text">{ todo.text }</div>

						<div 
							className="delete-todo" 
							onClick={() => deleteTodo(todo._id)}>x
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
