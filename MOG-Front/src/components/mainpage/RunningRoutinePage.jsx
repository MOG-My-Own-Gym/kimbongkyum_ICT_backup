import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../assets/bootstrap/css/mainpage.module.css";
import "../../assets/bootstrap/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config/constants";
import SetTime from "./SetTime";

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
    const [addSetState,setAddState] = useState([]);
    const [initDetailTime,setDetailTime] = useState();
    const [nextPrevNum,setNextPrevNum] = useState(1);
    const loadRoutineDetail=async ()=>{
            await axios.get(`${URL.ROUTINEDETAIL}/${routineId}`)
            .then(res=> setDetail(res.data.state))
            //.then(res=> console.log(res.data.state))
    }
   
    const nextAndPrevExButton =(e)=>{
        const nextExData = initDetail.filter(item=>item.id===String(parseInt(detailId)+nextPrevNum))
        console.log('다음 또는 이전 버튼 누르면 나오는 값:',nextExData.length);
        if(nextExData.length===0)  return alert('값 없음');
        if(e==="next"){
            setshowDetail(nextExData);
            setNextPrevNum(prev=> prev+1)
            console.log('다음 운동 아이디:',nextPrevNum)
        }
        else{
            setshowDetail(initDetail.filter(item=>item.id===String(parseInt(detailId)-nextPrevNum)));
            setNextPrevNum(prev=> prev-1)
            console.log('전 운동 아이디:',nextPrevNum)
        }
    }
    const prevEx=()=>{
        setshowDetail(initDetail.filter(item=>item.id===String(parseInt(detailId)-nextPrevNum)));
        setNextPrevNum(prev=> prev-1)
        console.log('전 운동 아이디:',nextPrevNum)
    }
    const addExSet=()=>{
        const addSet =[{id:String(addSetState.length+1),weight: "0", many: "0"}]
        setAddState(prev=>[...prev,...addSet]); 
    }
    const removeExSet=()=>{
        const addSet = addSetState.filter(item=>item.id !== String(addSetState.length))
        setAddState(addSet); 
    }
    const fixKg=(e)=>{
       
    }
    const fixNum=()=>{

    }
    
    const checkExResult=(e)=>{
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
    useEffect(()=>{
        if(showDetail.length!==0){
            setAddState(showDetail[0].set);
            setDetailTime(showDetail[0].lest);
            //console.log('화면에 뿌려줄 세트 디테일:',showDetail[0].set[0].many)
        }
    },[showDetail])
    console.log('화면에 뿌려줄 세트 수 :',addSetState);
    return<>
        <div className={"container mt-5 p-3"}></div>
            <button className={`btn btn-lg btn-primary`} type="button" onClick={()=>navigate(-1)}>뒤로가기</button>
            <div className={`${styles.mainpage} container mt-0 p-0`}>
                {showDetail.map((item,index)=>(
                    <div key={index} className={` container d-grid gap-2`} >
                        <h1>{item.names}</h1>
                        <img style={{width:'200px'}} src={item.img}/>
                    </div>
                ))}
                {
                showDetail.length!==0
                ?
                <SetTime timeInit={showDetail[0].lest} setDetailTime={setDetailTime} initDetailTime={initDetailTime}></SetTime>
                :
                <h2>로딩 중</h2>
                }
                {addSetState.map((item,index)=>(
                <div key={index} className={"container mt-0 p-0 d-grid gap-2"}>
                    <form className={"d-flex"}>
                        <label className="btn btn-primary disabled">{item.id}</label>
                        <input 
                            className={"form-control me-sm-2"} 
                            type="number" 
                            onChange={e => fixKg(e.target.value)} 
                            placeholder={item.weight} 
                        />
                        <input 
                            className={"form-control me-sm-2"} 
                            type="number" 
                            onChange={e => fixNum(e.target.value)} 
                            placeholder={item.many} />
                        <button type="button" className="btn btn-primary" id={item.id} onClick={e=>checkExResult(e.target.id)} >○</button>
                    </form>
                </div>
                ))}
                <div className={`container ${styles.runningFlexButton}`}>
                    <button className={`${styles.buttonSize} btn btn-lg btn-primary`} style={{marginRight: "30%"}} type="button" onClick={e=>addExSet()}>+ 추가</button>
                    <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={e=>removeExSet()}>- 삭제</button>
                </div>
            <div className={`${styles.dummyContainers} p-5 mt-4`}></div>
            <footer className={`${styles.flexButton}`}>        
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={()=>navigate("/data/routineresult")}>운동 추가</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" id="prev" onClick={e=>nextAndPrevExButton(e.target.id)}>이전</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" id="next" onClick={e=>nextAndPrevExButton(e.target.id)}>다음</button>
            </footer>
        </div>

    </>
}