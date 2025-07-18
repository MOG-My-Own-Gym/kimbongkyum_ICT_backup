import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../assets/bootstrap/css/mainpage.module.css";
import "../../assets/bootstrap/css/bootstrap.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../../config/constants";
import SetTime from "./SetTime";

export default function RunningRoutinePage(){
    const navigate = useNavigate();
    const {search } = useLocation();
    const params = new URLSearchParams(search);
    const routineId = params.get('routineId'); // "1"
    const detailId = params.get('DetailId');  // "1"
    const [initDetail,setDetail] = useState([]);
    const [showDetail,setshowDetail] = useState([]);
    const [addSetState,setAddState] = useState([]);
    const [initDetailTime,setDetailTime] = useState();
    const [nextPrevNum,setNextPrevNum] = useState(parseInt(detailId));
    const [isDisabledLeft,setIsDisabledLeft] = useState(false);
    const [isDisabledRight,setIsDisabledRight] = useState(false);
    const [checkRouData,setCheckRouData] = useState([]);

    const loadRoutineDetail=async ()=>{
        await axios.get(`${URL.ROUTINEDETAIL}/${routineId}`)
        .then(res=> {setDetail(()=>{
            setshowDetail(()=>{
                const showData = res.data.state.filter(item=>item.id===detailId)
                nextPrevButtonData(detailId-1);
                return showData;
            });
            return res.data.state
        }
        ); return res;})
        .then(res=> setCheckRouData(res.data))
    }

    const nextAndPrevExButton =(e)=>{
        e.preventDefault();
        setNextPrevNum(prev=>{
            if(e.target.id==="next"){
                const updated = prev +1;
                nextPrevButtonData(updated-1);
                setshowDetail([initDetail[updated-1]]);
                return updated;
            }
            else{
                const updated = prev -1;
                nextPrevButtonData(updated-1);
                setshowDetail([initDetail[updated-1]]);
                return updated;
            }
        })
    }
    const nextPrevButtonData=(updated)=>{
        if(updated===0)setIsDisabledLeft(true);
        if(updated===initDetail.length -1)setIsDisabledRight(true);
        if(updated!==0)setIsDisabledLeft(false);
        if(updated!==initDetail.length -1)setIsDisabledRight(false);
    }
    const addAndRemoveExSet=(e)=>{
        setAddState(prev=>{
            const addSet =[{id:String(addSetState.length+1),weight: "10", many: "1"}]
            const removeSet = addSetState.filter(item=>item.id !== String(addSetState.length))
            const arrayEx= [...prev,...addSet];
            const fixDeatilData =  initDetail.map(item=>{
                if(item.id===String(nextPrevNum)){
                    return {
                        ...item,
                        set:e.target.id==="add"?[...arrayEx]:[...removeSet]
                    }
                }
                return item;
                });
            axios.put(`${URL.ROUTINEDETAIL}/${routineId}`,{
                id:checkRouData.id,
                state:[...fixDeatilData]
            })
            .then(res=>{console.log("운동 세부 내용 수정:",res.data.state);return res.data.state})
            .then(rest=>setDetail(rest));
            return e.target.id==="add"?arrayEx:removeSet;
        }); 
    }
    const fixKgAndManyNum=(e)=>{
       const fixDeatilData =  initDetail.map(item=>{
            if(item.id===String(nextPrevNum)){
                return {
                    ...item,
                    lest:e.target.id==="minitimeout"?`${initDetailTime}`:item.lest,
                    set:e.target.id!="minitimeout"?
                    item.set.map(setItem=>
                        setItem.id===String(e.target.id)?
                        e.target.dataset.id==="weight"?
                        {...setItem,weight:e.target.value}:
                        {...setItem,many:e.target.value}:
                        setItem
                    )
                    :item.set
                }
            }
            return item;
        });
        axios.put(`${URL.ROUTINEDETAIL}/${routineId}`,{
            id:checkRouData.id,
            state:[...fixDeatilData]
        })
        .then(res=>{setDetail(res.data.state); return res.data.state})
        .then(res=>setAddState(res[nextPrevNum-1].set))
        e.target.value = '';
    }
    const fixNum=()=>{

    }
    
    const checkExResult=(e)=>{
    }
    
    useEffect(()=>{
        loadRoutineDetail();
    },[])
    useEffect(()=>{
        if(showDetail.length!==0){
            setAddState(showDetail[0].set);
            setDetailTime(showDetail[0].lest);
        }
        
    },[showDetail])
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
                            id={item.id}
                            data-id={"weight"}
                            className={"form-control me-sm-2"} 
                            type="number" 
                            onBlur={e => fixKgAndManyNum(e)}
                            placeholder={item.weight} 
                        />
                        <input 
                            id={item.id}
                            data-id={"many"}
                            className={"form-control me-sm-2"} 
                            type="number" 
                            onBlur={e => fixKgAndManyNum(e)} 
                            placeholder={item.many} 
                        />
                        <button type="button" className="btn btn-primary" id={item.id} onClick={e=>checkExResult(e.target.id)} >○</button>
                    </form>
                </div>
                ))}
                <div className={`container ${styles.runningFlexButton}`}>
                    <button className={`${styles.buttonSize} btn btn-lg btn-primary`} style={{marginRight: "30%"}} type="button" id='add' onClick={e=>addAndRemoveExSet(e)}>+ 추가</button>
                    <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" id='remove' onClick={e=>addAndRemoveExSet(e)}>- 삭제</button>
                </div>
            <div className={`${styles.dummyContainers} p-5 mt-4`}></div>
            <footer className={`${styles.flexButton}`}>        
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={()=>navigate("/data/select",{state:routineId})}>운동 추가</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} disabled={isDisabledLeft} type="button" id="prev" onClick={e=>nextAndPrevExButton(e)}>이전</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} disabled={isDisabledRight} type="button" id="next" onClick={e=>nextAndPrevExButton(e)}>다음</button>
            </footer>
        </div>

    </>
}