import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { allEvents, eventRegister } from "../api/events";
import { registeredEvents } from "../api/user";
import { AuthContext } from "./AuthProvider";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const { isLogged, role } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await allEvents();
        setEvents(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchEvents();
  }, []);


  useEffect(() => {
    if (!isLogged || role != "user") return;
    const fetchRegisteredEvents = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("authCredentials")).token;
        const data = await registeredEvents(token);
        setRegistered(data.registeredEvents || []);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchRegisteredEvents();
  }, [isLogged]);

  const eventsMap = useMemo(() => {
    const map = new Map();
    events.forEach(event => map.set(event._id, event));
    return map;
  }, [events]);

  return (
    <EventContext.Provider value={{ events, eventsMap, eventRegister, registered, setRegistered,setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;