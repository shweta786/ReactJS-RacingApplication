import React, { useEffect, useRef, useState } from 'react'
import './RaceController.css';
import Lane from './Lane';

const RaceController = () => {
    const [, setRenderCount] = useState(0); // for updating DOM after each move
    const [buttonText, setButtonText] = useState('PAUSE');
    const turtlePosRef = useRef(30);
    const rabbitPosRef = useRef(30);
    const interval = useRef(null);
    const isPaused = useRef(false);
    const winnerName = useRef('');

    useEffect(() => {
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
    }, [])

    function startNewRace() {
        if (turtlePosRef.current !== 30 || rabbitPosRef.current !== 30) {
            resetValues();
            turtlePosRef.current = 30
            rabbitPosRef.current = 30;
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
            setRenderCount((count) => count + 1);
        }
    }

    function resetValues() {
        winnerName.current = '';
        setButtonText('PAUSE');
    }

    function startRace() {
        if (turtlePosRef.current !== 30 || rabbitPosRef.current !== 30) {
            alert('Press NEW RACE for starting over again');
        } else if (!interval.current) {
            resetValues();
            isPaused.current = false;
            keepRunning();
        }
    }

    function keepRunning() {
        interval.current = setInterval(() => {
            if (!isPaused.current) {
                if (!winnerName.current.length) {
                    const randomChance = Math.floor(Math.random() * 2) + 1;
                    if (randomChance > 1.55) {
                        const randomInt1 = Math.floor(Math.random() * 25) + 1;
                        const randomInt2 = Math.floor(Math.random() * 25) + 1;
                        turtlePosRef.current += randomInt1;
                        rabbitPosRef.current += randomInt2;
                    } else {
                        const randomInt1 = Math.floor(Math.random() * 25) + 1;
                        const randomInt2 = Math.floor(Math.random() * 25) + 1;
                        rabbitPosRef.current += randomInt1;
                        turtlePosRef.current += randomInt2;
                    }
                }
                setRenderCount((count) => count + 1);
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
            winnerName.current = name;
            setRenderCount(count => count + 1)
        }
    }

    return (
        <div className='arena'>
            <Lane startLine='ART' endLine='FIN' imoji='🐢' fromLeft={turtlePosRef.current + 'px'}
                winnerFinalized={() => winnerFinalized('TORTOISE')} winnerName={winnerName.current}></Lane>

            <Lane startLine='ST' endLine='ISH' imoji='🐇' fromLeft={rabbitPosRef.current + 'px'}
                winnerFinalized={() => winnerFinalized('RABBIT')} winnerName={winnerName.current}></Lane>
            {
                winnerName.current.length
                    ? <div className='winner'> WINNER WINNER CHICKEN DINNER: <span className='winner-name'>{winnerName.current}</span></div>
                    : ''
            }
            <div className='actions'>
                <button onClick={startRace}>GET SET GO!!</button>
                <button onClick={pauseRace}>{buttonText}</button>
                <button onClick={startNewRace}>NEW RACE</button>
            </div>
        </div>
    )
}

export default RaceController;
