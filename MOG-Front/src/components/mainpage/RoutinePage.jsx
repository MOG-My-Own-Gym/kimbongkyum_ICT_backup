import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../assets/bootstrap/css/mainpage.module.css";
import "../../assets/bootstrap/css/bootstrap.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../../config/constants";

export default function RoutinePage({useDataRoutine,fetchData,detailData,useDetailExData}){
    const navigate = useNavigate();
    const [initMakeRoutine, setMakeRoutine] = useState([]);
    const makeRoutineBoxRef = useRef();
    const {search } = useLocation();
    const params = search.slice(-1);
    const [initDetailDEx,setDetailEx] = useState();

    const routineDetailButton=(e)=>{
        e.stopPropagation();
        const checkId = e.target.children[1]===undefined?e.target.id:e.target.children[1].id;
        console.log('루틴 디테일 태그 id:',checkId);
        console.log('initMakeRoutine:',initMakeRoutine);
        navigate(`/data/runningroutine?routineId=${params}&DetailId=${checkId}`,{state:initMakeRoutine});
    }
    const loadRoutineDetail=async ()=>{
            await axios.get(URL.ROUNTINE)
            .then(res=> setMakeRoutine(res.data[params-1].state))
            await axios.get(URL.ROUTINEDETAIL)
            .then(res=> setDetailEx(res.data[params-1].state))
    }
    const deleteRoutine=async (e)=>{
         e.stopPropagation();
        //const lastS = e.target.id.charAt(e.target.id.length - 1);
        //console.log('lastS:',lastS);
        //await axios.put(`${URL.ROUNTINE}/${location.state}/`,{})
        //            .then()
        //await axios.delete(`${URL.ROUNTINE}/${lastS}`)
        console.log('루틴 페이지 location.state2:',params);
        console.log('운동 삭제 버튼 이벤트 ID:',e.target.id);
        const deleteSaveData = initMakeRoutine.filter(item=>(item.set_id!==e.target.id));
        const deleteDetailData = initDetailDEx.filter(item=>(item.id!==e.target.id))
        console.log('삭제될 디테일 데이터 deleteDetailData:',deleteDetailData)
        console.log('initMakeRoutine.set_id:',deleteSaveData);
        await axios.put(`${URL.ROUNTINE}/${params}/`,{id:String(useDataRoutine[params-1].id),name:useDataRoutine[params-1].name,state:[...deleteSaveData]})
                    .then(res=>console.log('운동 삭제 결과 값:%o',res));
        await axios.put(`${URL.ROUTINEDETAIL}/${params}`,{id:String(useDataRoutine[params-1].id),state:[...deleteDetailData]})
        setMakeRoutine(deleteSaveData);
        setDetailEx(deleteDetailData);
        
    }

    useEffect(()=>{
        loadRoutineDetail();
        fetchData();
        detailData();
        //makeDateilPage();
        //.then(res=> console.log(res.data[location.state-1].state))
        console.log('루틴 디테일 initMakeRoutine:',initMakeRoutine)
        console.log('루틴 페이지 useDataRoutine:',useDataRoutine);
        console.log('루틴 페이지 location.state1:',params);
    },[])
    return<>
        <div className={"container mt-5 p-3"}></div>
        <button className={`btn btn-lg btn-primary`} type="button" onClick={()=>navigate('/data/')}>뒤로가기</button>
        <div className={`${styles.mainpage} container mt-0 p-0`}>
                <div ref={makeRoutineBoxRef} className={"container mt-0 p-0"}>
                    {
                    initMakeRoutine.map((item,index)=>
                    <button key={index} className="btn btn-lg btn-dark"  id={item.names}
                            style={{width:'100%', fontSize:'25px', textAlign:'left',display:'flex'}}  
                            type="button" onClick={e=>routineDetailButton(e)}>
                            <img alt={item.imgfile} style={{width:'100px'}} src={item.imgfile}/>
                            {item.names}
                            <a style={{marginLeft:'auto'}} href="#" id={item.set_id} onClick={e=>deleteRoutine(e)}>...</a>
                       </button>
                    )
                    }             
                </div>
            <div className={`${styles.dummyContainers} p-5 mt-4`}></div>
            <footer className={`${styles.flexButton}`}>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" id="1" onClick={e=>routineDetailButton(e)}>운동 시작</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={()=>navigate("/data/select",{state:params})}>운동 추가</button>
            </footer>
        </div>

    </>
}