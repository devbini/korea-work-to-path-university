//import { computeHeadingLevel } from "@testing-library/react";
import React, { useEffect, useState } from "react";

// ref
import DepartmentComponent from './1-2_departmentcomponent.js';
import axios from "axios";

const { kakao } = window;

const Popup = ({ university, handleClose, logoimages, background }) => {
  
  // 학과목록
  const [univ_info, setUniv_info] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]); 
  const [entrance, setentrance] = useState([]); 
  // const [MapRef, setMap] = useState();

  const api_root = window.location.protocol === 'https:' ? 'https://kwpu.co.kr:443' : 'http://kwpu.co.kr:9091';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolInfo, departmentInfo, entranceInfo] = await Promise.all([
          axios.get(
            `${api_root}/api/schools/schoolinfo?school_id=${university.INDEX}`
          ),
          axios.get(
            `${api_root}/api/schools/departmentinfo?school_id=${university.INDEX}`
          ),
          axios.get(
            `${api_root}/api/schools/entranceinfo?school_id=${university.INDEX}`
          ),
        ]);

        setUniv_info(schoolInfo.data[0]);
        setdepartmentdata(departmentInfo.data[0]);
        setentrance(entranceInfo.data[0]);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchData();
  }, [university.INDEX, api_root]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.45, 126.57),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    // setMap(map);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(univ_info.ADDRESS, function(result, status) {
      // 정상적으로 검색이 완료됐으면   
       if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.panTo(coords);
      } 
    });    
  }, [univ_info.ADDRESS])
  

  function renderMultiValue(multiValue) {
    switch (Number(multiValue)) {
      case 0:
        return "복수전공 불가능";
      case 1:
        return "복수전공 가능 (동일 전형)";
      case 2:
        return "주간대학 복수전공 가능";
      default:
        return "-";
    }
  }



  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-topbox">
            <img className="top-background" src={background} alt="백그라운드"></img>
            <div className="top-emblumBack"> <img className="top-emblum" src={logoimages} alt="Logo"></img></div>
            <div className="top-titlebar">
              <span className="top-title">{univ_info.UNIV_NAME}</span><br />
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
                  <span><a href={univ_info.ADMISSION_URL} target="blank">{univ_info.ADMISSION_URL}</a><br />
                  {university.GRADUATION && university.GRADUATION.split(',').length === 3 ? (
                    <div>
                      논문 {university.GRADUATION.split(',')[0]} | 학점 {university.GRADUATION.split(',')[1]} | 시험 {university.GRADUATION.split(',')[2]}
                    </div>
                  ) : (
                    <div>정보가 부족해요!</div>
                  )}
                  {university.SCADULE && university.SCADULE.split(',').length === 2 ? (
                    <div>
                      주간수업 필수여부 {university.SCADULE.split(',')[0]} | 주말수업 필수여부 {university.SCADULE.split(',')[1]}
                    </div>
                  ) : (
                    <div>정보가 부족해요!</div>
                  )}
                  {university.TR ? (
                    <div>
                      교환학생 신청 {university.TR}
                    </div>
                  ) : (
                    <div>정보가 부족해요!</div>
                  )}
                  {university.MULTI ? (
                    <div>
                       {renderMultiValue(university.MULTI)}
                    </div>
                  ) : (
                    <div>정보가 부족해요!</div>
                  )}
                  {univ_info.ADDRESS}</span>
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
                  <span>
                    {entrance.WORKDATE}<br />
                    {entrance.TYPE}<br />
                    {entrance.STEVA}<br />
                    {entrance.STEVB}<br />
                    {entrance.PRICE}<br />
                    {entrance.INIT_DATE}<br />
                    {entrance.FILE}</span>
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
              <span>학위명</span>
            </div>
            <div className="popup-items">
            
              {departmentdata.map(data => (
                <DepartmentComponent key={data} departmentinfomation={data}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;