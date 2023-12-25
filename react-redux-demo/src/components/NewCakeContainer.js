import React, { useState } from 'react'
import { buyCake } from '../redux';
import { connect } from 'react-redux';


const NewCakeContainer = (props) => {

    const [number, setNumber] = useState(1);

    return (
        <div>
            <h3>Action Payload</h3>
            <h2>Number of Cakes 🍰 = {props.numberOfCakes}</h2>
            <input type='text' value={number} onChange={(e) => setNumber(e.target.value)} />
            <button onClick={() => props.buyCake(number)}>Buy Cake</button>
        </div>
    )
}


const mapStatetoProps = (state) => {
    return {
        numberOfCakes: state.cake.numberOfCakes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyCake: (number) => dispatch(buyCake(number))
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(NewCakeContainer)



