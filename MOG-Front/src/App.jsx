import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '@/assets/bootstrap/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import GNB from './components/GNB/GNB';
import SelectMainpage from './components/mainpage/SelectMainpage';
import CategoryPage from './components/mainpage/CategoryPage';
import RoutinePage from './components/mainpage/RoutinePage';
import RunningRoutinePage from './components/mainpage/RunningRoutinePage';
import RoutineResultPage from './components/mainpage/RoutineResultPage';
import ToastContext from './context/ToastContext';
import ToastProvider from './context/ToastProvider';
import Toast from './components/Toast/Toast';
import Stats from './pages/Stats/Stats';
import RecordPage from './pages/Record/RecordPage';
import LoginPage from './pages/Login/LoginPage';
import Social from './pages/Social/Social';
import MyPage from './pages/Mypage/MyPage';

const initRoutineData={routine1:{
    "name": "routineisgood",
    "page": "",
    "user": "kim",
    "state": [
        {
            "id": 1,
            "names": "3/4 Sit-Up",
            "category": "strength",
            "equipment": "body only",
            "force": "pull",
            "level": "beginner",
            "mechanic": "compound",
            "instructions": [
                "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
                "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
                "Flex your hips and spine to raise your torso toward your knees.",
                "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
                "Repeat for the recommended amount of repetitions."
            ],
            "primaryMuscles": "abdominals",
            "imgfile": "https://raw.githubusercontent.com/kimbongkum/ict4e/master/exercises/3_4_Sit-Up/images/0.jpg"
        },
        {
            "id": 1,
            "names": "3/4 Sit-Up",
            "category": "strength",
            "equipment": "body only",
            "force": "pull",
            "level": "beginner",
            "mechanic": "compound",
            "instructions": [
                "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
                "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
                "Flex your hips and spine to raise your torso toward your knees.",
                "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
                "Repeat for the recommended amount of repetitions."
            ],
            "primaryMuscles": "abdominals",
            "imgfile": "https://raw.githubusercontent.com/kimbongkum/ict4e/master/exercises/3_4_Sit-Up/images/0.jpg"
        },
        {
            "id": 1,
            "names": "3/4 Sit-Up",
            "category": "strength",
            "equipment": "body only",
            "force": "pull",
            "level": "beginner",
            "mechanic": "compound",
            "instructions": [
                "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
                "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
                "Flex your hips and spine to raise your torso toward your knees.",
                "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
                "Repeat for the recommended amount of repetitions."
            ],
            "primaryMuscles": "abdominals",
            "imgfile": "https://raw.githubusercontent.com/kimbongkum/ict4e/master/exercises/3_4_Sit-Up/images/0.jpg"
        },
        {
            "id": 1,
            "names": "3/4 Sit-Up",
            "category": "strength",
            "equipment": "body only",
            "force": "pull",
            "level": "beginner",
            "mechanic": "compound",
            "instructions": [
                "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
                "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
                "Flex your hips and spine to raise your torso toward your knees.",
                "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
                "Repeat for the recommended amount of repetitions."
            ],
            "primaryMuscles": "abdominals",
            "imgfile": "https://raw.githubusercontent.com/kimbongkum/ict4e/master/exercises/3_4_Sit-Up/images/0.jpg"
        }
      ]
}}

function App() {
  const { toast, dispatch } = useContext(ToastContext);
  const [useRoutineData,setRoutineData] = useState(initRoutineData);
  useEffect(() => {
    if (toast.isToast) {
      setTimeout(() => {
        dispatch('HIDE_TOAST');
      }, 2000);
    }
    console.log('useRoutineData:',useRoutineData);
  }, [toast]);
  return (
    <div style={{ padding: '5em 0 0 0' }}>
      <GNB />
      <Routes context={useRoutineData}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<SelectMainpage />}></Route>
        <Route path="/select" element={<CategoryPage useRoutineData={useRoutineData.routine1} setRoutineData = {setRoutineData} />}></Route>
        <Route path="/routine" element={<RoutinePage />}></Route>
        <Route path="/runningroutine" element={<RunningRoutinePage />}></Route>
        <Route path="/routineresult" element={<RoutineResultPage />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stats" element={<Stats />}></Route>
        <Route path="/record" element={<RecordPage />} />
        <Route path="/social" element={<Social />} />
        <Route path="/mypage/*" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
