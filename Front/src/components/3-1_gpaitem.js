// GPAItem.js

import React, { useEffect, useState } from 'react';

import deleteicon from '../img/delete_Icon.png';

const GPAItem = ({ id, category, unit, rankOrAchievement, score, average, stdDev, onDelete, onChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isNumeric, setIsNumeric] = useState(false);

    useEffect(() => {
        const numericValue = parseInt(rankOrAchievement, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 9) {
            setIsNumeric(true);
        } else {
            setIsNumeric(false);
        }
    }, [rankOrAchievement]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleUnitChange = (e) => {
        if (e.target.value.length <= 2) {
            onChange('unit', e.target.value);
        }
    };

    const handleRankOrAchievementChange = (e) => {
        if (e.target.value.length <= 1) {
            onChange('rankOrAchievement', e.target.value);
        }
    };

    return (
        <div className={`middle ${isHovered ? 'selection' : ''}`}>
            <select value={category} onChange={(e) => onChange('category', parseInt(e.target.value, 10))}>
                <option value={1}>교과</option>
                <option value={2}>전문(전공)</option>
                <option value={3}>예체능</option>
            </select>
            
            <input
                type="text"
                placeholder="이수단위"
                value={unit}
                onChange={handleUnitChange}
            />

            <input
                type="text"
                placeholder="석차등급 or 성취도"
                value={rankOrAchievement}
                onChange={handleRankOrAchievementChange}
            />

            <input
                type="text"
                placeholder="원점수"
                value={score}
                onChange={(e) => onChange('score', e.target.value)}
                disabled={isNumeric}
            />

            <input
                type="text"
                placeholder="과목평균"
                value={average}
                onChange={(e) => onChange('average', e.target.value)}
                disabled={isNumeric}
            />

            <input
                type="text"
                placeholder="표준편차"
                value={stdDev}
                onChange={(e) => onChange('stdDev', e.target.value)}
                disabled={isNumeric}
            />

            <button className='deletebutton' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onDelete}>
                <img src={deleteicon} alt='삭제'></img>
            </button>
        </div>
    );
};

export default GPAItem;
