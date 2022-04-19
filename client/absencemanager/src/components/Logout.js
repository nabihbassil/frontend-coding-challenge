import React, {Component} from "react";

export default class DescriptionPage extends Component {

    componentDidMount() {
        setTimeout(function(){
           window.close();
            /*important note: only closes if the user opens localhost in a new tab, if you try using the tab that automatically
            opens on npm start you will get the message "Scripts may close only the windows that were opened by it."*/ 
          }, 7000); 
    }

    render(){
    return (
        <div className='centered'>
            <h2>This tab will close shortly.</h2>
            <br />
            <p>Thank you for using the Absence Manager Project!</p>
            </div>
    )
}
}
