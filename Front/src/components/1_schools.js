import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/main.css";
import "../css/schools.css";
import "../css/schools_popup.css";

import section0 from "../img/section0.png";
import section1 from "../img/section1.png";
import section2 from "../img/section2.png";
import section3 from "../img/section3.png";

import Navcomponent from "./header";
import FooterComponent from "./footer";
import Popup from "./school_Popup";

function Schoolcomponent() {
  const [universities, setUniversities] = useState([]);
  const [selectedSector, setSelectedSector] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [backgroundFiles, SetBackGround] = useState([]);

  useEffect(() => {
    const images = require.context('../img/University_Logos/', false, /\.(png|jpe?g|svg)$/);
    const Files = images.keys().map(images);
    setImageFiles(Files);

    const backimages = require.context('../img/University_Backs/', false, /\.(png|jpe?g|svg)$/);
    const backFiles = backimages.keys().map(backimages);
    SetBackGround(backFiles);

    axios
      .get("http://13.209.244.201:8080/schoolliststring")
      .then((response) => {
        setUniversities(response.data.UNIV);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSectorClick = (sectorId) => {
    setSelectedSector(sectorId);
  };

  const handleItemClick = (index) => {
    console.log(imageFiles);
    setSelectedItemId(index);
  };

  const handleClosePopup = () => {
    setSelectedItemId(null);
  };

  const filteredUniversities = universities.filter(university => {

    console.log(selectedSector);
    console.log(university);

    if (selectedSector === 0) {
      return true; // 모든 대학을 보여줌
    } else {
      return university.SECTOR === selectedSector.toString(); // 선택된 섹터와 일치하는 대학만 보여줌
    }
  });

  return (
    <div className="c-school-root">
      <Navcomponent />


      {/* 최상단, 타이틀 */}
      <div className="c-school-titlebar">
        <div className="titlebox">
          <span className="title"> 대학교 목록 </span>
          <span className="description">
            재직자 전형을 통해 지원 가능한 대학교의 정보를 확인합니다.
          </span>
        </div>
      </div>

      {/* 조건 설정부 */}
      <div className="c-school-iflinebar">
        <div className="box">
          <button
            id="sector_0"
            className={`buttons ${selectedSector === 0 ? "selection" : ""}`}
            onClick={() => handleSectorClick(0)}
          >
            <img src={section0} alt="전체 로고"></img>
            <span className="title"> 전체 </span>
          </button>
          <button
            id="sector_1"
            className={`buttons ${selectedSector === 1 ? "selection" : ""}`}
            onClick={() => handleSectorClick(1)}
          >
            <img src={section1} alt="서울권 로고"></img>
            <span className="title"> 서울권 </span>
          </button>
          <button
            id="sector_2"
            className={`buttons ${selectedSector === 2 ? "selection" : ""}`}
            onClick={() => handleSectorClick(2)}
          >
            <img src={section2} alt="수도권 로고"></img>
            <span className="title"> 인천/경기 </span>
          </button>
          <button
            id="sector_3"
            className={`buttons ${selectedSector === 3 ? "selection" : ""}`}
            onClick={() => handleSectorClick(3)}
          >
            <img src={section3} alt="지방권 로고"></img>
            <span className="title"> 지방권 </span>
          </button>
        </div>
      </div>

      {/* 대학교 목록 */}
      <div className="c-school-univlistbar">
        <div id="ITEMLIST" className="Horizontal">
          {filteredUniversities.map((university, index) => (
            <div key={index}>
              <UniversityItem university={university} logoimages={imageFiles} backgroundimages={backgroundFiles} handleItemClick={handleItemClick} handleClosePopup={handleClosePopup} selectedItemId={selectedItemId} />
            </div>
          ))}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}

function UniversityItem({ university, logoimages, backgroundimages, handleItemClick, handleClosePopup, selectedItemId }) {
  
  const departmentArray = university.DEPARTMENT.split(',');
  const displayedDepartments = departmentArray.slice(0, 3);
  const remainingDepartmentsCount = Math.max(0, 3 - departmentArray.length);
  
  const displayedDepartmentsWithPlaceholder = displayedDepartments.concat(
    Array(remainingDepartmentsCount).fill("ㅤ")
  );

  return (
    <div id={university.INDEX}>
      <div className={`Item ${university.NAME === '동국대학교' ? 'isdongguk' : 'isnotdongguk'}`} onClick={() => handleItemClick(university.INDEX)}>
        <img className={`UnivLOGO`} src={logoimages[university.INDEX - 1]} alt="디버그"></img>
        <span className="UnivName">{university.NAME}</span>
        {displayedDepartmentsWithPlaceholder.map((department, index) => (
          <span key={index} className="UnivDepertment">{department}</span>
        ))}
      </div>

      {selectedItemId === university.INDEX && (
        <Popup university={university} handleClose={handleClosePopup} logoimages={logoimages[university.INDEX - 1]} background={backgroundimages[university.INDEX - 1]}/>
      )}
    </div>
  );
}

export default Schoolcomponent;
