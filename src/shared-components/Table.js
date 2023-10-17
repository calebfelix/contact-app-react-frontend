import React, { useState } from "react";
import PaginationShared from "./PaginationShared";
import RowButtons from "./RowButtons";
import Spinner from "./Spinner/Spinner";


const Table = ({ rows, setLimit, setOffset, limit, offset, count, handleUpdate ,handleDelete, handleView, isUpdateButton, isDeleteButton, isViewButton }) => {
  let headerForTable;
  let dataForTable;

  if (rows.length !== 0) {
    let keysArray = Object.keys(rows[0]);
    keysArray.push("Edit")
    let dataArray = Object.values(rows);

    headerForTable = keysArray.map((key) => {
      return <th>{key}</th>;
    });

    dataForTable = dataArray.map((d) => {
      return (
        <tr>
          {keysArray.map((key) => {
            if (d[key] === true) {
              return <td>True</td>;
            }
            if (d[key] === false) {
              return <td>False</td>;
            }
            if(key=="Edit"){
              return(<td><RowButtons  handleUpdate={handleUpdate} handleDelete={handleDelete} handleView={handleView} itemData={d} isDeleteButton={isDeleteButton} isUpdateButton={isUpdateButton} isViewButton={isViewButton} /></td>)
            }
            return <td>{d[key]}</td>; 
          })}
          
        </tr>
      );
    });
  }

  if(rows.length==0){
    return (<>
    <div style={{marginLeft:"5em"}}>
    <h1>No records found</h1>
    <p>Please add new records</p>
    </div>
    </>)
  }

  return (
    <>
      <div
        className="main"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "20px",
        }}
      >
        <PaginationShared
          setOffset={setOffset}
          limit={limit}
          offset={offset}
          count={count}
        />
        <select
          className="custom-select"
          onChange={(e) => {
            setLimit((prev) => e.target.value);
            let noOfPages = Math.ceil(count / e.target.value);
            setOffset(1);
          }}
        >
          <option value="1" selected={limit == 1}>
            1
          </option>
          <option value="2" selected={limit == 2}>
            2
          </option>
          <option value="5" selected={limit == 5}>
            5
          </option>
          <option value="10" selected={limit == 10}>
            10
          </option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>{headerForTable}</tr>
        </thead>
        <tbody>{dataForTable}</tbody>
      </table>
    </>
  );
};

export default Table;
