import React from "react";
import { MainCard } from "../../../components/CustomComponents/CustomMainCard/MainCard";

const OrderList =()=>{



    return(
        <>
        <MainCard className={"f-row"}>
            <div className="f-col rightSide f-grow" style={{margin:"2px"}}>
            <div className="header f-row">
            <span className="">menu</span>
            <strong className="">Order List</strong>
            <div className="f-row" style={{border:"1px solid black", padding:""}}>
                <input type="search" placeholder="search" style={{border:"none",fontSize:"12px"}} className=""></input>
                <span>0</span>
                </div>
            </div>
            </div>
            <div className="f-col leftSide w-20 w-x-40" style={{alignSelf:"start", justifyContent:"end"}}>
                <div className="header f-row">
                    <span className="">box</span>
                    <div className="profile">
                        <span className="">photo</span>
                        <strong>Name</strong>
                    </div>
                </div>
            </div>
            
        </MainCard>

        </>
    )
}

export default OrderList;