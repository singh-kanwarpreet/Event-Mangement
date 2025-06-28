import React from 'react'
import Login from './Pages/auth/Login'
import SignUp from './Pages/auth/SignUp'
import CreateEvent from './Pages/admin/CreateEvent'
import EventCard from './components/EventCard'
import EventDetail from './Pages/user/EventDetail'
import Header from './components/Header'
import {Routes, Route } from "react-router-dom";
import AllEvents from './Pages/user/AllEvents'



const App = () => {
  // <SignUp />
    // <Login/>
  // <CreateEvent/>
  // <EventDetail />
  return (
    <>
    <Header/>
    <Routes>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/events" element={<AllEvents/>}></Route>

      </Routes>
  
</>

  )
}

export default App
