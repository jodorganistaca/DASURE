import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import "../../Styles/layout/Loading.css"
const Loading = () => {
    return (
        <div style={{height:"100vh"}}>
            <div id="loading-spinner">
            <BounceLoader></BounceLoader>
            </div>
        </div>
    )
}



export default Loading

