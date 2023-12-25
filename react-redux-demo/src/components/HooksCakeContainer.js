import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCake } from '../redux';


export const HooksCakeContainer  = () => {

    const numberOfCakes = useSelector(state => state.cake.numberOfCakes);
    const dispatch = useDispatch();

    return (
        <div>
            <h3>using Hooks</h3>
            <h2>Number of Cakes 🍫 = {numberOfCakes}</h2>
            <button onClick={() => dispatch(buyCake())}>Buy Cake</button>
        </div>
    )
}
