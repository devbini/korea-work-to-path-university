import React from 'react'

function departmentcomponent({ departmentinfomation }) {

    return (
        <div className='b-middle-bot'>
            <span>{departmentinfomation.department}</span>
            <span>{departmentinfomation.recruited}</span>
            <span>{departmentinfomation.degree}</span>
        </div>
    );
}

export default departmentcomponent;