import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const SearchContactdetailFilters = ({
    handelAllContactdetails,
    setSearchContactdetailType,
    setSearchContactdetailValue,
    setOffset,
    searchContactdetailType,
    searchContactdetailValue
}) => {
  const handleFilters = () => {
    try {
      setOffset((prev) => 1);
      console.log("first");
      handelAllContactdetails();
    } catch (error) {

    }
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    try {
      setSearchContactdetailType((prev) => "");
      setSearchContactdetailValue((prev) => "");
      setReset((prev) => !prev);
    } catch (error) {}
  };
  useEffect(() => {
    handleFilters();
  }, [reset]);

  const [disable, setDisable] = useState(false);
  const disableHandle = () => {
    try {
      if (
        searchContactdetailType !== "" ||
        searchContactdetailValue !== ""
      ) {
        setDisable((prev) => false);
        return;
      }
      setDisable((prev) => true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    disableHandle();
  }, [searchContactdetailType, searchContactdetailValue]);

  return (
    <>
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Search By</h4>
        <form
          class="form-inline"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form-group m-2">
              <label>Contact detail Type</label>&nbsp;&nbsp;
              <input
                style={{ borderRadius: "5px" }}
                type="text"
                value={searchContactdetailType}
                onChange={(e) => {
                  setSearchContactdetailType((prev) => e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group m-2">
              <label>Contact detail Value</label>&nbsp;&nbsp;
              <input
                style={{ borderRadius: "5px" }}
                type="text"
                value={searchContactdetailValue}
                onChange={(e) => {
                  setSearchContactdetailValue((prev) => e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form-group m-2">
              <Button variant="primary" disabled={disable} onClick={handleFilters}>
                Search
              </Button>
            </div>
            <div className="form-group m-2">
              <Button variant="primary" onClick={resetFilters}>
                reset filter
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default SearchContactdetailFilters;
