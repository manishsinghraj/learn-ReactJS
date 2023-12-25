import React from 'react'
import { buyCake } from '../redux';
import { connect } from 'react-redux';


const CakeContainer = (props) => {
    return (
        <div>
            <h2>Number of Cakes 🍰 = {props.numberOfCakes}</h2>
            <button onClick={props.buyCake}>Buy Cake</button>
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
        buyCake: () => dispatch(buyCake())
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(CakeContainer)



