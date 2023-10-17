import { useState } from "react";
import { createContactdetail } from "../../services/contactdetails/contactdetails";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Spinner from "../../shared-components/Spinner/Spinner.js";

const CreateContactdatail = ({handelAllContactdetails, contactId})=>{
  const [isLoading, setIsLoading] = useState(false)
    const [contactdetailType, setContactdetailType] = useState("")
    const [contactdetailValue, setContactdetailValue] = useState("")

    const handleCreateContactdetail = async(e)=>{
try {
  setIsLoading(prev=>true)
  e.preventDefault()

  if(contactdetailType==""){
    throw new Error("invalid contactdetailType")
  }
  if(contactdetailValue==""){
    throw new Error("invalid contactdetailValue")
  }

  const response = await createContactdetail(localStorage.getItem("id"),contactId,contactdetailType,contactdetailValue)
  console.log(response)
  handelAllContactdetails()
  enqueueSnackbar("contact Detail Added",{variant:"success"})

  return
} catch (error) {
  enqueueSnackbar(error.message,{variant:"error"})
}finally{
  setIsLoading(prev=>false)
}
        
    }


  return (
<>
<Spinner isLoading={isLoading}/>
<SnackbarProvider/>
    <div className="card mx-auto mt-5 mb-5" style={{ width: "20rem" }}>
    <div className="card-body">
      <h4 className="card-title mt-2">Create Contact Detail</h4>
      <form>
        <div className="form-group mt-2">
          <label>Contact Detail Type</label>
          <input
            onChange={(e) => {
              setContactdetailType(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Email"
          ></input>
        </div>
        <div className="form-group mt-2">
          <label>Contact Detail Value</label>
          <input
            onChange={(e) => {
              setContactdetailValue(e.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="jon@mail.com">
        </input>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCreateContactdetail}>
          Add Contact Detail
        </button>
     </form>
    </div>
  </div>
</>
  );
}

export default CreateContactdatail