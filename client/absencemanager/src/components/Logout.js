import React, {Component} from "react";
import { getAbsencesBackend } from "../services/absenceServices";
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 


export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
           // newListName: "",
        }
    }

    getLists = async () => {
        const lists = await getAbsencesBackend();
        this.setState({lists});
    }

    componentDidMount() {
        $(document).ready(function () {
         $('#example').DataTable();
        
        });
     }

      render(){
        //Datatable HTML
      return (
        <div className="MainDiv">
          <div class="jumbotron text-center bg-sky">
              <h3>Absence Manager</h3>
          </div>
          
          <div className="container">
              
              <table id="example" class="display">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
            </table>
              
            </div>
          </div>
      );
    }
}
