import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../css/main.css";

import background1 from "../img/Univ_BackGround_01.png";
import background2 from "../img/Univ_BackGround_02.png";
import background3 from "../img/Univ_BackGround_03.png";
import background4 from "../img/Univ_BackGround_04.png";
import background5 from "../img/Univ_BackGround_05.png";

import univlogo1 from "../img/Logos/Univ_Logo_01.png";
import univlogo2 from "../img/Logos/Univ_Logo_02.svg";
import univlogo3 from "../img/Logos/Univ_Logo_03.svg";
import univlogo4 from "../img/Logos/Univ_Logo_04.png";
import univlogo5 from "../img/Logos/Univ_Logo_05.png";

import careerupImage from "../img/Career_01.jpg";
import univcareerImage from "../img/Career_02.jpg";

// 세번째 섹터 로고 이미지들
import kakaotalklogo from "../img/kakaotalklogo.png";
import navercafelogo from "../img/navercafelogo.png";

import uwaylogo from "../img/uwaylogo.png";
import jinhlogo from "../img/jinhlogo.png";

import nicelogo from "../img/nice_logo.png";
import tflogo from "../img/tflogo.jpg";

import Navcomponent from "./header";
import FooterComponent from "./footer";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Maincomponent() {
  //#region [LOGO Interval]
  const m_UnivLogolist = [
    univlogo1,
    univlogo2,
    univlogo3,
    univlogo4,
    univlogo5
    // univlogo6,
    // univlogo7,
    // univlogo8,
  ];
  const [m_UnivLogoIndex, SetUnivLogoIndex] = useState(0);
  //const [isUp, setIsUp] = useState(true);
  const [opacity, setOpacity] = useState(1);
  //#endregion

  //#region [BACKGROUND Interval]
  let [m_Background, SetBackGround] = useState(background1);
  let delay = 3000;
  let backgroundlist = [
    background1,
    background2,
    background3,
    background4,
    background5,
  ];

  useInterval(() => {
    setOpacity(0);
    setTimeout(() => {
      // Change to the next image index
      SetUnivLogoIndex((prevIndex) => (prevIndex + 1) % m_UnivLogolist.length);
      setOpacity(1);
    }, 500);
    
    // Change background to the next in the list
    SetBackGround((prevBackground) => {
      const currentIndex = backgroundlist.indexOf(prevBackground);
      const nextIndex = (currentIndex + 1) % backgroundlist.length;
      return backgroundlist[nextIndex];
    });
  }, delay);
  //#endregion
  
  const navigate = useNavigate();

  const goToEmployment = () => {
    navigate("/employment");
  }
  
  return (
    <div className="all">
      <Navcomponent />


      {/* 최상단, 타이틀 */}
      <div
        className="c-main-background"
        style={{ backgroundImage: `url(${m_Background})` }}
      >
        {/* 최상단 텍스트 필드 */}
        <div className="title-border">
          <span className="title-TextBox">
            대학교,
            <br />
            아직 늦지 않았습니다.
          </span>
          <span className="title-SubTextBox">
            K-WPU (Korean-Work-Path-University) 서비스는
            <br />
            재직자 특별전형으로 입시를 준비하는 여러분들을 응원합니다.
          </span>
        </div>

        {/* 최상단 텍스트 필드 우측 로고 */}
        <div className="c-titlelogo">
          <img
            src={m_UnivLogolist[m_UnivLogoIndex]}
            alt="University Logo"
            style={{ opacity: opacity, transition: "opacity 0.5s ease-in-out" }}
          />
        </div>

      </div>

      {/* 테스트 섹터 */}
      <div className="c-title-second-div">
        <section id="c-sector">
          <article data-aos="fade-up" className="aos-init aos-animate">
            <figure className="item">
              <div className="cont">
                <figcaption className="tit">What?<span>선취업, 후 진학</span></figcaption>
                <div className="intextinfo">실무 경험을 쌓고, 그 경험을 바탕으로 학문을 깊이 이해합니다.<br />
                  커리어를 보다 체계적으로 발전시킬 수 있습니다.</div>
                <a className="abox" href="https://if-blog.tistory.com/13410" target="_blank" rel="noreferrer">교육부 블로그 📌</a>
              </div>
              <div className="img_box observe on">
                <img src={careerupImage} alt="Innovation"></img>
              </div>
            </figure>
          </article>
          <article data-aos="fade-up" className="aos-init aos-animate">
            <figure className="item">
              <div className="img_box observe on">
                <img src={univcareerImage} alt="Innovation"></img>
              </div>
              <div className="cont">
                <figcaption className="tit">How?<span>특성화고졸 재직자전형</span></figcaption>
                <div className="intextinfo">직장 경력이 3년 이상인 특성화고졸자를 대상으로 하는 기회전형입니다.<br />
                  3년 이상의 고용보험 이력이 있으면 누구든지 도전할 수 있습니다.</div>
                <div className="inbuttonsinfo">
                  <a className="abox" href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B3%A0%EB%93%B1%EA%B5%90%EC%9C%A1%EB%B2%95%EC%8B%9C%ED%96%89%EB%A0%B9/%EC%A0%9C29%EC%A1%B0" target="_blank" rel="noreferrer">관련 법률 📌</a>
                  <div className="abox" onClick={goToEmployment} target="_blank" rel="noreferrer">재직일 계산 ▶</div>
                </div>
              </div>
            </figure>
          </article>
        </section>
      </div>

      {/* 세번째 섹터 */}
      <div className="c-title-Thrid_BackGround">
        <div>
          <div className="c-title-Thrid-TitleBar">
            <span className="text">그 외 도움이 되는 사이트</span>
          </div>
        </div>

        <div className="c-title-Thrid-Items">
          <div>
            <div className="c-title-Thrid_MiniBox_More">
              <a href="https://adiga.kr/man/inf/mainView.do?menuId=PCMANINF1000" target="_blank" rel="noreferrer">
                <div className="c-title-Thrid_MiniBox_Item">
                  <img src={kakaotalklogo} alt="카카오톡 로고"></img>
                  <span className="title">『대학 어디가』</span>
                  <span className="description">"대표적 대입정보포털"<br />주간대를 포함하며, 본인에게 적합한 입시전략을<br />구축하는데 도움이 됩니다.</span>
                </div>
              </a>
            </div>

            <div className="c-title-Thrid_MiniBox_More">
              <a href="https://www.academyinfo.go.kr/index.do" target="_blank" rel="noreferrer">
                <div className="c-title-Thrid_MiniBox_Item">
                  <img src={navercafelogo} alt="네이버 카페 로고"></img>
                  <span className="title">『대학 알리미』</span>
                  <span className="description">"정부 관리 포털 사이트"<br />각 대학의 공시정보를 편리하게 확인할 수 있도록<br />지원하는 정부 공식 웹 사이트입니다.</span>
                </div>
              </a>
            </div>
          </div>

          <div>

            <div className="c-title-Thrid_MiniBox_More">
              <a href="https://apply.jinhakapply.com/" target="_blank" rel="noreferrer">
                <div className="c-title-Thrid_MiniBox_Item">
                  <img src={jinhlogo} alt="진학사 로고"></img>
                  <span className="title">『진학사』</span>
                  <span className="description">"원서접수 하는 곳"<br />"진학사 원서접수"에서 접수하게 됩니다.</span>
                </div>
              </a>
            </div>


            <div className="c-title-Thrid_MiniBox_More">
              <a href="https://www.uwayapply.com/?m=pc" target="_blank" rel="noreferrer">
                <div className="c-title-Thrid_MiniBox_Item">
                  <img src={uwaylogo} alt="유웨이어플라이 로고"></img>
                  <span className="title">『유웨이어플라이』</span>
                  <span className="description">"원서접수 하는 곳"<br />학교마다 지원할 수 있는 포털이 다릅니다.</span>
                </div>
              </a>
            </div>
          </div>

          <div>

            <div className="c-title-Thrid_MiniBox_More">
              <a href="https://www.neis.go.kr/nxuiPortal/index.html" target="_blank" rel="noreferrer">
                <div className="c-title-Thrid_MiniBox_Item">
                  <img src={nicelogo} alt="나이스대국민로고"></img>
                  <span className="title">『나이스』</span>
                  <span className="description">"생활기록부 뽑는 곳"<br />"대입전형용"으로 뽑으면 됩니다.</span>
                </div>
              </a>
            </div>

            <div className="c-title-Thrid_MiniBox_More">
              <a href="https://www.gov.kr/search?srhQuery=%EC%83%9D%ED%99%9C%EA%B8%B0%EB%A1%9D%EB%B6%80" target="_blank" rel="noreferrer">
                <div className="c-title-Thrid_MiniBox_Item">
                  <img src={tflogo} alt="정부24 로고"></img>
                  <span className="title">『정부24』</span>
                  <span className="description">"생활기록부 뽑는 곳"<br />생기부는 정부24, 나이스 상관없습니다.</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />

    </div>
  );
}

export default Maincomponent;
