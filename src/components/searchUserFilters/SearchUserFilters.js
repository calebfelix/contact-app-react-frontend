import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const SearchUserFilters = ({
  handelAllUsers,
  setSearchFirstName,
  setSearchLastName,
  setSearchUsername,
  setSearchEmail,
  setSearchIsAdmin,
  setOffset,
  searchFirstName,
  searchLastName,
  searchUsername,
  searchEmail,
  SearchIsAdmin,
}) => {
  const handleFilters = () => {
    try {
      setOffset((prev) => 1);
      console.log("first");
      handelAllUsers();
    } catch (error) {}
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    try {
      setSearchFirstName((prev) => "");
      setSearchLastName((prev) => "");
      setSearchUsername((prev) => "");
      setSearchEmail((prev) => "");
      setSearchIsAdmin((prev) => false);
      setReset((prev) => !prev);
    } catch (error) {}
  };
  useEffect(() => {
    handleFilters();
  }, [reset]);
  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Search By</h4>
          <form
            class="form-inline"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="form-group mt-2">
              <label>First Name </label>&nbsp;&nbsp;
              <input
                style={{ borderRadius: "5px" }}
                type="text"
                value={searchFirstName}
                onChange={(e) => {
                  setSearchFirstName((prev) => e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>Last Name</label>&nbsp;&nbsp;
              <input
                style={{ borderRadius: "5px" }}
                type="text"
                value={searchLastName}
                onChange={(e) => {
                  setSearchLastName((prev) => e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>username</label>&nbsp;&nbsp;
              <input
                style={{ borderRadius: "5px" }}
                type="text"
                value={searchUsername}
                onChange={(e) => {
                  setSearchUsername((prev) => e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>email</label>&nbsp;&nbsp;
              <input
                style={{ borderRadius: "5px" }}
                type="text"
                value={searchEmail}
                onChange={(e) => {
                  setSearchEmail((prev) => e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>isAdmin</label>&nbsp;&nbsp;
              <select
                className="custom-select"
                style={{ borderRadius: "5px" }}
                onChange={(e) => {
                  setSearchIsAdmin((prev) => e.target.value);
                }}
              >
                <option value="true">True</option>
                <option value="false" selected>False</option>
              </select>
            </div>
            <div className="form-group mt-2">
              <Button variant="primary" onClick={handleFilters}>
                Search
              </Button>
            </div>
            <div className="form-group mt-2">
              <Button variant="primary" onClick={resetFilters}>
                reset filter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchUserFilters;
