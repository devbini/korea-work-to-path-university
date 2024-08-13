import React from 'react'

function departmentcomponent({ departmentinfomation }) {

    return (
        <div className='b-middle-bot'>
            <span>{departmentinfomation.NAME}</span>
            <span>{departmentinfomation.COUNT}</span>
            <span>{departmentinfomation.GRADE}</span>
        </div>
    );
}

export default departmentcomponent;