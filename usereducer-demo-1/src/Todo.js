import React from 'react';
import { ACTIONS } from './App.js';

export const Todo = ({ todo, dispatch }) => {
    return (
        <>
            <div className='todo'>
                <span style={todo.completed ? { color: "#00000", textDecoration: 'line-through' } : {}}>
                    {todo.name}
                </span>
            </div>
            <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}>Toggle</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}>Delete</button>
        </>
    );
};
