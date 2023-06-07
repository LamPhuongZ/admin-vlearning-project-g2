import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminTemplate from './Templates/AdminTemplate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AdminTemplate />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
