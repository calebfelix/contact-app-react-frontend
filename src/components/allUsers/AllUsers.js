import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../../services/user/users";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import NavbarShared from "../../shared-components/Navbar";
import CreateUser from "../createUser/CreateUser";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import SearchUserFilters from "../searchUserFilters/SearchUserFilters";
import { useNavigate } from "react-router-dom";
import { MessageError, MessageSuccess } from "../../error/Errors";

const AllUsers = () => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [noOfPages, setNoOfPages] = useState(1);
  const [offset, setOffset] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // modal states
  const [firstName, setFirstName] = useState("");
  const [id, setId] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // search filters
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchIsAdmin, setSearchIsAdmin] = useState(false);
  const navigate = new useNavigate()

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };


  const updateSender = async (e) => {
    try {
      if(firstName.length == 0){
        throw new Error("invalid first name")
      }
      if(lastName.length == 0){
        throw new Error("invalid last name")
      }
      if(email.length == 0){
        throw new Error("invalid email")
      }

      let bodyObj = { firstName, lastName, email };
      let response = await updateUser(id, bodyObj);
      if (response.data === "userUpdated") {
        MessageSuccess(response.data);
        handleClose();
        handelAllUsers();
      }
    } catch (error) {
      if(error.response){
        MessageError(error.response.data.message);
      }else{
        MessageError(error.message);
      }
    }
  };

  const handleDelete = async (d) => {
    try {
      let response = await deleteUser(d.id);
      if (response.data === "user Deleted") {
        MessageSuccess(response.data);
        handelAllUsers();
      }
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handelAllUsers = async () => {
    try {
      console.log("handelAllUsers");
      setIsLoading((prev) => true);
      console.log(offset);
      let filters = {
        limit: limit,
        page: offset,
        firstName: searchFirstName,
        lastName: searchLastName,
        username: searchUsername,
        isAdmin: searchIsAdmin,
        email: searchEmail,
      };
      let response = await getUsers(filters);
      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
      return;
    } catch (error) {
      MessageError(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading((prev) => false);
    }
  };

  const verifyUser = async () => {
    try {
      let response = await verify();
      setIsVerifiedUser((prev) => response.data.result);
      return;
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (isVerifiedUser) {
      handelAllUsers();
    }
  }, [limit, offset, isVerifiedUser]);

  const handleUpdate = (d) => {
    try {
      setFirstName(d.firstName);
      setLastName(d.lastName);
      setEmail(d.email);
      setId(d.id);
      setShow((prev) => true);
    } catch (error) {
      MessageError("couldnt set values");
    }
  };

  if (!isVerifiedUser) {
    return (
      <h1>
        <a href="/">please login</a>
      </h1>
    );
  }
  return (
    <>
      <Spinner isLoading={isLoading} />
      <NavbarShared />
      <CreateUser handelAllUsers={handelAllUsers} />
      <SearchUserFilters
        handelAllUsers={handelAllUsers}
        setSearchFirstName={setSearchFirstName}
        setSearchLastName={setSearchLastName}
        setSearchUsername={setSearchUsername}
        setSearchEmail={setSearchEmail}
        setSearchIsAdmin={setSearchIsAdmin}
        searchFirstName={searchFirstName}
        searchLastName={searchLastName}
        searchUsername={searchUsername}
        searchEmail={searchEmail}
        setOffset={setOffset}
      />
      <Table
        rows={data}
        setOffset={setOffset}
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        isUpdateButton={true}
        isDeleteButton={true}
        isViewButton={false}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group mt-2">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group mt-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateSender}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllUsers;
