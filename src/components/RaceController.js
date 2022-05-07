import React, { useEffect, useRef, useState } from 'react'
import './RaceController.css';
import Lane from './Lane';

const RaceController = () => {

    const [turtlePos, setTurtlePos] = useState(30);
    const [rabbitPos, setRabbitPos] = useState(30);
    const [winnerName, setWinnerName] = useState('');
    const [buttonText, setButtonText] = useState('PAUSE');
    const interval = useRef(null);
    const isPaused = useRef(false);
    let winnerDiv = winnerName.length ? <div className='winner'> WINNER WINNER CHICKEN DINNER: {winnerName}</div> : '';

    useEffect(() => {
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
    }, [])

    function resetPos() {
        if (turtlePos !== 30 || rabbitPos !== 30) {
            setWinnerName('');
            setButtonText('PAUSE');
            setTurtlePos(30);
            setRabbitPos(30);
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
    }

    function startRace() {
        if (!interval.current && (turtlePos === 30 || rabbitPos === 30)) {
            setWinnerName('');
            setButtonText('PAUSE');
            isPaused.current = false;
            keepRunning();
        }
    }

    function keepRunning() {
        interval.current = setInterval(() => {
            if (!isPaused.current) {
                let randomInt = Math.floor(Math.random() * 25) + 1;
                setTurtlePos((turtlePos) => turtlePos + randomInt);
                randomInt = Math.floor(Math.random() * 25) + 1;
                setRabbitPos((rabbitPos) => rabbitPos + randomInt);
            }
        }, 200);
    }

    function pauseRace() {
        if (interval.current) {
            isPaused.current = !isPaused.current;
            isPaused.current ? setButtonText('RESUME') : setButtonText('PAUSE');
        }
    }

    function winnerFinalized(name) {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
            setWinnerName(name);
        }
    }

    return (
        <div className='arena'>
            <Lane startLine='ART' endLine='FIN' imoji='🐢' fromLeft={turtlePos + 'px'}
                winnerFinalized={() => winnerFinalized('TORTOISE')}></Lane>
            <Lane startLine='ST' endLine='ISH' imoji='🐇' fromLeft={rabbitPos + 'px'}
                winnerFinalized={() => winnerFinalized('RABBIT')}></Lane>
            {winnerDiv}
            <div className='actions'>
                <button onClick={startRace}>GET SET GO!!</button>
                <button onClick={pauseRace}>{buttonText}</button>
                <button onClick={resetPos}>NEW RACE</button>
            </div>
        </div>
    )
}

export default RaceController;
