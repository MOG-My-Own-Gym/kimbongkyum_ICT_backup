import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../assets/bootstrap/css/mainpage.module.css";
import "../../assets/bootstrap/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config/constants";

export default function RunningRoutinePage(){
    const navigate = useNavigate();
    const {search } = useLocation();
    const {state } = useLocation();
    console.log('Rounning페이지로 넘어온 값 state:',state)
    const params = new URLSearchParams(search);
    const routineId = params.get('routineId'); // "1"
    const detailId = params.get('DetailId');  // "1"
    console.log('Rounning페이지로 넘어온 값 routineId:',routineId)
    console.log('Rounning페이지로 넘어온 값 detailId:',detailId)
    const [initDetail,setDetail] = useState([]);
    const [showDetail,setshowDetail] = useState([]);
    const loadRoutineDetail=async ()=>{
            await axios.get(`${URL.ROUTINEDETAIL}/${routineId}`)
            .then(res=> setDetail(res.data.state))
            //.then(res=> console.log(res.data.state))
    }
   
    const nextEx =()=>{
        
    }
    const addExSet=()=>{

    }
    const removeExSet=()=>{

    }
    const fixKg=()=>{

    }
    const fixNum=()=>{

    }
    const changeTime=()=>{

    }
    const plus=()=>{

    }
    const minus=()=>{

    }
    const prevEx=()=>{

    }
    useEffect(()=>{
        loadRoutineDetail();
        console.log('받아온 루틴 디테일 ID:',params);
        //console.log('받아온 루틴 디테일 값들 initDetail:',initDetail);
    },[])
    useEffect(()=>{
        setshowDetail(initDetail.filter(item=>item.id===detailId));
        console.log('받아온 루틴 디테일 값들 initDetail:',initDetail);
    },[initDetail])

    return<>
        <div className={"container mt-5 p-3"}></div>
            <button className={`btn btn-lg btn-primary`} type="button" onClick={()=>navigate(-1)}>뒤로가기</button>
            <div className={`${styles.mainpage} container mt-0 p-0`}>
                {showDetail.map((item,index)=>(
                    <div key={index} className={` container d-grid gap-2`} >
                        <h1>{item.names}</h1>
                    </div>
                ))}
                {showDetail.map((item,index)=>(
                <div key={index} className={` ${styles.header} container`} >
                    <button className={` btn btn-primary`} type="button" onClick={e=>plus()}>+</button>
                   <h1 onChange={e => changeTime(e.target.value)}>{item.lest}</h1>
                   <button className={` btn btn-primary`} type="button" onClick={e=>minus()}>-</button>
                </div>
                ))}
                
                <div className={"container mt-0 p-0 d-grid gap-2"}>
                    <form className={"d-flex"}>
                        <button type="button" className="btn btn-primary disabled">1</button>
                        <input className={"form-control me-sm-2"} type="search" onChange={e => fixKg(e.target.value)}/>
                        <input className={"form-control me-sm-2"} type="search" onChange={e => fixNum(e.target.value)}/>
                        <label className="btn btn-primary disabled" >○</label>
                    </form>
                </div>
                <div className={`container ${styles.runningFlexButton}`}>
                    <button className={`${styles.buttonSize} btn btn-lg btn-primary`} style={{marginRight: "30%"}} type="button" onClick={e=>addExSet()}>+ 추가</button>
                    <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={e=>removeExSet()}>- 삭제</button>
                </div>
            <div className={`${styles.dummyContainers} p-5 mt-4`}></div>
            <footer className={`${styles.flexButton}`}>        
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={()=>navigate("/data/routineresult")}>운동 추가</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={e=>prevEx()}>이전</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={e=>nextEx()}>다음</button>
            </footer>
        </div>

    </>
}