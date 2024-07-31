import React, { useState, useEffect  } from 'react';
import "../css/main.css";
import "../css/employment.css";

import Navcomponent from "./header";
import FooterComponent from "./footer";

import EmploymentItem from "./2-1_employmentItem";

function Employmentcomponent() {
    const [employments, setEmployments] = useState([{ id: 1, startDate: '', endDate: '' }]);

    const addEmployment = () => {
        const newId = Math.max(...employments.map(emp => emp.id), 0) + 1;
        setEmployments([...employments, { id: newId, startDate: '', endDate: '' }]);
    };

    const removeEmployment = (id) => {
        if (employments.length === 1) {
            alert("하나는 남아있어야 합니다!");
            return;
        }
        setEmployments(employments.filter(emp => emp.id !== id));
    };

    const handleStartDateChange = (event, index) => {
        const { value } = event.target;
        const updatedEmployments = [...employments];
        updatedEmployments[index].startDate = value;
        setEmployments(updatedEmployments);
    };

    const handleEndDateChange = (event, index) => {
        const { value } = event.target;
        const updatedEmployments = [...employments];
        updatedEmployments[index].endDate = value;
        setEmployments(updatedEmployments);
    };

    const resetEmployments = () => {
        setEmployments([{ id: 1, startDate: '', endDate: '' }]);
    };

    const calculateTotalExperience = () => {
        let totalDays = 0;
        let hasValidDates = false;
        employments.forEach(employment => {
            const start = new Date(employment.startDate);
            const end = new Date(employment.endDate);
            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                hasValidDates = true;
                const differenceInTime = end.getTime() - start.getTime();
                const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                totalDays += differenceInDays;
            }
        });
        return hasValidDates ? Math.round(totalDays) : 0;
    };

    const updateTotalExperience = () => {
        const sumDateElement = document.getElementById('SUMDATE');
        if (sumDateElement) {
            sumDateElement.textContent = calculateTotalExperience() + '일';
        }
    };
    
    useEffect(() => {
        const initializePage = () => {
            resetEmployments();
            updateTotalExperience();
        };
    
        initializePage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div className="c-employment-root">

            <Navcomponent />

            {/* 최상단, 타이틀 */}
            <div className="c-employment-titlebar">
                <div className="titlebox">
                    <span className="title"> 재직 기간 계산기 </span>
                    <span className="description">고용보험, 건강보험 효력일을 기준으로 계산합니다.</span>
                </div>
            </div>

            {/* 재직기간 입력부 */}
            <div className="c-employment-middlebar">
                <div className="top">
                    <span className="title">재직기간 입력</span>
                    <button onClick={addEmployment}>재직기간 추가</button>
                </div>

                <section>
                    {employments.map((employment, index) => (
                        <EmploymentItem
                            key={employment.id}
                            startDate={employment.startDate}
                            endDate={employment.endDate}
                            onStartDateChange={(event) => handleStartDateChange(event, index)}
                            onEndDateChange={(event) => handleEndDateChange(event, index)}
                            onRemove={() => removeEmployment(employment.id)}
                        />
                    ))}
                </section>

                <div className="bottom">
                    <button className="calc" onClick={updateTotalExperience}>경력 계산하기</button>
                    <button className="reset" onClick={resetEmployments}>초기화</button>
                </div>
            </div>

            <div className="c-employment-fin">
                <div className="box">
                    <p className="text">
                        계산된 재직일 수는 <span id='SUMDATE'></span>입니다.
                    </p>
                </div>
            </div>

            <FooterComponent />
        </div>
    );
}

export default Employmentcomponent;
