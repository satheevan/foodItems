import React from "react";
import './main.css'

export const MainCard =({className,styleName,right,left,...props})=>{
    return(
        <>
        <div className={`main ${className}`} >
        {props.children}
        </div>
        </>
    )
}

export const Notification =()=>{
    return(
        <>
        <div className="notify">
            new
        </div>
        </>
    )
}