import React, { useState } from 'react'
import './App.css'

const BLUE_BG_COLOR = '#90CDF4'
const RED_BG_COLOR = '#FEB2B2'

export default function App() {
	console.log('Application rendering')
	return (
		<div className='app'>
			<h1>Application</h1>
			<Parent />
		</div>
	)
}

function Parent() {
	const [nameOne, setNameOne] = useState('Nicolas')
	const [nameTwo, setNameTwo] = useState('David')
	console.log('Parent rendering')
	return (
		<div className='parent'>
			<h1>Parent</h1>
			<div className='inputs'>
				<input value={nameOne} onChange={(e) => setNameOne(e.target.value)} />
				<input value={nameTwo} onChange={(e) => setNameTwo(e.target.value)} />
			</div>

			<div className='children'>
				<Child name={nameOne} />
				<Child name={nameTwo} />
			</div>
		</div>
	)
}

interface ChildProps {
	name: string
}

function Child({ name }: ChildProps) {
	console.log(`Child ${name} rendering`)
	const [bgColor, setBgColor] = useState('white')

	return (
		<div className={`child ${name}`} style={{ backgroundColor: bgColor }}>
			<h1>Child: {name}</h1>
			<div>
				<button onClick={() => setBgColor(RED_BG_COLOR)}>Rouge</button>
				<button onClick={() => setBgColor(BLUE_BG_COLOR)}>Bleu</button>
			</div>
		</div>
	)
}
