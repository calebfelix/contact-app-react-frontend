import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarShared from "../../shared-components/Navbar";
import {
  deleteContactdetail,
  getContactdetails,
  updateContactdetail,
} from "../../services/contactdetails/contactdetails";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CreateContactdatail from "../createContactdetail/CreateContactdetail";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import SearchContactdetailFilters from "../searchContactdetailFilters/SearchContactdetailFilters";
import { MessageError, MessageSuccess } from "../../error/Errors";

const AllContactdetails = () => {
  let { contactId } = useParams();
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [noOfPages, setNoOfPages] = useState(1);
  const [offset, setOffset] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // modal states
  const [contactdetailType, setContactdetailType] = useState("");
  const [id, setId] = useState("");
  const [contactdetailValue, setContactdetailValue] = useState("");

  // search filters
  const [searchContactdetailType, setSearchContactdetailType] = useState("");
  const [searchContactdetailValue, setSearchContactdetailValue] = useState("");


  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  let userId = localStorage.getItem("id");

  const updateSender = async (e) => {
    try {
      if(contactdetailType.length == 0){
        throw new Error("invalid contact detail Type")
      }
      if(contactdetailValue.length == 0){
        throw new Error("invalid contact detail Value")
      }

      let bodyObj = { contactdetailType, contactdetailValue };
      let response = await updateContactdetail(userId, contactId, id, bodyObj);
      if (response.data === "Contact detail Updated") {
        MessageSuccess(response.data);
        handleClose();
        handelAllContactdetails();
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
    setContactdetailType(d.contactdetailType);
    setContactdetailValue(d.contactdetailValue);
    setId(d.id);
    setShow((prev) => true);
  };

  const handleDelete = async (d) => {

try {
  let response = await deleteContactdetail(userId, contactId, d.id);
  if (response.data === "Contact detail Deleted") {
    MessageSuccess(response.data);
    handelAllContactdetails();
  }  
} catch (error) {
  MessageError(error.response.data.message);
}

  };

  const handelAllContactdetails = async (e) => {
    try {
      setIsLoading((prev) => true);
      let filters = {
        limit:limit,
        page:offset,
        contactdetailType:searchContactdetailType,
        contactdetailValue:searchContactdetailValue
      };
      let response = await getContactdetails(userId, contactId, filters);

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
      handelAllContactdetails();
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
      <CreateContactdatail
        handelAllContactdetails={handelAllContactdetails}
        contactId={contactId}
      />
      <SearchContactdetailFilters
              handelAllContactdetails={handelAllContactdetails}
              setSearchContactdetailType={setSearchContactdetailType}
              setSearchContactdetailValue={setSearchContactdetailValue}
              setOffset={setOffset}
              searchContactdetailType={searchContactdetailType}
              searchContactdetailValue={searchContactdetailValue}
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
          <Modal.Title>Update Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>contact detail Type</label>
            <input
              type="text"
              className="form-control"
              value={contactdetailType}
              onChange={(e) => {
                setContactdetailType(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group mt-2">
            <label>contact detail Value</label>
            <input
              type="text"
              className="form-control"
              value={contactdetailValue}
              onChange={(e) => {
                setContactdetailValue(e.target.value);
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

export default AllContactdetails;
