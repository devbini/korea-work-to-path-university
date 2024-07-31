// EmploymentItem.js

import React, { useState } from 'react';

const EmploymentItem = ({ startDate, endDate, onStartDateChange, onEndDateChange, onRemove }) => {
    //#region [인풋필드]
    const formatDateString = (dateString) => {
        if (!dateString) return ''; // 빈 문자열이면 빈 문자열 반환
        // 입력된 값을 yyyymmdd 형식으로 변환
        const formattedDate = dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
        return formattedDate;
    };

    const handleStartDateChange = (event) => {
        let { value } = event.target;
        // 숫자만 허용하는 정규식 사용
        if (/^\d*$/.test(value)) {
            value = formatDateString(value);
            onStartDateChange({ ...event, target: { ...event.target, value } });
        }
    };

    const handleEndDateChange = (event) => {
        let { value } = event.target;
        // 숫자만 허용하는 정규식 사용
        if (/^\d*$/.test(value)) {
            value = formatDateString(value);
            onEndDateChange({ ...event, target: { ...event.target, value } });
        }
    };
    //#endregion

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={`middle ${isHovered ? 'selection' : ''}`}>
            <input
                type="text"
                placeholder="입사년월일 (yyyymmdd)"
                value={startDate}
                onChange={handleStartDateChange}
            />
            <span> ~ </span>
            <input
                type="text"
                placeholder="퇴사년월일 (yyyymmdd)"
                value={endDate}
                onChange={handleEndDateChange}
            />
            <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onRemove}>
                삭제
            </button>
        </div>
    );
};

export default EmploymentItem;
