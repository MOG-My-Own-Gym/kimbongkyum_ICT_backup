import { useNavigate } from "react-router-dom";
import styles from "../../assets/bootstrap/css/mainpage.module.css";
import "../../assets/bootstrap/css/bootstrap.css";
import { useEffect } from "react";

export default function SelectMainpage({useDataRoutine}){
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log('useDataRoutine:',useDataRoutine);    
    },[])
    
    return<>
    <div className={"container mt-5 p-3"}></div>
    <div className={`${styles.mainpage} container mt-0 p-0`}>
        <div className={"container mt-0 p-0"}>
            {
            useDataRoutine!==undefined
            ?
            useDataRoutine.map((item,index)=>(
             <button key={index} className={`${styles.containers} btn btn-lg btn-primary`} type="button" onClick={()=>navigate("/data/routine",{state:useDataRoutine[index].id})}>
               {item.name}
            </button>
            ))
            :
            <h1>추가 필요</h1>    
            }
            
        </div>
        <div className={`${styles.dummyContainers} p-5 mt-4`}></div>
        <footer className={`${styles.flexButton}`}>
            <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button" onClick={e=>navigate("/data/select",{state:false})} >루틴 생성</button>
            <button className={`${styles.buttonSize} btn btn-lg btn-primary`} type="button">루틴 삭제</button>
        </footer>
    </div>
    </>
}