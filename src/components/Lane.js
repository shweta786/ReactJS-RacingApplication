import './Lane.css';
import React, { memo, useEffect, useRef } from 'react'

const Lane = props => {
    const participantEle = useRef();

    useEffect(() => {
        let fromLeftPos = Number.parseInt(participantEle.current.style.left);
        let parentTotalWidth = participantEle.current.parentElement.clientWidth;
        if (fromLeftPos >= parentTotalWidth - 90) {
            props.winnerFinalized()
        }
    })

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

export default memo(Lane);
