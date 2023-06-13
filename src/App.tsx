import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import UserManagement from "./Pages/UserManagement";
import CreateUserManagement from "./Pages/UserManagement/CreateUserManagement";
import EditUserManagement from "./Pages/UserManagement/EditUserManagement";
import AdminTemplate from "./Templates/AdminTemplate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminTemplate />}>
          <Route index element={<UserManagement />} />
          <Route path="/user-management">
            <Route index element={<UserManagement />} />
            <Route path="create" element={<CreateUserManagement />} />
            <Route path="edit/:userId" element={<EditUserManagement />} />
          </Route>

          <Route path="/course-management"></Route>
          <Route path="/courseRegister-management"></Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
