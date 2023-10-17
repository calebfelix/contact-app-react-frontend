import { useState } from "react";
import { createUser } from "../../services/user/users";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Spinner from "../../shared-components/Spinner/Spinner.js";


const CreateUser = ({handelAllUsers})=>{
  const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleCreateUser = async(e)=>{
      try {
      setIsLoading(prev=>true)
        e.preventDefault()
        if(firstName==""){
          throw new Error("invalid first name")
        }
        if(lastName==""){
          throw new Error("invalid last name")
        }
        if(email==""){
          throw new Error("invalid email")
        }
        if(username==""){
          throw new Error("invalid username")
        }
        if(password==""){
          throw new Error("invalid password")
        }

        const response = await createUser(firstName,lastName,email,username,password)
        console.log(response.data)
        handelAllUsers()
        enqueueSnackbar("user Added",{variant:"success"})
        return
      } catch (error) {
        enqueueSnackbar(error.message,{variant:"error"})
      }finally{
        setIsLoading(prev=>false)
      }
    }

  return (
<>
<Spinner isLoading={isLoading} />
<SnackbarProvider/>
    <div className="card mx-auto mt-5 mb-5" style={{ width: "20rem" }}>
    <div className="card-body">
      <h4 className="card-title mt-2">Create User</h4>
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
        <div className="form-group mt-2">
          <label>Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            className="form-control"
            placeholder="jon@doe.com">
        </input>
        </div>
        <div className="form-group mt-2">
          <label>Username</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="jon">
        </input>
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="password123">
        </input>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCreateUser}>
          Add User
        </button>
     </form>
    </div>
  </div>
</>
  );
}

export default CreateUser