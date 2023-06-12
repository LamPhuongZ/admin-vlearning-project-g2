import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminTemplate from "./Templates/AdminTemplate";
import UserManagement from "./pages/UserManagement";
import CreateUserManagement from "./pages/UserManagement/CreateUserManagement";
import EditUserManagement from "./pages/UserManagement/EditUserManagement";
import LoginPage from "./pages/LoginPage";
import CourseManagement from "./pages/CourseManagement";
import CreateCourseManagement from "./pages/CourseManagement/CreateCourseManagement";
import EditCourseManagement from "./pages/CourseManagement/EditCourseManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminTemplate />}>
          <Route path="/user-management">
            <Route index element={<UserManagement />} />
            <Route path="create" element={<CreateUserManagement />} />
            <Route path="edit/:userId" element={<EditUserManagement />} />
          </Route>

          <Route path="/course-management">
            <Route index element={<CourseManagement />} />
            <Route path="create" element={<CreateCourseManagement />} />
            <Route path="edit/:courseId" element={<EditCourseManagement />} />
          </Route>

          <Route path="/courseRegister-management"></Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
