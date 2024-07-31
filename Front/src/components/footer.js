import React from "react";
import "../css/footer.css";

import insta from '../img/icon_Insta.png';
import github from '../img/icon_Github.png';
import tistory from '../img/icon_tistory.png';
import kakao from '../img/icon_Kakao.png';

function FooterComponent() {
  return (
    <footer>
      <div className="inner">
        <div className="footer-title-message">
          K-WPU
        </div>
        <div className="footer-message">
          재직자전형을 준비하는 모든 분들께 도움이 되고자 만들었습니다.<br />
          피드백은 언제나 환영입니다, 인스타 혹은 카톡으로 연락 남겨주세요. 감사합니다 :D
        </div>
        <div className="footer-icon">
          <a href="https://www.instagram.com/cong._.chan/" target="_blank" rel="noreferrer"><img src={insta} alt="insta Logo"></img></a>
          <a href="https://github.com/devbini" target="_blank" rel="noreferrer"><img src={github} alt="github Logo"></img> </a>
          <a href="https://devbini.tistory.com/" target="_blank" rel="noreferrer"><img src={tistory} alt="tistory Logo"></img> </a>
          <a href="https://open.kakao.com/me/devbini" target="_blank" rel="noreferrer"><img src={kakao} alt="kakao Logo"></img> </a>
        </div>
        <div className="footer-copyright">ⓒ 2024. 김찬빈 all rights reserved.</div>
      </div>
    </footer>
  )
}

export default FooterComponent;