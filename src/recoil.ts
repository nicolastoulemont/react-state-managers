import { useCallback, useEffect, useState } from 'react'

// The StatefulValue is the most basic node in our system
type Disconnecter = { disconnect: () => void }
type Listener<T> = (value: T) => void
class StatefulValue<T> {
	private listeners = new Set<(value: T) => void>()

	constructor(protected value: T) {}

	protected _update(value: T) {
		// Update internal value
		this.value = value
		// Emit to trigger listeners
		this.emitEventForListeners()
	}

	snapshot(): T {
		return this.value
	}

	emitEventForListeners() {
		// Run all the listeners
		this.listeners.forEach((listener) => listener(this.snapshot()))
	}

	subscribe(listener: Listener<T>): Disconnecter {
		this.listeners.add(listener)
		return {
			disconnect: () => {
				this.listeners.delete(listener)
			}
		}
	}
}

// Selectors
interface GeneratorContext {
	get: <Value>(dependency: StatefulValue<Value>) => Value
}

type SelectorGenerator<T> = (context: GeneratorContext) => T

export class Selector<T> extends StatefulValue<T> {
	private registeredDeps = new Set<StatefulValue<any>>()

	private getDep<V>(dep: StatefulValue<V>): V {
		if (!this.registeredDeps.has(dep)) {
			dep.subscribe(() => this.updateSelector())
			this.registeredDeps.add(dep)
		}
		return dep.snapshot()
	}

	// A helper method for running the internal generator method, updating dependencies,
	// returning the computed state and updating all listeners.
	private updateSelector() {
		this._update(this.generate({ get: (dep) => this.getDep(dep) }))
	}

	constructor(private readonly generate: SelectorGenerator<T>) {
		super(undefined as any)
		this.value = generate({
			get: (dep) => this.getDep(dep)
		})
	}
}

// The Atom is basically just a StateFulValue
class Atom<T> extends StatefulValue<T> {
	update(value: T) {
		super._update(value)
	}
}

interface AtomInput<V> {
	key: string
	default: V
}

export function atom<V>(value: AtomInput<V>): Atom<V> {
	return new Atom(value.default)
}

interface SelectorInput<V> {
	key: string
	get: SelectorGenerator<V>
}

export function selector<V>(value: SelectorInput<V>): Selector<V> {
	return new Selector(value.get)
}

export function useCoiledValue<T>(value: StatefulValue<T>): T {
	const [, setState] = useState({})

	useEffect(() => {
		// Update the state in the listener to force a re-render and get the new value
		const { disconnect } = value.subscribe(() => setState({}))
		// The useEffect clean up function that is run after each effect remove the listener
		// to avoid having duplicate listeners
		return () => disconnect()
	}, [value])

	return value.snapshot()
}

export function useCoiledState<T>(atom: Atom<T>): [T, (value: T) => void] {
	const value = useCoiledValue(atom)
	return [value, useCallback((value) => atom.update(value), [atom])]
}
