import React, {Component} from "react";

export default class DescriptionPage extends Component {
    render(){
    return (
        <div className='centered'>
            <h2>The Project</h2>
            <br />
            <p> As part of my application for a developer position at Crewmeister, this project will be used to test my abilities in developing a react project. </p>
            <p>Because of my previous experience with the technologies included, I decided to build this project using the MERN stack. </p>
            <p> I displayed the data in a jQuery DataTable on the frontend because I've built similar tables before in my previous </p>
            <p>  development position and they include the ability to sort columns etc... </p>
            <div style={{position: "fixed", bottom: "40px"}}>
            <p>In case of any questions, do not hesitate to <a href="mailto:nabihbassil@gmail.com">Email me.</a> </p>
            <p>Thank you for your time and I hope you like the project. </p>
            </div>
        </div>
    )
}
}
