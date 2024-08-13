import React, { useState, useEffect, useMemo } from "react";
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
import Popup from "./1-1_school_Popup.js";

function Schoolcomponent() {
  const [universities, setUniversities] = useState([]);
  const [selectedSector, setSelectedSector] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [backgroundFiles, SetBackGround] = useState([]);

  // const api_root = "localhost:8080";
  const api_root = "kwpu.co.kr:9091";

  useEffect(() => {
    const images = require.context('../img/University_Logos/', false, /\.(png|jpe?g|svg)$/);
    const Files = images.keys().map(images);
    setImageFiles(Files);

    const backimages = require.context('../img/University_Backs/', false, /\.(png|jpe?g|svg)$/);
    const backFiles = backimages.keys().map(backimages);
    SetBackGround(backFiles);

    axios
      .get("http://" + api_root + "/api/schools/list")
      .then((response) => {
        setUniversities(response.data);
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

  const filteredUniversities = useMemo(() => {
    return universities.filter(university => {
      if (selectedSector === 0) {
        return true;
      } else {
        return university.UNIV_CODE === selectedSector;
      }
    });
  }, [universities, selectedSector]);

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
            <div key={`UnivItemBoxs-${university.INDEX}`}>
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
  const departments = university.DEPARTMENT ? university.DEPARTMENT.split(',') : [];
  const displayedDepartments = departments.slice(0, 3);
  const departmentsToDisplay = [...displayedDepartments, ...Array(3 - displayedDepartments.length).fill('\u200B')];

  return (
    <div id={university.INDEX}>
      <div className={`Item ${university.UNIV_NAME === '동국대학교' ? 'isdongguk' : 'isnotdongguk'}`} onClick={() => handleItemClick(university.INDEX)}>
        <img className={`UnivLOGO`} src={logoimages[university.INDEX - 1]} alt="디버그"></img>
        <span className="UnivName">{university.UNIV_NAME}</span>
        {departmentsToDisplay.map((department, index) => (
        <span key={`popup-${university.UNIV_NAME}-${department}#${index}`} className="UnivDepartment">{department}</span>
        ))}
      </div>

      {selectedItemId === university.INDEX && (
        <Popup university={university} handleClose={handleClosePopup} logoimages={logoimages[university.INDEX - 1]} background={backgroundimages[university.INDEX - 1]}/>
      )}
    </div>
  );
}

export default Schoolcomponent;
