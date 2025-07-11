import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import { Navigate } from 'react-router-dom';
import Login from './Pages/auth/Login';
import SignUp from './Pages/auth/SignUp';
import CreateEvent from './Pages/admin/CreateEvent';
import EventDetail from './Pages/user/EventDetail';
import Header from './Pages/user/UserHeader';
import AllEvents from './components/AllEvents';
import NewEvents from './Pages/user/NewEvents';
import PastEvents from './Pages/user/PastEvents';
import RegisteredEvents from './Pages/user/RegisterdEvent';
import AdminNavbar from './Pages/admin/AdminNavbar';
import AdminEventDetail from './Pages/admin/AdminEventDetail';
import EditEvent from './Pages/admin/EditEvent';
import EventStatistics from './Pages/admin/EventStatistics';

const App = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
      {role === 'user' && <Header />}
      {role === 'admin' && <AdminNavbar />}
      {/* <EventStatistics/> */}
      <Routes>
        {/* Public routes */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* User routes */}
        {role === 'user' && (
          <>
            <Route path="/events/new" element={<NewEvents />} />
            <Route path="/events/past" element={<PastEvents />} />
            <Route path="/events/registered" element={<RegisteredEvents />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/event/:id" element={<EventDetail />} />
          </>
        )}

        {/* Admin routes */}
        {role === 'admin' && (
          <>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/" element={<AllEvents />} />
            <Route path="/event/:id" element={<AdminEventDetail />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/event/:id/statistics" element={<EventStatistics />} />
          </>
        )}
      <Route path="*" element={<Navigate to="/login" replace />} />  
      </Routes>
    </>
  );
};

export default App;
