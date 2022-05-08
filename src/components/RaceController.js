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

    function startNewRace() {
        if (turtlePos !== 30 || rabbitPos !== 30) {
            resetValues();
            setTurtlePos(30);
            setRabbitPos(30);
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
    }

    function resetValues() {
        setWinnerName('');
        setButtonText('PAUSE');
    }

    function startRace() {
        if (!interval.current && turtlePos === 30 && rabbitPos === 30) {
            resetValues();
            isPaused.current = false;
            keepRunning();
        }
        if (turtlePos !== 30 || rabbitPos !== 30) {
            alert('Press NEW RACE for starting over again');
        }
    }

    function keepRunning() {
        interval.current = setInterval(() => {
            if (!isPaused.current) {
                const randomInt1 = Math.floor(Math.random() * 25) + 1;
                const randomInt2 = Math.floor(Math.random() * 25) + 1;
                setTurtlePos((turtlePos) => turtlePos + randomInt1);
                setRabbitPos((rabbitPos) => rabbitPos + randomInt2);
            }
        }, 200);
    }

    function pauseRace() {
        if (interval.current) {
            isPaused.current = !isPaused.current;
            isPaused.current ? setButtonText('RESUME') : setButtonText('PAUSE');
        }
    }

    const winnerFinalized = (name) => {
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
                <button onClick={startNewRace}>NEW RACE</button>
            </div>
        </div>
    )
}

export default RaceController;
