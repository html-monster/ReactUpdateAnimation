import ReactDOM from'react-dom';
import React from 'react';

let AnimateOnUpdate = require('./components/Animation.jsx');

import './index.css';

class AnimationTest extends React.Component
{
	constructor()
	{
		super();
		this.state = { numbers: [
			{
				firstNumber: 22,
				secondNumber: 44
			},
			{
				firstNumber: 13,
				secondNumber: 15
			},
			{
				firstNumber: 6,
				secondNumber: 66
			}
		]};
	}

	render()
	{
		let data = this.state.numbers;
		let cellAnimate = data.map((row, index) =>
			<AnimateOnUpdate
				component="tr"
				key={index}
				transitionName={{
					enter: 'changed',
					appear: 'changed'
				}}
				transitionAppear={true}
				transitionLeave={false}
				transitionAppearTimeout={800}
				transitionEnterTimeout={800}
				data={row}
			>
				<td data-verify={'firstNumber'}>{row.firstNumber}</td>
				<td data-verify={'secondNumber'}>{row.secondNumber}</td>
			</AnimateOnUpdate>
		);
		let rowAnimate = data.map((row, index) =>
			<AnimateOnUpdate
				component="tr"
				key={index}
				transitionName={{
					enter: 'changed',
					appear: 'changed'
				}}
				transitionAppear={true}
				transitionLeave={false}
				transitionAppearTimeout={800}
				transitionEnterTimeout={800}
				data={row}
			>
				<td data-verify={['firstNumber', 'secondNumber']}>{row.firstNumber}</td>
				<td data-verify={['firstNumber', 'secondNumber']}>{row.secondNumber}</td>
			</AnimateOnUpdate>
		);
		return (
			<div>
				<button onClick={::this.updateNumbers}>Update</button>
				<button onClick={::this.addRow}>Add row</button>
				<button onClick={::this.startUpdating}>Start Updating</button>
				<p>Table Animation</p>
				<table>
					<thead>
						<tr>
							<th>First number</th>
							<th>Second number</th>
						</tr>
					</thead>
					<tbody>
						{cellAnimate}
					</tbody>
				</table>
				<table className="row_animate">
					<thead>
						<tr>
							<th>First number</th>
							<th>Second number</th>
						</tr>
					</thead>
					<tbody>
						{rowAnimate}
					</tbody>
				</table>
			</div>
		);
	}

	//This block of code simulates the data update =====================================================================
	updateNumbers()
	{
		let newState = [];
		this.state.numbers.forEach((item) => {
			let newItem = Object.assign({}, item);
			if(this.randomInteger(0, 1)){
				if(this.randomInteger(0, 1)) newItem.firstNumber = this.randomInteger(0, 99);
				if(this.randomInteger(0, 1)) newItem.secondNumber = this.randomInteger(0, 99);
			}
			newState.push(newItem)
		});
		// console.log(this.state.numbers);
		// console.log(newState);
		this.setState({ numbers: newState });
	}

	addRow()
	{
		let state = Object.assign({}, this.state);
		let newRow = {
			firstNumber: this.randomInteger(0, 99),
			secondNumber: this.randomInteger(0, 99)
		};
		state.numbers.push(newRow);
		this.setState(state);
	}

	startUpdating()
	{
		setInterval(::this.updateNumbers, 1000);
		setInterval(::this.addRow, 5000);
	}

	randomInteger(min, max) {
		let rand;

		function isInteger(num) {
			return (num ^ 0) === num;
		}

		if(isInteger(min) && isInteger(max)){
			rand = min - 0.5 + Math.random() * (max - min + 1);
			rand = Math.round(rand);
		}
		else{
			rand = min + Math.random() * (max - min);
			rand = rand.toFixed(2);
		}

		return rand;
	}
	//This block of code simulates the data update =====================================================================
}

if(document.getElementById('mount-point')){
	ReactDOM.render(
			<AnimationTest />,
			document.getElementById('mount-point')
	);
}
