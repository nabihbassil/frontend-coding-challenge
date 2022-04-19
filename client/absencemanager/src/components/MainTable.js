import React, {Component} from "react";
import { getAbsencesBackend } from "../services/absenceServices";
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 


export default class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
           // newListName: "",
        }
    }

    getLists = async () => {
        const lists = await getAbsencesBackend();
        this.setState({lists});
       return lists; 
    
    }

    componentDidMount() {
      $( "#MainDiv" ).addClass( "fade-out" );
        this.getLists()
        .then((data) => {
        var placeholder = JSON.stringify(data);
        var finalholder = JSON.parse(placeholder);
        $(document).ready(function () {;
        var table = $('#example').DataTable({
             scrollY: 700, //table height
            scrollX: true, //table width
            scrollCollapse: true, //force the height of the table's viewport to the given height
            "data": finalholder, 
            "initComplete": function (settings, json) { // when table is fully loaded
              $( "#MainDiv" ).removeClass( "fade-out" ).addClass( "fade-in" );
              table = settings.oInstance.api(); // creates table variable
              $($.fn.dataTable.tables(true)).DataTable().columns.adjust(); //adjusts column size
            },
            rowId: function (a) {
              return 'tr_' + a.id;
            },
            "bDestroy": true,
            "language": {
              "emptyTable": "No member absences have been recorded.",
              "zeroRecords": "No member data matches your search."
            },        
            // places data retrieved in table columns
            "columns": [
              { "data": "memInfo[,].name" }, 
              { "data": "type" },
              { "data": "startDate" },
              { "data": "endDate" },
              { "data": "createdAt" },
              { "data": "memberNote" },
              { "data": "rejectedAt" },
              { "data": "admitterNote" },
              { "data": "createdAt" } 
            ],
            columnDefs: [
              { "targets": 0, "className": "rowName", "width": "7%" }, 
              { "targets": 1, "className": "rowType", "width": "5%"}, 
              { "targets": 2, "className": "rowStartDate", "width": "7%" }, 
              { "targets": 3, "className": "rowStartDate", "width": "7%" }, 
              { "targets": 4, "className": "rowPeriod", "width": "4%",orderable: false, "createdCell": function (td, cellData, rowData, row, col) {
                    var date1 = new Date(rowData.startDate);
                    var date2 = new Date(rowData.endDate);        
                    // To calculate the date difference of two dates
                    var Difference_In_Time = date2.getTime() - date1.getTime();
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    $(td).text(++Difference_In_Days + ' Day(s)')
              } 
            }, 
              { "targets": 5, "className": "rowMNote", "width": "12%" }, 
              { "targets": 6, "className": "rowStatus", "width": "5%", "createdCell": function (td, cellData, rowData, row, col) {
                if (cellData === null) {
                  if(rowData.confirmedAt === null){
                    $(td).text('Requested').addClass('RequestedEntry');
                  }else{
                  $(td).text('Accepted').addClass('AcceptedEntry');
                  }
                }
                else{
                  $(td).text('Rejected').addClass('RejectedEntry');
                }
              }
            },
              { "targets": 7, "className": "rowANote", "width": "12%" },
              {"targets": 8,  "visible": false  } 
            ],
            "order": [8, 'desc']
          });


          $.fn.dataTable.ext.errMode = 'alert';
 
          $('#example')
              .on( 'error.dt', function ( e, settings, techNote, message ) {
                  alert( 'An error has been reported: ', message );
              } )
              .DataTable(); 
        });
    })
     }

      render(){
      return (
        <> 
        <div id="MainDiv">
          <div className="jumbotron text-center bg-sky">
          </div>
          
          <div className="container">
              
              <table id="example" className="display" style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Period</th>
                        <th>Member Note</th>
                        <th>Status</th>
                        <th>Remark</th>
                        <th>Created On</th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
            </table>
              
            </div>
          </div>
          </> 
      );
    }
}
