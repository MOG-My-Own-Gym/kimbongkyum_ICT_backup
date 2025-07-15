import { Route, Routes } from "react-router-dom";
import SelectMainpage from "./SelectMainpage";
import CategoryPage from "./CategoryPage";
import RoutinePage from "./RoutinePage";
import RunningRoutinePage from "./RunningRoutinePage";
import RoutineResultPage from "./RoutineResultPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config/constants";

const DataToss=()=>{
    const [useDataRoutine,setDataRoutine] = useState();
    const [useDetailExData,setDetailExData] = useState();

    const fetchData = async () => {
        const response = await axios.get(URL.ROUNTINE);
        setDataRoutine(response.data); // 가져온 데이터 저장
    };
    const detailData = async ()=>{
        const detailDataR = await axios.get(URL.ROUTINEDETAIL);
        setDetailExData(detailDataR.data);
    }

    useEffect(()=>{
        //fetchData();
        console.log('처음 useDataRoutine:',useDataRoutine);
    },[])
    return <>
        <Routes>
            <Route path="" element={<SelectMainpage useDataRoutine={useDataRoutine} fetchData={fetchData}/>}></Route>
            <Route path="/select" element={<CategoryPage useDataRoutine={useDataRoutine} fetchData={fetchData} detailData={detailData} useDetailExData={useDetailExData}/>}></Route>
            <Route path="/routine" element={<RoutinePage useDataRoutine={useDataRoutine} fetchData={fetchData} detailData={detailData} useDetailExData={useDetailExData}/>}></Route>
            <Route path="/runningroutine" element={<RunningRoutinePage />}></Route>
            <Route path="/routineresult" element={<RoutineResultPage />}></Route>
        </Routes>
    </>

};
export default DataToss;