import React, { useState } from 'react'
import './App.css'
import { atom, useCoiledState } from './recoil'

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
	const [nameThree, setNameThree] = useState('Mathieu')
	console.log('Parent rendering')
	return (
		<div className='parent'>
			<h1>Parent</h1>
			<div className='inputs'>
				<input value={nameOne} onChange={(e) => setNameOne(e.target.value)} />
				<input value={nameTwo} onChange={(e) => setNameTwo(e.target.value)} />
				<input value={nameThree} onChange={(e) => setNameThree(e.target.value)} />
			</div>

			<div className='children'>
				<Child name={nameOne} nameKey='Nicolas' />
				<Child name={nameTwo} nameKey='David' />
				<Child name={nameThree} nameKey='Mathieu' />
			</div>
		</div>
	)
}

interface ChildProps {
	name: string
	nameKey: 'Nicolas' | 'David' | 'Mathieu'
}

const atoms = {
	Nicolas: atom({
		key: 'Nicolas',
		default: 0
	}),
	David: atom({
		key: 'David',
		default: 1
	}),
	Mathieu: atom({
		key: 'Mathieu',
		default: 2
	})
}

function Child({ name, nameKey }: ChildProps) {
	console.log(`Child ${name} rendering`)
	const [bgColor, setBgColor] = useState('white')
	const [value, setValue] = useCoiledState(atoms[nameKey])

	return (
		<div className={`child ${name}`} style={{ backgroundColor: bgColor }}>
			<h1>Child: {name}</h1>
			<h1>Value: {value}</h1>
			<div>
				<button onClick={() => setBgColor(RED_BG_COLOR)}>Rouge</button>
				<button onClick={() => setBgColor(BLUE_BG_COLOR)}>Bleu</button>
			</div>
			<div>
				<button onClick={() => setValue(value + 1)}>Add</button>
				<button onClick={() => setValue(value - 1)}>Subtract</button>
			</div>
		</div>
	)
}
