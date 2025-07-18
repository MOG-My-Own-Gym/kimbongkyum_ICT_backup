import { useState, useEffect } from 'react';
import styles from "../../assets/bootstrap/css/mainpage.module.css";

function SetTime({timeInit,setDetailTime,initDetailTime}) {
    const [isRunning, setIsRunning] = useState(false);
    useEffect(() => {
    let timer;

    if (isRunning && initDetailTime > 0) {
        timer = setTimeout(() => {
        setDetailTime(prev => prev - 1);
        }, 1000); // 1초마다 감소
    }

    return () => clearTimeout(timer); // 컴포넌트 언마운트 또는 타임 변경 시 타이머 정리
    }, [isRunning, initDetailTime]);

    const startCountdown = () => {
    if (initDetailTime > 0) setIsRunning(true);
    };

    const reset = () => {
        //setTime(timeInit);
        setIsRunning(false);
        setDetailTime(timeInit);
    };
    const plus=()=>{
        //setTime(res=>res+10);
        if(initDetailTime <=290)setDetailTime(res=>String(parseInt(res)+10));
    }
    const minus=()=>{
        //setTime(res=>res-10);
        if(initDetailTime >=10) setDetailTime(res=>res-10);
    }

    return <>
        <div className={` ${styles.header} container`} >
            <button className={` btn btn-primary`} type="button" onClick={e=>plus()}>+</button>
            <h1 onChange={e => changeTime(e.target.value)}></h1>
                <h2>{initDetailTime}</h2>
            <button className={` btn btn-primary`} type="button" onClick={e=>minus()}>-</button>
        </div>
        
        <button onClick={startCountdown} disabled={isRunning || initDetailTime === 0}>
        시작
        </button>
        <button onClick={reset}>초기화</button>

    </>;
}

export default SetTime;