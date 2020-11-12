import React from 'react'
import './App.css'

export default function App() {
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
	return (
		<div className='parent'>
			<h1>Parent</h1>
			<div className='children'>{children}</div>
		</div>
	)
}

function Child({ name }: { name: string }) {
	return (
		<div className={`child ${name}`}>
			<h1>Child: {name}</h1>
		</div>
	)
}
