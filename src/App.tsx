import React, { useState } from 'react'
import './App.css'

const BLUE_BG_COLOR = '#90CDF4'
const RED_BG_COLOR = '#FEB2B2'

export default function App() {
	console.log('Parent rendering')
	return (
		<div className='app'>
			<h1>Application</h1>
			<Parent>
				<Child name='Nicolas' />
				<Child name='David' />
			</Parent>
		</div>
	)
}

function Parent({ children }: { children: React.ReactNode }) {
	console.log('Parent rendering')
	return (
		<div className='parent'>
			<h1>Parent</h1>
			<div className='children'>{children}</div>
		</div>
	)
}

function Child({ name }: { name: string }) {
	const [bgColor, setBgColor] = useState('white')

	console.log(`Child ${name} rendering`)

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
