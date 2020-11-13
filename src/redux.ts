interface StandardReactAction {
	type: string
	payload?: unknown
}

interface InitialState {
	[key: string]: any
}

interface NextState {
	[key: string]: any
}

type ReducerFunction = (action: StandardReactAction, state: InitialState) => NextState

type ListenerFunction = () => void

function createStore(
	reducer: ReducerFunction,
	initialState: InitialState = {
		counter: 0
	}
) {
	let state = initialState
	let listeners: Array<ListenerFunction> = []

	function getState() {
		// Return a COPY of the current state to prevent
		// mutatble change to the state from sources other than
		// actions
		return { ...state }
	}

	function dispatch(action: StandardReactAction) {
		// Create the nextState
		const nextState = reducer(action, state)

		if (JSON.stringify(nextState) !== JSON.stringify(state)) {
			// Update the store state
			state = nextState
			// Run every listeners
			listeners.forEach((listener) => listener())
		}
	}

	function subscribe(listener: ListenerFunction) {
		// Add listener
		const length = listeners.push(listener)
		return () => listeners.splice(length - 1, 1)
	}

	return {
		getState,
		dispatch,
		subscribe
	}
}

const reducer: ReducerFunction = (action, state = { count: 0 }) => {
	switch (action.type) {
		case 'UP':
			return {
				...state,
				counter: state.counter + 1
			}
		case 'DOWN':
			return {
				...state,
				counter: state.counter - 1
			}

		default:
			return state
	}
}

const store = createStore(reducer)
export { store }
