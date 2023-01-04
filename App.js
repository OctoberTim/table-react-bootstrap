import axios from "axios"
import { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory, {Type} from "react-bootstrap-table2-editor"
import filterFactory, {textFilter} from "react-bootstrap-table2-filter"

function App() {
  const [data, setData] = useState ([])
 useEffect(() => {
  getData()
 }, [])

 const getData=()=>{
  axios("https://jsonplaceholder.typicode.com/comments").then((res) =>{
    console.log(res.data)
    setData(res.data)
    res.data.forEach (obj, ind=>obj.__id=ind)
 })
 }
 
 const emailFormatter=(data,row) => {
  return <span onClick={() => alert("you clicked")}>Email = {data}</span>
  }
  
  const selectRow = {
    mode: "chekbox",
    clickToSelect: true,
    selected: [1,3],
    clickToEdit: true,


  }

 const colums=[{
  dataField: "email",
  text: "Email", 
  sort: true,
  formatter: emailFormatter,

 }, 
 {
  dataField: "postId",
  text: "Product ID", 
  filter: textFilter(),
  sort: true,
  validator:(newValue, row, colum) => {
    if(isNaN(newValue)){
      return {
        valid: false,
        massage: "Please enter numeric value"
      }
    }
    return true
  }
 },
 {
  dataField: "name",
  text: "Name",
  sort: true,
  editable: false,
  filter: textFilter(),
 },

 {
  dataField: "email",
  text: "Dropdown", 
  editor: {
    options: [
      {
        value: "A",
        label: "A"
      },

      {
        value: "B",
        label: "B"
      }
    ]    
  }
 
 },

 {
  dataField: "dropdown",
  text: "Name", 
  sort: true,
  editable: false,
 }
]
  return (
    <div className="App">
      <BootstrapTable keyField="id" 
       data={data}
       colums={colums} 
       striped 
       hover
       condesed
       pagination={paginationFactory()}
       cellEdit = {cellEditFactory({
        mode: "dbclick",
        blurToSave:true,
        nonEditablerows: () =>[1,2,3],
         

      })}

        selectRow={selectRow}
        filter={filterFactory()}
       />
    </div>
  );
}

export default App;
