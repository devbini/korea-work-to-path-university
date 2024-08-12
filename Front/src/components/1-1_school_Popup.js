//import { computeHeadingLevel } from "@testing-library/react";
import React, { useEffect, useState, useCallback } from "react";

// ref
import DepartmentComponent from './1-2_departmentcomponent.js';
import axios from "axios";

const { kakao } = window;

const Popup = ({ university, handleClose, logoimages, background }) => {
  
  // 학과목록
  const [univ_info, setUniv_info] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]); 
  const [MapRef, setMap] = useState();

  const fetchData = useCallback(async () => {
    try {
      setdepartmentdata([university.DEPARTMENT]);
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [university]);

  useEffect (() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    axios
    .get("http://kwpu.co.kr:9091/api/schools/schoollist?school_id=" + university.INDEX)
    .then((response) => {
      setUniv_info(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.45, 126.57),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    console.log(map);
    setMap(map);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(university.ADDRESS, function(result, status) {
      // 정상적으로 검색이 완료됐으면   
       if (status === kakao.maps.services.Status.OK) {
        console.log(map);

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.panTo(coords);
      } 
    });    
  }, [])
  





  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-topbox">
            <img className="top-background" src={background} alt="백그라운드"></img>
            <div className="top-emblumBack"> <img className="top-emblum" src={logoimages} alt="Logo"></img></div>
            <div className="top-titlebar">
              <span className="top-title">{university.NAME}</span><br />
              <span className="top-slogan">{univ_info.SLOGEN}</span>
            </div>
          </div>

          <div className="popup-middlebox">
            <div className="popup-middlebox-mini">
              <span className="popup-titlebar-left">학교 정보</span>
              <div className="popup-mid-line"></div>
              <div className="popup-middlebox-littlemini">
                <div className="middlebox-left">
                  <span>입학처<br />졸업요건<br />시간표<br />교환학생<br />복수전공<br />학교 위치</span>
                </div>
                <div className="middlebox-right">
                  <span><a href={univ_info.ADMISSIONURL} target="blank">{univ_info.ADMISSIONURL}</a><br />{university.ENDIF}<br />{university.FREETIME},
                  {university.WEEKEND}, {university.SATSUN}<br />{university.TR}<br />{university.MULTI}<br />{university.ADDRESS}</span>
                  <div id="map" className="kakaomap"></div>
                </div>
              </div>



            </div>
            <div className="popup-middlebox-mini">
              <span className="popup-titlebar-right">입학 정보</span>
              <div className="popup-mid-line"></div>
              <div className="popup-middlebox-littlemini">
                <div className="middlebox-left">
                  <span>재직 일수<br />전형<br />평가기준<br /><br />원서료<br />접수기간<br />제출서류</span>
                </div>
                <div className="middlebox-right">
                  <span>{university.WORKDATE}<br />{university.TYPE}<br />{university.STEVA}<br />{university.STEVB}<br />{university.PRICE}<br />
                  {university.INIT_DATE}<br />{university.FILE}</span>
                  <div id="map" className="kakaomap"></div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleClose}>닫기</button>

          <div className="popup-bottom-box">
            <span className="popup-titlebar">학과 정보</span><br />
            <div className="popup-bot-line"></div>
            <div className='b-middle-bot'>
              <span>학과명</span>
              <span>모집인원</span>
              <span>2024년 입시 경쟁률</span>
              <span>성적 평균</span>
            </div>
            <div className="popup-items">
            
              {departmentdata.map(data => (
                <DepartmentComponent/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;