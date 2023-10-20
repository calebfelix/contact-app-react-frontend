import React, { useEffect, useState } from "react";
import NavbarShared from "../../shared-components/Navbar";
import Table from "../../shared-components/Table";
import {
  getContacts,
  updateContact,
  deleteContact,
} from "../../services/contacts/contacts";
import { verify } from "../../services/user/authorization";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CreateContact from "../createContact/CreateContact";
import { useNavigate } from "react-router-dom";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import SearchContactFilters from "../searchContactFilters/SearchContactFilters";
import { MessageError, MessageSuccess } from "../../error/Errors";

const AllContacts = () => {
  const navigate = useNavigate();
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

  // search filters
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");


  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  let userId = localStorage.getItem("id");

  const updateSender = async (e) => {
    try {
      if(firstName.length == 0){
        throw new Error("invalid first name")
      }
      if(lastName.length == 0){
        throw new Error("invalid last name")
      }
      

      let bodyObj = { firstName, lastName };
      let response = await updateContact(userId, id, bodyObj);
      if (response.data === "Contact Updated") {
        MessageSuccess(response.data);
        handleClose();
        handelAllContacts();
      }
    } catch (error) {
      if(error.response){
        MessageError(error.response.data.message);
      }else{
        MessageError(error.message);
      }
    }

  };

  const handleUpdate = (d) => {
    setFirstName(d.firstName);
    setLastName(d.lastName);
    setId(d.id);
    setShow((prev) => true);
  };

  const handleDelete = async (d) => {
    try {
      let response = await deleteContact(userId, d.id);
      if (response.data === "Contact Deleted") {
        MessageSuccess(response.data);
        handelAllContacts();
      }
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handleView = async (d) => {
    try {
      navigate(`/allcontactdetails/${d.id}`);
    } catch (error) {
      MessageError("could not redirect");
    } finally {
    }
  };

  const handelAllContacts = async (e) => {
    try {
      setIsLoading((prev) => true);
      let filters = {
        limit:limit,
        page:offset,
        firstName: searchFirstName,
        lastName: searchLastName,
      };
      let response = await getContacts(userId, filters);
      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
      return;
    } catch (error) {
      MessageError(error.response.data.message);
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
      handelAllContacts();
    }
  }, [limit, offset, isVerifiedUser]);

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
      <CreateContact handelAllContacts={handelAllContacts} />
      <SearchContactFilters
        handelAllContacts={handelAllContacts}
        setSearchFirstName={setSearchFirstName}
        setSearchLastName={setSearchLastName}
        setOffset={setOffset}
        searchFirstName={searchFirstName}
        searchLastName={searchLastName}
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
        handleView={handleView}
        isUpdateButton={true}
        isDeleteButton={true}
        isViewButton={true}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Contact</Modal.Title>
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

export default AllContacts;
