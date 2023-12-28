import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Event from './components/Event'
import EventList from './components/EventList'
import EventFilter from './components/EventFilter'
import ProtectedRoute from './components/ProtectedRoute'
import toast from 'react-hot-toast'

const App = () => {

  let navigate = useNavigate();
  
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
    toast.success("Logout Successfully");
  }


  return (
      <div className='w-full mx-auto'>

        {/* Navbar code */}
        <div className='shadow-lg'>
          <nav className='max-w-[1200px] mx-auto flex items-center justify-between py-3 px-3'>
            <img src="./logo.png" alt="" className='w-[80px] sm:w-[130px]' />
            <ul className='flex items-center gap-5'>
              <li>
                <Link to='/' className='font-bold text-zinc-700 border border-gray-800 rounded p-2'>Home</Link>
              </li>
              <li>
                <Link to ='/create-events' className='font-bold  text-zinc-700 border border-gray-800 rounded p-2'>Add</Link>
              </li>
              <li>
                {
                  !localStorage.getItem('token') ?  <Link to= '/login' role='buttton' className='font-bold text-white bg-black py-1 px-3 rounded-md'>Login</Link> : 
                  <button onClick={handleLogout} className='font-bold text-white bg-black py-1 px-3 rounded-md'>Logout</button>
                }
              </li>
            </ul>
          </nav>
        </div>

        {/* Route is defined */}
        <div className='max-w-[1200px] w-full mx-auto'>

        <Routes>
            <Route exact path='/signup' element={<Signup/>} />
            <Route exact path='/login' element={<Login/>} />
            
            <Route element={<ProtectedRoute/>}>
              <Route exact path='/' element={<EventList/>}/>
              <Route exact path='/create-events' element={<Event/>}/>
              <Route exact path='/filter-data' element={<EventFilter/>}/>
            </Route>

        </Routes>
        </div>
      </div>
  )
}

export default App
