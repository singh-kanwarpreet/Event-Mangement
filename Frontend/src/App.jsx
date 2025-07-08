import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';

import Login from './Pages/auth/Login';
import SignUp from './Pages/auth/SignUp';
import CreateEvent from './Pages/admin/CreateEvent';
import EventDetail from './Pages/user/EventDetail';
import Header from './Pages/user/UserHeader';
import AllEvents from './Pages/user/AllEvents';
import NewEvents from './Pages/user/NewEvents';
import PastEvents from './Pages/user/PastEvents';
import RegisteredEvents from './Pages/user/RegisterdEvent';
import AdminNavbar from './Pages/admin/AdminNavbar';
import AdminEventDetail from './Pages/admin/AdminEventDetail';

const App = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
      

      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes> 
          {role === 'user' && (
            <>
              <Header />
              <Routes>
                <Route path="/events/new" element={<NewEvents />} />
                <Route path="/events/past" element={<PastEvents />} />
                <Route path="/events/registered" element={<RegisteredEvents />} />
                <Route path="/events" element={<AllEvents />} />
                <Route path="/event/:id" element={<EventDetail />} />
              </Routes>
            </>
          )}

      {role === 'admin' && (
        <> 
          <AdminNavbar />
          <Routes>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/" element={<AllEvents />} />
            <Route path="/event/:id" element={<AdminEventDetail />} />
          </Routes>
        </>
      )}
        
    </>
  );
};

export default App;
// Admin routes can be added here if needed
// For example:
// {role === 'admin' && (
//   <Route path="/admin/events" element={<AdminEvents />} />
// )}