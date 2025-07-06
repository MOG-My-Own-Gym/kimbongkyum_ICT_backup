import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../assets/bootstrap/css/mainpage.module.css";
import "../../assets/bootstrap/css/bootstrap.css";
import { useEffect, useRef, useState } from "react";

export default function RoutinePage(){
    const navigate = useNavigate();
    const [initMakeRoutine, setMakeRoutine] = useState([]);
    const location = useLocation();
    const makeRoutineBoxRef = useRef();
    useEffect(()=>{
        setMakeRoutine([...location.state]);
    },[])
    console.log('sdfsdfsdf',location);
    return<>
        <div className={"container mt-5 p-3"}></div>
        <button className={`btn btn-lg btn-primary`} type="button" onClick={()=>navigate('/home')}>뒤로가기</button>
        <div className={`${styles.mainpage} container mt-0 p-0`}>
                <div ref={makeRoutineBoxRef} className={"container mt-0 p-0"}>
                    {
                    initMakeRoutine.map((item,index)=>
                    <button key={index} className="btn btn-lg btn-dark"  id={item.names}
                            style={{width:'100%', fontSize:'25px', textAlign:'left',display:'flex'}}  
                            type="button" onClick={e=>saveRoutineButton(e)}>
                            <img alt={item.imgfile} style={{width:'100px'}} src={item.imgfile}/>
                            {item.names}
                            <span id={item.names+'Span'} style={{marginLeft:'auto'}}><a href="#">...</a></span>
                       </button>
                    )
                    }             
                </div>
            <div className={`${styles.dummyContainers} p-5 mt-4`}></div>
            <footer className={`${styles.flexButton}`}>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={(e)=>{navigate("/runningroutine");e.target.value=='운동 완료'?e.target.value='운동 시작':e.target.value='운동 완료';}}>운동 시작</button>
                <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={()=>navigate("/select")}>운동 추가</button>
            </footer>
        </div>

    </>
}