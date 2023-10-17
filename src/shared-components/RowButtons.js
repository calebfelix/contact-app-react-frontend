import React from "react";

const RowButtons = ({ handleUpdate, handleDelete, handleView, itemData, isUpdateButton, isDeleteButton, isViewButton }) => {
    let Blist = [];
    
  if (isUpdateButton) {
    Blist.push(
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginRight: "1rem" }}
        onClick={()=>{
          handleUpdate(itemData)
        }}
      >
        Update
      </button>
    );
  }
  if (isDeleteButton) {
    Blist.push(
      <button
        type="button"
        className="btn btn-danger"
        style={{ marginRight: "1rem" }}
        onClick={()=>{
            handleDelete(itemData)
        }}
      >
        Delete
      </button>
    );
  }
  if (isViewButton) {
    Blist.push(
      <button
        type="button"
        className="btn btn-success"
        style={{ marginRight: "1rem" }}
        onClick={()=>{
          handleView(itemData)
      }}
      >
        View
      </button>
    );
  }

  return (
    <>
      <div>{Blist}</div>
    </>
  );
};

export default RowButtons;
