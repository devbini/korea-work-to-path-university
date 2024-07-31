import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logoname_White from "../img/@Page_Logo-White.png";
import logoname_Black from "../img/@Page_Logo-Black.png";

import "../css/header.css";

function Navcomponent() {

  const [position, setPosition] = useState("c-nav");
  const [logoname, setLogo] = useState(logoname_White);

  function onScroll() {
    if (window.scrollY === 0) {
      setPosition("c-nav"); // 스크롤 위치가 0일 때 "c-nav" 클래스 사용
      setLogo(logoname_White);
    } else {
      setPosition("c-nav-fix"); // 스크롤 위치가 0이 아닐 때 "c-nav-fix" 클래스 사용
      setLogo(logoname_Black);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  }

  const goToSchools = () => {
    navigate("/schools");
  }

  const goToEmployment = () => {
    navigate("/employment");
  }

  const goTogpa = () => {
    navigate("/gpa");
  }

  return (
    <div>
      <nav className={position}>
        <div className="c-nav-div">
          <div className="c-nav-logo">
            <img className="c-nav-logoimage" alt="로고" src={logoname} onClick={goToMain} />
          </div>

          <div className="c-nav-content">
            <ul className="c-nav-container">
              <li onClick={goToSchools} className="c-nav-item">학교 리스트</li>
              <li onClick={goToEmployment} className="c-nav-item">재직일수 계산기</li>
              <li onClick={goTogpa} className="c-nav-item">내신산출 계산기</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navcomponent;