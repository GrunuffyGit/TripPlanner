import React from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.prevData = "";
    this.state = {
      columnDefs: [
      {
        headerName: "Time", 
        field: "time"
      }, 
      {
        headerName: "Monday 2/12", 
        field: "monday",
        cellRenderer: 'cellRenderer',
        rowSpan: function(params) {
          if (params.data[this.field].length !== 0 && params.data[this.field] !== this.prevData) {
            this.prevData = params.data[this.field];
            return 24;
          } else if(params.data[this.field].length === 0){
            this.prevData = params.data[this.field];
            return 2;
          }else{
            return 0;
          }
        },
        cellClassRules: { 'cell': 'value !== undefined' }
      }, 
      {
        headerName: "Tuesday 2/13", 
        field: "tuesday",
        cellRenderer: 'cellRenderer',
        rowSpan:  function(params) {
          if (params.data[this.field].length !== 0 && params.data[this.field] !== this.prevData) {
            this.prevData = params.data[this.field];
            return 24;
          } else if(params.data[this.field].length === 0){
            this.prevData = params.data[this.field];
            return 2;
          }else{
            return 0;
          }
        },
        cellClassRules: { 'cell': 'value !== undefined' }
      },
      {
        headerName: "Wednesday 2/14", 
        field: "wednesday",
        cellRenderer: 'cellRenderer',
        rowSpan:  function(params) {
          if (params.data[this.field].length !== 0 && params.data[this.field] !== this.prevData) {
            this.prevData = params.data[this.field];
            return 24;
          } else if(params.data[this.field].length === 0){
            this.prevData = params.data[this.field];
            return 2;
          }else{
            return 0;
          }
        },
        cellClassRules: { 'cell': 'value !== undefined' }
      },
    ],
      rowData: [
        {
        time: "12:00 AM", 
        monday: "fish", 
        tuesday: "same",
        wednesday: "same"
      }, 
      {
        time: "1:00 AM", 
        monday: "fish", 
        tuesday: "",
        wednesday: ""
      }, 
      {
        time: "2:00 AM", 
        monday: "", 
        tuesday: "",
        wednesday: ""
      },
      {
        time: "3:00 AM", 
        monday: "chiggen", 
        tuesday: "",
        wednesday: ""
      },
      {
        time: "4:00 AM", 
        monday: "chiggen", 
        tuesday: "",
        wednesday: ""
      },
      {
        time: "5:00 AM", 
        monday: "same", 
        tuesday: "same",
        wednesday: ""
      },
    ],
    components: { cellRenderer: createCellRenderer() }
    }
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setColumnPinned("time", "left");
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '20vh',
        width: '50vw' }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            components={this.state.components}
            suppressRowTransform={true}
            onGridReady={this.onGridReady}
          >
        </AgGridReact>
      </div>
    );
  }
}

function createCellRenderer() {
  function CellRenderer() {}
  CellRenderer.prototype.init = function(params) {
    var cellBlank = !params.value;
    if (cellBlank) {
      return null;
    }
    this.ui = document.createElement('div');
    this.ui.innerHTML =
      '<div>' +
      params.value +
      '</div>'
  };
  CellRenderer.prototype.getGui = function() {
    return this.ui;
  };
  return CellRenderer;
}

export default App;
