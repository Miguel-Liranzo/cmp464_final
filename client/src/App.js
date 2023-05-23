import { useState, useEffect } from 'react';

function App() {
	return (
		<div className="App">
			<h1>Your Tasks</h1>
			<div className="todos">
				<div className="todo">
					<div className="checkbox"></div>
					<div className="text">Get bread</div>
					<div className="delete-todo"></div>
				</div>
				<div className="todo is-complete">
					<div className="checkbox"></div>
					<div className="text">Get chicken</div>
					<div className="delete-todo"></div>
				</div>
			</div>
		</div>
	);
}

export default App;
