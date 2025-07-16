import './App.css'
import { useEffect } from 'react'
import Background from './Components/Background'
import Foreground from './Components/Foreground'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import AdminRoutes from './Routes/AdminRoute';
import NotFound from './Pages/NotFound'


function App() {
  // const navigate = useNavigate();
  // const { isLoggedIn } = useSelector(state => state.userAuth);

  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     navigate('/');
  //   } else {
  //     navigate('/task');
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <>
      <div className='relative w-full h-screen bg-zinc-800'>
        <Background />

        <Routes>
          <Route path="/" element={<PublicRoute> <Login /> </PublicRoute>} />
          {/* <Route path="/signin" element={<PublicRoute> <Login /> </PublicRoute>}/> */}
          <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>} />
          <Route path="/task" element={<PrivateRoute> <Foreground /> </PrivateRoute>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
