import React, { Component } from "react";
import { getAbsencesBackend } from "../services/absenceServices";
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import DatePicker from "react-datepicker";
import { Button} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      filterDropdownValue: "",
      filterDate: null,
    }
  }

  getLists = async () => {
    const lists = await getAbsencesBackend();
    this.setState({ lists });
    return lists;

  }

  componentDidMount() {
    $("#MainDiv").addClass("fade-out");
    this.getLists()
      .then((data) => {
        var placeholder = JSON.stringify(data);
        var finalholder = JSON.parse(placeholder);
        $(document).ready(function () {
          $('#example').DataTable({
            scrollY: 700, //table height
            scrollX: true, //table width
            scrollCollapse: true, //force the height of the table's viewport to the given height
            "data": finalholder,
            "initComplete": function (settings, json) { // when table is fully loaded
              $("#MainDiv").removeClass("fade-out").addClass("fade-in");
              $($.fn.dataTable.tables(true)).DataTable().columns.adjust(); //adjusts column size
            },
            rowId: function (a) {
              return 'tr_' + a.id;
            },
            "bDestroy": true,
            "language": {
              "emptyTable": "No members absences have been recorded.",
              "zeroRecords": "No members data matches your search."
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
              { "targets": 1, "className": "rowType", "width": "5%" },
              { "targets": 2, "className": "rowStartDate", "width": "7%" },
              { "targets": 3, "className": "rowStartDate", "width": "7%" },
              {
                "targets": 4, "className": "rowPeriod", "width": "4%", orderable: false, "createdCell": function (td, cellData, rowData, row, col) {
                  var date1 = new Date(rowData.startDate);
                  var date2 = new Date(rowData.endDate);
                  // To calculate the date difference of two dates
                  var Difference_In_Time = date2.getTime() - date1.getTime();
                  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                  $(td).text(++Difference_In_Days + ' Day(s)')
                }
              },
              { "targets": 5, "className": "rowMNote", "width": "12%" },
              {
                "targets": 6, "className": "rowStatus", "width": "5%", "createdCell": function (td, cellData, rowData, row, col) {
                  if (cellData === null) {
                    if (rowData.confirmedAt === null) {
                      $(td).text('Requested').addClass('RequestedEntry');
                    } else {
                      $(td).text('Accepted').addClass('AcceptedEntry');
                    }
                  }
                  else {
                    $(td).text('Rejected').addClass('RejectedEntry');
                  }
                }
              },
              { "targets": 7, "className": "rowANote", "width": "12%" },
              { "targets": 8, "visible": false }
            ],
            "order": [8, 'desc']
          });

          $.fn.dataTable.ext.errMode = 'alert';
          $('#example').on('error.dt', function (e, settings, techNote, message) {
            alert('An error has been reported: ', message);
          }).DataTable();



  

        });

      })
  }

  render() {
    const mystyle = {
      marginTop: "5em"
    };

    const customFilterWrapper = {
       display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    };

    const spacingLeft = {
      marginLeft: "0.5em"
   };


    const handleTypeChange = (event) => {
      var table = $('#example').DataTable();
      this.setState({ filterDropdownValue: event.target.value });
      table.column(1).search(event.target.value).draw();
    };

    const handleDateChange = () => {
      var table = $('#example').DataTable();
      console.log(this.state.filterDate);
      if(this.state.filterDate == null){
      table.column(3).search("").draw();
      }
      else{
      table.column(3).search(formatDate(this.state.filterDate)).draw();
      }
    };

    const handleResetChange = () => {
      var table = $('#example').DataTable();
      this.setState({ filterDropdownValue: "" });
      this.setState({filterDate: null});
      table.column(1).search("").draw();
      table.column(3).search("").draw();
    };

    const formatDate = (date) => {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }

    return (
      <>
        <div id="MainDiv" style={mystyle}>
          <div className="jumbotron text-center bg-sky">
          </div>

          <div className="container">
            <div id="customFilters">
              <div><h4>Custom Filters</h4></div>
              <div id="theFilters" style={customFilterWrapper}>
              <div>
                <label>
                  Type
                  <select value={this.state.filterDropdownValue} onChange={handleTypeChange} style={{ marginLeft: "0.5em" }}>
                    <option value="" >All</option>
                    <option value="Vacation">vacation</option>
                    <option value="Sickness">sickness</option>
                  </select>
                </label>
              </div>

              <div id="DateFilterWrapper" style={customFilterWrapper}>
              <div style={spacingLeft}>  <label>Start Date </label>  </div>
              <div style={spacingLeft}>  <DatePicker id="filterDate" selected={this.state.filterDate} onChange={(date: Date) => this.setState({ filterDate: date })} /> </div>
              <div style={spacingLeft}> <Button variant="primary" onClick={handleDateChange}>Lookup</Button> </div>
              <div style={spacingLeft}>  <Button variant="secondary" onClick={handleResetChange}>Reset All</Button> </div>
              </div>
              </div>
            </div>
            <br /><br />
            <table id="example" className="display" style={{ width: "100%" }}>
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
