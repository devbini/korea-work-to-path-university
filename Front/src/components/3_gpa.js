import React, { useRef, useState } from 'react';
import "../css/main.css";
import "../css/gpa.css";
import CryptoJS from 'crypto-js';
import Navcomponent from "./header";
import FooterComponent from "./footer";

import GPAItem from './3-1_gpaitem';
import reset_icon from '../img/reset_icon.png';

function GPAcomponent() {
    const initialGpaItemState = { id: 1, category: 1, unit: '', rankOrAchievement: '', score: '', average: '', stdDev: '' };

    const [gpaItems, setGpaItems] = useState([{ ...initialGpaItemState }]);
    const [gpaItems12, setGpaItems12] = useState([{ ...initialGpaItemState }]);
    const [gpaItems21, setGpaItems21] = useState([{ ...initialGpaItemState }]);
    const [gpaItems22, setGpaItems22] = useState([{ ...initialGpaItemState }]);
    const [gpaItems31, setGpaItems31] = useState([{ ...initialGpaItemState }]);
    const [gpaItems32, setGpaItems32] = useState([{ ...initialGpaItemState }]);
    const [sectionVisibility, setSectionVisibility] = useState(Array(8).fill(true));

    const [gparesult1, setgparesult1] = useState(["-","-"]);
    const [gparesult2, setgparesult2] = useState(["-","-"]);
    const [gparesult3, setgparesult3] = useState(["-","-"]);
    const [gparesultall, setgparesult4] = useState(["-","-"]);

    const addGPAelement = (items, setItems) => {
        const newId = Math.max(...items.map(gpa => gpa.id), 0) + 1;
        setItems([...items, { ...initialGpaItemState, id: newId }]);
    };

    const removeGPAelement = (id, items, setItems) => {
        if (items.length === 1) {
            alert("하나는 남아있어야 합니다!");
            return;
        }
        setItems(items.filter(gpa => gpa.id !== id));
    };

    const resetGPAelement = (setItems) => {
        setItems([{ ...initialGpaItemState }]);
    };

    const toggleSectionVisibility = (index) => {
        setSectionVisibility(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const setresult = (target_data, target_dataFunction) => {
        var alldata, lidata;

        // 종합내신
        var filteredItems = target_data.filter(item => item.category !== 3 && item.unit !== '');
    
        // 각 filteredItems의 unit과 rankOrAchievement를 곱한 값들의 배열
        var multipliedValues = filteredItems.map(item => {
            if (!isNaN(item.rankOrAchievement) && parseFloat(item.rankOrAchievement) >= 1 && parseFloat(item.rankOrAchievement) <= 9) {
                // rankOrAchievement이 1~9 사이의 숫자인 경우
                const unitValue = parseFloat(item.unit); // unit을 숫자로 변환
                const rankOrAchievementValue = parseFloat(item.rankOrAchievement); // rankOrAchievement을 숫자로 변환
                // console.log(item.id  + " :  " + unitValue * rankOrAchievementValue);
                return unitValue * rankOrAchievementValue;
            } else {
                // rankOrAchievement이 숫자가 아닌 경우, (score - average) / stdDev를 환산하여 등급을 매김
                const score = parseFloat(item.score);
                const average = parseFloat(item.average);
                const stdDev = parseFloat(item.stdDev);

                if (isNaN(score) || isNaN(average) || isNaN(stdDev) || stdDev === 0) {
                    return 0; // 예외 처리: stdDev가 0인 경우
                }

                const zScore = (score - average) / stdDev;

                // zScore에 따른 등급 환산
                let grade;
                if (zScore >= 1.76) {
                    grade = 1;
                } else if (zScore >= 1.23) {
                    grade = 2;
                } else if (zScore >= 0.74) {
                    grade = 3;
                } else if (zScore >= 0.26) {
                    grade = 4;
                } else if (zScore >= -0.25) {
                    grade = 5;
                } else if (zScore >= -0.73) {
                    grade = 6;
                } else if (zScore >= -1.22) {
                    grade = 7;
                } else if (zScore >= -1.75) {
                    grade = 8;
                } else {
                    grade = 9; // zScore가 -3.00보다 작은 경우, 최하위 등급으로 설정
                }
                const unitValue = parseFloat(item.unit); // unit을 숫자로 변환
                // console.log(zScore);
                return unitValue * grade;
            }
        });
    
        // 각 곱한 값들의 총합 계산
        var totalMultiplication = multipliedValues.reduce((acc, curr) => acc + curr, 0);
    
        // unit들의 총합 계산
        var totalUnits = filteredItems.reduce((acc, item) => {
            const unitValue = parseFloat(item.unit); // unit을 숫자로 변환
            return acc + unitValue;
        }, 0);

        alldata = totalMultiplication / totalUnits;
        console.log("ALLDATA : " + alldata);
        // 교과내신
        filteredItems = target_data.filter(item => item.category === 1 && item.unit !== '');
        // 각 filteredItems의 unit과 rankOrAchievement를 곱한 값들의 배열
        multipliedValues = filteredItems.map(item => {
            if (!isNaN(item.rankOrAchievement) && parseFloat(item.rankOrAchievement) >= 1 && parseFloat(item.rankOrAchievement) <= 9) {
                // rankOrAchievement이 1~9 사이의 숫자인 경우
                const unitValue = parseFloat(item.unit); // unit을 숫자로 변환
                const rankOrAchievementValue = parseFloat(item.rankOrAchievement); // rankOrAchievement을 숫자로 변환
                // console.log(item.id + " :  " + unitValue * rankOrAchievementValue);
                return unitValue * rankOrAchievementValue;
            } else {
                // rankOrAchievement이 숫자가 아닌 경우, (score - average) / stdDev를 환산하여 등급을 매김
                const score = parseFloat(item.score);
                const average = parseFloat(item.average);
                const stdDev = parseFloat(item.stdDev);

                if (isNaN(score) || isNaN(average) || isNaN(stdDev) || stdDev === 0) {
                    return 0; // 예외 처리: stdDev가 0인 경우
                }

                const zScore = (score - average) / stdDev;

                // zScore에 따른 등급 환산
                let grade;
                if (zScore >= 1.76) {
                    grade = 1;
                } else if (zScore >= 1.23) {
                    grade = 2;
                } else if (zScore >= 0.74) {
                    grade = 3;
                } else if (zScore >= 0.26) {
                    grade = 4;
                } else if (zScore >= -0.25) {
                    grade = 5;
                } else if (zScore >= -0.73) {
                    grade = 6;
                } else if (zScore >= -1.22) {
                    grade = 7;
                } else if (zScore >= -1.75) {
                    grade = 8;
                } else {
                    grade = 9; // zScore가 -3.00보다 작은 경우, 최하위 등급으로 설정
                }
                const unitValue = parseFloat(item.unit); // unit을 숫자로 변환
                // console.log(zScore);
                return unitValue * grade;
            }
        });

        // 각 곱한 값들의 총합 계산
        totalMultiplication = multipliedValues.reduce((acc, curr) => acc + curr, 0);

        // unit들의 총합 계산
        totalUnits = filteredItems.reduce((acc, item) => {
            const unitValue = parseFloat(item.unit); // unit을 숫자로 변환
            return acc + unitValue;
        }, 0);

        lidata = totalMultiplication / totalUnits;
        console.log("lidata : " + lidata);
        target_dataFunction([alldata.toFixed(2), lidata.toFixed(2)]);
        // console.log('Filtered GPA Items:');
        // filteredItems.forEach((item, index) => {
        //     console.log(`Item ${index + 1}: Unit - ${item.unit}, Rank/Achievement - ${item.rankOrAchievement}`);
        // });
    
        // console.log(`Total multiplication of filtered items: ${totalMultiplication}`);
        // console.log(`Total units of filtered items: ${totalUnits}`);
        // console.log(`결과 : ${(totalMultiplication / totalUnits).toFixed(5)}`);
    }

    const logFilteredGpaItems = () => {
        const gpa1 = [
            ...gpaItems,
            ...gpaItems12
        ]
        
        const gpa2 = [
            ...gpaItems21,
            ...gpaItems22
        ]

        const gpa3 = [
            ...gpaItems31,
            ...gpaItems32
        ]

        const allItems = [
            ...gpaItems,
            ...gpaItems12,
            ...gpaItems21,
            ...gpaItems22,
            ...gpaItems31,
            ...gpaItems32
        ];
    
        setresult(gpa1, setgparesult1);
        setresult(gpa2, setgparesult2);
        setresult(gpa3, setgparesult3);
        setresult(allItems, setgparesult4);
    };

    const handleItemChange = (setItems, id, field, value) => {
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    // save and load
    const saveToFile = () => {
        const data = {
            gpaItems,
            gpaItems12,
            gpaItems21,
            gpaItems22,
            gpaItems31,
            gpaItems32
        };

        // 데이터를 문자열로 변환한 후 AES 암호화
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secretkey').toString();

        // Blob 생성
        const file = new Blob([ciphertext], { type: 'application/json' });

        // 현재 날짜와 시간을 포맷팅
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        // 포맷팅된 날짜와 시간을 포함한 파일 이름 생성
        const filename = `gpa_${year}${month}${day}_${hours}${minutes}.wpu`;
        
        // 다운로드 링크 생성 및 클릭
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
    };

    const fileInputRef = useRef(null); // Ref 객체 생성
    const loadFromFile = () => {
        fileInputRef.current.click(); // 파일 업로드 창 열기
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // 선택된 파일

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                try {
                    // AES 복호화 후 JSON 파싱
                    const bytes = CryptoJS.AES.decrypt(content, 'secretkey');
                    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    // 각 GPA 항목 상태에 반영
                    setGpaItems(decryptedData.gpaItems || []);
                    setGpaItems12(decryptedData.gpaItems12 || []);
                    setGpaItems21(decryptedData.gpaItems21 || []);
                    setGpaItems22(decryptedData.gpaItems22 || []);
                    setGpaItems31(decryptedData.gpaItems31 || []);
                    setGpaItems32(decryptedData.gpaItems32 || []);

                    console.log('Loaded and decrypted GPA data:', decryptedData); // 로그 출력 (테스트용)
                } catch (error) {
                    console.error('Error decrypting or parsing JSON:', error);
                }
            };

            reader.readAsText(file); // 파일을 텍스트 형식으로 읽음
        }
    };

    return (
        <div className="c-gpa-root">
            <Navcomponent />
            <div className="c-gpa-titlebar">
                <div className="titlebox">
                    <span className="title"> 내신 계산기 </span>
                    <span className="description">종합 및 교과 내신도 모두 자동 계산합니다.</span>
                </div>
            </div>

            <div className='c-gpa-top-description'>
                <div className="c-saveandload">
                    <button className='savebutton' onClick={() => saveToFile()}>입력한 성적 저장하기</button>
                    <button className='loadbutton' onClick={() => loadFromFile()}>입력했던 성적 불러오기</button>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept='.wpu'/>
                    {/* <button onClick={() => logFilteredGpaItems()}>LOG</button> */}
                </div>
                <p>교과 : 국어/수학/사회/과학/영어 과목<br />전공 : 교과를 제외한 모든 과목<br />예체능 : 음악/미술/체육/진로 과목, 내신 산출에 사용하지 않습니다.</p>
            </div>

            <div className="c-gpa-middlebar">
                <div className='gpaminibox'>
                    <div className="gpabox">
                        <div id='AA' className='item'>
                            <div className='topbar'>
                                <div onClick={() => toggleSectionVisibility(0)}>
                                    <button className={`buttons ${sectionVisibility[0] ? 'unhidden' : 'hidden'}`}>{'>'}</button>
                                    <span className={`title ${sectionVisibility[0] ? 'unhiddent' : 'hiddent'}`}>1학년 1학기 성적 입력</span>
                                </div>
                                <button className='titlebutton' onClick={() => resetGPAelement(setGpaItems)}>
                                    <img src={reset_icon} alt='리셋' />
                                </button>
                            </div>
                            <div className='Blockline'></div>
                            {sectionVisibility[0] && (
                                <section>
                                    <div className='item_header'>
                                        <span>교과 구분</span>
                                        <span>이수 단위</span>
                                        <span>석차등급 / 성취도</span>
                                        <span>원 점수</span>
                                        <span>과목 평균</span>
                                        <span>평균 편차</span>
                                    </div>
                                    {gpaItems.map((gpa) => (
                                        <GPAItem
                                            key={gpa.id}
                                            {...gpa}
                                            onDelete={() => removeGPAelement(gpa.id, gpaItems, setGpaItems)}
                                            onChange={(field, value) => handleItemChange(setGpaItems, gpa.id, field, value)}
                                        />
                                    ))}
                                    <button className='Newbutton' onClick={() => addGPAelement(gpaItems, setGpaItems)}>+ (성적 추가)</button>
                                </section>
                            )}
                        </div>
                    </div>

                    <div className="gpabox">
                        <div id='AB' className='item'>
                            <div className='topbar'>
                                <div onClick={() => toggleSectionVisibility(1)}>
                                    <button className={`buttons ${sectionVisibility[1] ? 'unhidden' : 'hidden'}`}>{'>'}</button>
                                    <span className={`title ${sectionVisibility[1] ? 'unhiddent' : 'hiddent'}`}>1학년 2학기 성적 입력</span>
                                </div>
                                <button className='titlebutton' onClick={() => resetGPAelement(setGpaItems12)}>
                                    <img src={reset_icon} alt='리셋' />
                                </button>
                            </div>
                            <div className='Blockline'></div>
                            {sectionVisibility[1] && (
                                <section>
                                    <div className='item_header'>
                                        <span>교과 구분</span>
                                        <span>이수 단위</span>
                                        <span>석차등급 / 성취도</span>
                                        <span>원 점수</span>
                                        <span>과목 평균</span>
                                        <span>평균 편차</span>
                                    </div>
                                    {gpaItems12.map((gpa) => (
                                        <GPAItem
                                            key={gpa.id}
                                            {...gpa}
                                            onDelete={() => removeGPAelement(gpa.id, gpaItems12, setGpaItems12)}
                                            onChange={(field, value) => handleItemChange(setGpaItems12, gpa.id, field, value)}
                                        />
                                    ))}
                                    <button className='Newbutton' onClick={() => addGPAelement(gpaItems12, setGpaItems12)}>+ (성적 추가)</button>
                                </section>
                            )}
                        </div>
                    </div>
                </div>

                <div className='gpaminibox'>
                    <div className="gpabox">
                        <div id='BA' className='item'>
                            <div className='topbar'>
                                <div onClick={() => toggleSectionVisibility(2)}>
                                    <button className={`buttons ${sectionVisibility[2] ? 'unhidden' : 'hidden'}`}>{'>'}</button>
                                    <span className={`title ${sectionVisibility[2] ? 'unhiddent' : 'hiddent'}`}>2학년 1학기 성적 입력</span>
                                </div>
                                <button className='titlebutton' onClick={() => resetGPAelement(setGpaItems21)}>
                                    <img src={reset_icon} alt='리셋' />
                                </button>
                            </div>
                            <div className='Blockline'></div>
                            {sectionVisibility[2] && (
                                <section>
                                    <div className='item_header'>
                                        <span>교과 구분</span>
                                        <span>이수 단위</span>
                                        <span>석차등급 / 성취도</span>
                                        <span>원 점수</span>
                                        <span>과목 평균</span>
                                        <span>평균 편차</span>
                                    </div>
                                    {gpaItems21.map((gpa) => (
                                        <GPAItem
                                            key={gpa.id}
                                            {...gpa}
                                            onDelete={() => removeGPAelement(gpa.id, gpaItems21, setGpaItems21)}
                                            onChange={(field, value) => handleItemChange(setGpaItems21, gpa.id, field, value)}
                                        />
                                    ))}
                                    <button className='Newbutton' onClick={() => addGPAelement(gpaItems21,setGpaItems21)}>+ (성적 추가)</button>
                                </section>
                            )}
                        </div>
                    </div>

                    <div className="gpabox">
                        <div id='BB' className='item'>
                            <div className='topbar'>
                                <div onClick={() => toggleSectionVisibility(3)}>
                                    <button className={`buttons ${sectionVisibility[3] ? 'unhidden' : 'hidden'}`}>{'>'}</button>
                                    <span className={`title ${sectionVisibility[3] ? 'unhiddent' : 'hiddent'}`}>2학년 2학기 성적 입력</span>
                                </div>
                                <button className='titlebutton' onClick={() => resetGPAelement(setGpaItems22)}>
                                    <img src={reset_icon} alt='리셋' />
                                </button>
                            </div>
                            <div className='Blockline'></div>
                            {sectionVisibility[3] && (
                                <section>
                                    <div className='item_header'>
                                        <span>교과 구분</span>
                                        <span>이수 단위</span>
                                        <span>석차등급 / 성취도</span>
                                        <span>원 점수</span>
                                        <span>과목 평균</span>
                                        <span>평균 편차</span>
                                    </div>
                                    {gpaItems22.map((gpa) => (
                                        <GPAItem
                                            key={gpa.id}
                                            {...gpa}
                                            onDelete={() => removeGPAelement(gpa.id, gpaItems22, setGpaItems22)}
                                            onChange={(field, value) => handleItemChange(setGpaItems22, gpa.id, field, value)}
                                        />
                                    ))}
                                    <button className='Newbutton' onClick={() => addGPAelement(gpaItems22,setGpaItems22)}>+ (성적 추가)</button>
                                </section>
                            )}
                        </div>
                    </div>
                </div>

                <div className='gpaminibox'>
                    <div className="gpabox">
                        <div id='CA' className='item'>
                            <div className='topbar'>
                                <div onClick={() => toggleSectionVisibility(4)}>
                                    <button className={`buttons ${sectionVisibility[4] ? 'unhidden' : 'hidden'}`}>{'>'}</button>
                                    <span className={`title ${sectionVisibility[4] ? 'unhiddent' : 'hiddent'}`}>3학년 1학기 성적 입력</span>
                                </div>
                                <button className='titlebutton' onClick={() => resetGPAelement(setGpaItems31)}>
                                    <img src={reset_icon} alt='리셋' />
                                </button>
                            </div>
                            <div className='Blockline'></div>
                            {sectionVisibility[4] && (
                                <section>
                                    <div className='item_header'>
                                        <span>교과 구분</span>
                                        <span>이수 단위</span>
                                        <span>석차등급 / 성취도</span>
                                        <span>원 점수</span>
                                        <span>과목 평균</span>
                                        <span>평균 편차</span>
                                    </div>
                                    {gpaItems31.map((gpa) => (
                                        <GPAItem
                                            key={gpa.id}
                                            {...gpa}
                                            onDelete={() => removeGPAelement(gpa.id, gpaItems31, setGpaItems31)}
                                            onChange={(field, value) => handleItemChange(setGpaItems31, gpa.id, field, value)}
                                        />
                                    ))}
                                    <button className='Newbutton' onClick={() => addGPAelement(gpaItems31,setGpaItems31)}>+ (성적 추가)</button>
                                </section>
                            )}
                        </div>
                    </div>

                    <div className="gpabox">
                        <div id='CB' className='item'>
                            <div className='topbar'>
                                <div onClick={() => toggleSectionVisibility(5)}>
                                    <button className={`buttons ${sectionVisibility[5] ? 'unhidden' : 'hidden'}`}>{'>'}</button>
                                    <span className={`title ${sectionVisibility[5] ? 'unhiddent' : 'hiddent'}`}>3학년 2학기 성적 입력</span>
                                </div>
                                <button className='titlebutton' onClick={() => resetGPAelement(setGpaItems32)}>
                                    <img src={reset_icon} alt='리셋' />
                                </button>
                            </div>
                            <div className='Blockline'></div>
                            {sectionVisibility[5] && (
                                <section>
                                    <div className='item_header'>
                                        <span>교과 구분</span>
                                        <span>이수 단위</span>
                                        <span>석차등급 / 성취도</span>
                                        <span>원 점수</span>
                                        <span>과목 평균</span>
                                        <span>평균 편차</span>
                                    </div>
                                    {gpaItems32.map((gpa) => (
                                        <GPAItem
                                            key={gpa.id}
                                            {...gpa}
                                            onDelete={() => removeGPAelement(gpa.id, gpaItems32, setGpaItems32)}
                                            onChange={(field, value) => handleItemChange(setGpaItems32, gpa.id, field, value)}
                                        />
                                    ))}
                                    <button className='Newbutton' onClick={() => addGPAelement(gpaItems32,setGpaItems32)}>+ (성적 추가)</button>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* 학생부 종합 내신 / 학생부 교과 내신 / 동국대식 내신 (점수) */}
                <button className='calcgpabutton' onClick={() => logFilteredGpaItems()}> 내신 산출 시작 </button>
                
            </div>
            <div className='calcresult_box' > {/*// 전체*/}
                <div className='calcresult_year'> {/*// 학년별*/}
                    <span className='title'>1학년</span>
                    <div className='minibox'>
                        <div className='itembox'>
                            <span>학생부종합</span>
                            <div className='items'> {/*// 종합*/}
                                <span>{isNaN(gparesult1[0]) ? "-" : gparesult1[0]}</span>
                            </div>
                        </div>
                        <div className='itembox'> {/*// 교과*/}
                            <span>학생부교과</span>
                            <div className='items'>
                                <span>{isNaN(gparesult1[1]) ? "-" : gparesult1[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='calcresult_year'> {/*// 학년별*/}
                    <span className='title'>2학년</span>
                    <div className='minibox'>
                        <div className='itembox'>
                            <span>학생부종합</span>
                            <div className='items'> {/*// 종합*/}
                                <span>{isNaN(gparesult2[0]) ? "-" : gparesult2[0]}</span>
                            </div>
                        </div>
                        <div className='itembox'> {/*// 교과*/}
                            <span>학생부교과</span>
                            <div className='items'>
                                <span>{isNaN(gparesult2[1]) ? "-" : gparesult2[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='calcresult_year'> {/*// 학년별*/}
                    <span className='title'>3학년</span>
                    <div className='minibox'>
                        <div className='itembox'>
                            <span>학생부종합</span>
                            <div className='items'> {/*// 종합*/}
                                <span>{isNaN(gparesult3[0]) ? "-" : gparesult3[0]}</span>
                            </div>
                        </div>
                        <div className='itembox'> {/*// 교과*/}
                            <span>학생부교과</span>
                            <div className='items'>
                                <span>{isNaN(gparesult3[1]) ? "-" : gparesult3[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='calcresult_box_all' > {/*// 전체*/}
                <div className='calcresult_year'> {/*// 학년별*/}
                    <span className='title'>전 학년 종합 결과</span>
                    <div className='minibox'>
                        <div className='itembox'>
                            <span>학생부종합</span>
                            <div className='items'> {/*// 종합*/}
                                <span>{isNaN(gparesultall[0]) ? "-" : gparesultall[0]}</span>
                            </div>
                        </div>
                        <div className='itembox'> {/*// 교과*/}
                            <span>학생부교과</span>
                            <div className='items'>
                                <span>{isNaN(gparesultall[1]) ? "-" : gparesultall[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterComponent />
        </div>
    );
}


export default GPAcomponent;


