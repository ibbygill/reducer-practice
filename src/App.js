import React, { useReducer, useState } from 'react';
import Todo from './Todo.js'

export const ACTIONS = {
  // INCREMENT: 'increment',
  // DECREMENT: 'decrement'
  TOGGLE_TODO: 'toggle-todo',
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo'
}


function reducer(todos, action) {

  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      // pass in dispatch function into the todo at the bottom
      return todos.map( todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      // DELETE TODO
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
  // switch (action.type) {
  //   case ACTIONS.INCREMENT:
  //     return { count: state.count + 1}
  //   case ACTIONS.DECREMENT:
  //     return { count: state.count - 1}
  //   default:
  //     return state
  // }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false }
}

function App() {

  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('')
  // dispatch = what we call inorder to update our state
  // using an object for our variable therefore using **STATE**

  // function decrementCount () {
  //   // setCount(prevCount => prevCount - 1)
  //   // setTheme('blue')
  //   dispatch({ type: ACTIONS.DECREMENT })
  // }

  // function incrementCount () {
  //   dispatch({ type: ACTIONS.INCREMENT })
  // }

function handleSubmit(e) {
  e.preventDefault()
  dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
  // type is what we are going to do
  // payload is what we will be changing depending on the parameters
  setName('')
}

console.log(todos)

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName
      (e.target.value)} />
    </form>

    {todos.map(todo => {
      return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
    })}
    {/* <button onClick={decrementCount}> - </button>
    <span> {state.count} </span>
    <button onClick={incrementCount}> + </button> */}
    </>
  )
}

export default App;
