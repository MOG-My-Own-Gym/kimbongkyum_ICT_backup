import { Route, Routes } from "react-router-dom";
import SelectMainpage from "./SelectMainpage";
import CategoryPage from "./CategoryPage";
import RoutinePage from "./RoutinePage";
import RunningRoutinePage from "./RunningRoutinePage";
import RoutineResultPage from "./RoutineResultPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config/constants";
import SetTime from "./SetTime";

const DataToss=()=>{
    const [useDataRoutine,setDataRoutine] = useState();
    const [useDetailExData,setDetailExData] = useState();
    const [showSecret, setShowSecret] = useState(false);
    const [initDetailTime,setDetailTime] = useState();
    const [routineId,setRoutineId] = useState();
    const [currentDetailId,setCurrentDetailId] = useState();

    const fetchData = async () => {
        await axios.get(URL.ROUNTINE)
            .then(res=>setDataRoutine(res.data))
    };
    const detailData = async ()=>{
        await axios.get(URL.ROUTINEDETAIL)
            .then(res=>setDetailExData(res.data))
    }

    return <>
        {showSecret&&<SetTime initDetailTime={initDetailTime} routineId={routineId} currentDetailId={currentDetailId}></SetTime>}
        <Routes>
            <Route path="" element={<SelectMainpage useDataRoutine={useDataRoutine} fetchData={fetchData}/>}></Route>
            <Route path="/select" element={<CategoryPage useDataRoutine={useDataRoutine} fetchData={fetchData} detailData={detailData} useDetailExData={useDetailExData}/>}></Route>
            <Route path="/routine" element={<RoutinePage useDataRoutine={useDataRoutine} fetchData={fetchData} detailData={detailData} useDetailExData={useDetailExData}/>}></Route>
            <Route path="/runningroutine" element={<RunningRoutinePage setShowSecret={setShowSecret} setDetailTime={setDetailTime} setRoutineId={setRoutineId} setCurrentDetailId={setCurrentDetailId}/>}></Route>
            <Route path="/routineresult" element={<RoutineResultPage />}></Route>
        </Routes>
    </>

};
export default DataToss;