import "./App.css";
import Login from "./components/login/Login";
import AllUsers from "./components/allUsers/AllUsers.js";
import { Navigate, Route, Routes } from "react-router-dom";
import AllContacts from "./components/allContacts/AllContacts";
import AllContactdetails from "./components/allContactdetails/AllContactdetails";
import { useEffect, useState } from "react";
import { verify } from "./services/user/authorization";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [flag,setFlag] = useState(localStorage.getItem("username"))
  const hasLoggedIn = async () => {
    try {
      let response = await verify();
      console.log(response.data);
      setIsLogin(response.data.result);
      setIsAdmin(response.data?.payload.isAdmin);
      setFlag(localStorage.getItem("username"))
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(flag);
  useEffect(() => {
    hasLoggedIn();
  }, [isLogin, isAdmin, flag]);
  return (
    <>
      <Routes>
        {isLogin ? (
          <Route
            exact
            path={`/`}
            element={isAdmin ? <AllUsers /> : <AllContacts />}
          />
        ) : (
          <Route exact path={`/`} element={<Login />} />
        )}
        {/* <Route exact path={`/`} element={<Login/>}/> */}
        <Route exact path={`/allusers`} element={<AllUsers />} />
        <Route exact path={`/allcontacts`} element={<AllContacts />} />
        <Route
          exact
          path={`/allcontactdetails/:contactId`}
          element={<AllContactdetails />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
