import { useState } from "react";
import { createContact } from "../../services/contacts/contacts";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";

const CreateContact = ({handelAllContacts})=>{
  const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleCreateContact = async(e)=>{
      try {
        setIsLoading(prev=>true)
        e.preventDefault()
        if(firstName==""){
          throw new Error("invalid first name")
        }
        if(lastName==""){
          throw new Error("invalid last name")
        }

        const response = await createContact(localStorage.getItem("id"),firstName,lastName)
        console.log(response)
        handelAllContacts()
        MessageSuccess("contact Added")
        return  
      } catch (error) {
        MessageError(error.message)
      }finally{
        setIsLoading(prev=>false)
      }
      
        
    }


  return (
<>
<Spinner isLoading={isLoading}/>
    <div className="card mx-auto mt-5 mb-5" style={{ width: "20rem" }}>
    <div className="card-body">
      <h4 className="card-title mt-2">Create Contact</h4>
      <form>
        <div className="form-group mt-2">
          <label>First Name</label> 
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Jon"
          ></input>
        </div>
        <div className="form-group mt-2">
          <label>Last Name</label>
          <input
            onChange={(e) => {
              setLastName(e.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="Doe">
        </input>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCreateContact}>
          Add Contact
        </button>
     </form>
    </div>
  </div>
</>
  );
}

export default CreateContact