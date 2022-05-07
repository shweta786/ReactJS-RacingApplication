import './Lane.css';
import React, { useEffect, useRef } from 'react'

const Lane = props => {
    const participantEle = useRef();

    useEffect(() => {
        let num1 = Number.parseInt(participantEle.current.style.left);
        let num2 = participantEle.current.parentElement.clientWidth;
        if(num1 >= num2 - 95) {
            props.winnerFinalized()
        }
    }, [props.fromLeft])

    const fromLeft = { left: props.fromLeft };
    return (
        <div className='lane'>
            <div className='emoji' style={fromLeft} ref={participantEle}>{props.imoji}</div>
            <div className='start-line'>
                {props.startLine}
            </div>
            <div className='finish-line'>
                {props.endLine}
            </div>
        </div>
    )
}

export default Lane;
