import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./css/App.css";
import ScrollTop from './scrolltop';

// import Navcomponent from "./components/header";
// import FooterComponent from "./components/footer";
import Maincomponent from "./components/0_main";
import Schoolcomponent from "./components/1_schools";
import Employmentcomponent from "./components/2_employment";
import GPAcomponent from "./components/3_gpa";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Maincomponent />} />

          {/* 학교 목록 페이지 */}
          <Route path="/schools" element={<Schoolcomponent />} />

          {/* 재직 기간 계산 페이지 */}
          <Route path="/employment" element={<Employmentcomponent />} />

          {/* 내신 산출 페이지 */}
          <Route path="/gpa" element={<GPAcomponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
