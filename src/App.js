import "./App.css";
import Login from "./components/login/Login";
import AllUsers from "./components/allUsers/AllUsers.js";
import { Navigate, Route, Routes } from "react-router-dom";
import AllContacts from "./components/allContacts/AllContacts";
import AllContactdetails from "./components/allContactdetails/AllContactdetails";
import { useEffect, useState } from "react";
import { verify } from "./services/user/authorization";

function App() {
  
  return (
    <>
      <Routes>
        <Route exact path={`/`} element={<Login/>}/>
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
