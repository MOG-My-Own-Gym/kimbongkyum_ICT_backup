import { useState, useEffect } from 'react';
import styles from "../../assets/bootstrap/css/mainpage.module.css";
import { URL } from '../../config/constants';
import axios from 'axios';

function SetTime({initDetailTime,routineId,currentDetailId}) {
    const [isRunning, setIsRunning] = useState(false);
    const [detailTime,setDetailTime] = useState();
    const [initDetail,setDetail] = useState();
    const [checkRouData,setCheckRouData] = useState([]);

    const loadRoutineDetail=async ()=>{
        await axios.get(`${URL.ROUTINEDETAIL}/${routineId}`)
            .then(res=> {setDetail(res.data.state);return res.data})
            .then(prev=>setCheckRouData(prev))
    }
    const fixKgAndManyNum=(detailTimes)=>{
        const fixDeatilData =  initDetail.map(item=>{
            console.log(currentDetailId)
            if(item.id===String(currentDetailId)){
                return {
                    ...item,
                    lest:String(detailTimes)
                }
            }
            return item;
        });
        console.log(fixDeatilData)
        axios.put(`${URL.ROUTINEDETAIL}/${routineId}`,{
            id:checkRouData.id,
            state:[...fixDeatilData]
        })
        .then(res=>{setDetail(res.data.state); return res.data.state})
        .then(res=>console.log(res))
    }
    const startCountdown = () => {
        if (detailTime > 0) setIsRunning(true);
    };

    const reset = () => {
        //setTime(timeInit);
        setIsRunning(false);
        setDetailTime(initDetailTime);
    };
    const plus=()=>{
        //setTime(res=>res+10);
        if(detailTime <=290){
            setDetailTime(res=>{
                const detailTime=String(parseInt(res)+10)
                fixKgAndManyNum(detailTime);
                return detailTime;
            })
        };
    }
    const minus=()=>{
        //setTime(res=>res-10);
        if(detailTime >=10) {
            setDetailTime(res=>{
                const detailTime=res-10
                fixKgAndManyNum(detailTime);
                return detailTime;
            })
        };
    }

    useEffect(()=>{
        //detailData();
        loadRoutineDetail();
        setDetailTime(initDetailTime);
    },[initDetailTime])

    useEffect(() => {
        let timer;

        if (isRunning && detailTime > 0) {
            timer = setTimeout(() => {
            setDetailTime(prev => prev - 1);
            }, 1000); // 1초마다 감소
        }

        return () => clearTimeout(timer); // 컴포넌트 언마운트 또는 타임 변경 시 타이머 정리
    }, [isRunning, detailTime]);

    return <>
        <div className={` ${styles.header} container`} >
            <button className={` btn btn-primary`} type="button" onClick={e=>plus()}>+</button>
            <h1 onChange={e => changeTime(e.target.value)}></h1>
                <h2>{detailTime}</h2>
            <button className={` btn btn-primary`} type="button" onClick={e=>minus()}>-</button>
        </div>
        
        <button onClick={startCountdown} disabled={isRunning || detailTime === 0}>
        시작
        </button>
        <button onClick={reset}>초기화</button>

    </>;
}

export default SetTime;