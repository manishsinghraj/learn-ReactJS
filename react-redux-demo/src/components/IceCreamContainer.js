import React from 'react'
import { buyIceCream } from '../redux';
import { connect } from 'react-redux';


const IceCreamConatiner = (props) => {
    return (
        <div>
            <h2>Number of IceCreams 🍦 = {props.numberOfIceCreams}</h2>
            <button onClick={props.buyIceCream}>Buy IceCream</button>
        </div>
    )
}


const mapStatetoProps = (state) => {
    return {
        numberOfIceCreams: state.iceCream.numberOfIceCreams
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buyIceCream: () => dispatch(buyIceCream())
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(IceCreamConatiner)



