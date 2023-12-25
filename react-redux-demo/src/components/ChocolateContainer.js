import React from 'react'
import { buyChocolate } from '../redux'
import { connect } from 'react-redux'

const ChocolateContainer = (props) => {
    return (
        <div>
            <h2>Number of Chocolates 🍫 = {props.numberOfChocolates}</h2>
            <button onClick={props.buyChocolate}>Buy Chocolate</button>
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        numberOfChocolates: state.chocolate.numberOfChocolates
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyChocolate: () => dispatch(buyChocolate())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ChocolateContainer)