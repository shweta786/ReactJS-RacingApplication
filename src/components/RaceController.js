import React, { useEffect, useRef, useState } from 'react'
import './RaceController.css';
import Lane from './Lane';

const RaceController = () => {

    const [turtlePos, setTurtlePos] = useState(30);
    const [rabbitPos, setRabbitPos] = useState(30);
    const [textVal, setText] = useState('PAUSE');
    const interval = useRef(null);
    const isPaused = useRef(false);

    useEffect(() => {
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        }
    }, [])

    function resetPos() {
        setTurtlePos(30);
        setRabbitPos(30);
        if (interval.current) {
            clearInterval(interval.current);
        }
    }

    function startRace() {
        if (!interval.current) {
            isPaused.current = false;
            setText('PAUSE');
            keepRunning();
        }
    }

    function keepRunning() {
        interval.current = setInterval(() => {
            if (!isPaused.current) {
                let randomInt = Math.floor(Math.random() * 25);
                setTurtlePos((turtlePos) => turtlePos + randomInt);
                randomInt = Math.floor(Math.random() * 25);
                setRabbitPos((rabbitPos) => rabbitPos + randomInt);
            }
        }, 200);
    }

    function pauseRace() {
        if (interval.current) {
            isPaused.current = !isPaused.current;
            isPaused.current ? setText('RESUME') : setText('PAUSE');
        }
    }

    function winnerFinalized(name) {
        if (interval.current) {
            alert('Winner is ' + name)
            clearInterval(interval.current);
            interval.current = null;
        }
    }

    return (
        <div className='arena'>
            <Lane startLine='ART' endLine='FIN' imoji='🐢' fromLeft={turtlePos + 'px'}
                winnerFinalized={() => winnerFinalized('turtle')}></Lane>
            <Lane startLine='ST' endLine='ISH' imoji='🐇' fromLeft={rabbitPos + 'px'}
                winnerFinalized={() => winnerFinalized('rabbit')}></Lane>
            <div className='actions'>
                <button onClick={startRace}>GET SET GO!!</button>
                <button onClick={pauseRace}>{textVal}</button>
                <button onClick={resetPos}>NEW RACE</button>
            </div>
        </div>
    )
}

export default RaceController;
