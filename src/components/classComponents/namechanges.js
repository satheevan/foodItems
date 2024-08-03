import { Component } from "react";


class NameChanges extends Component{

    // constructor(){
    //     super()

    //     this.state = {
    //         name:{
    //             firstName:"Ravi",
    //             lastName:"kumar"
    //         },
    //         companyName:"Quantique MetaData Pvt ltd"
    //     }
    // }
    constructor(){
        super()

        this.state={
            name:"saravanan",
            companyName:"Quantique Meta Data Pvt.ltd",
            designation:"Software Developer"
        }
    }

render(){
    return(
        <>
        <p>HI My name is {this.state.name.firstName} {this.state.name.lastName}.</p>
        <p>I'm a {this.state.designation}</p>
        <button onClick={()=>{
            this.state.name.firstName= "Saravanan"
            console.log(this.state.name);
        }}>change Name</button>
        </>
    )
}

}

export default NameChanges;