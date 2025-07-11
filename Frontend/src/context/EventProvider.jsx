import { createContext, useState, useEffect, useContext } from "react";
import { allEvents, eventRegister } from "../api/events";
import { registeredEvents } from "../api/user";
import { AuthContext } from "./AuthProvider";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const { isLogged, role } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [eventsMap, setEventsMap] = useState(new Map());
  const [registered, setRegistered] = useState([]);

  // Fetch events on mount or when user logs in/out
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("authCredentials"));
        if (!tokenData) return;

        const token = tokenData.token;
        const data = await allEvents(token);

        setEvents(data);

        // Build map
        const map = new Map();
        data.forEach(event => map.set(event._id, event));
        setEventsMap(map);

      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchEvents();
  }, [isLogged]); // refetch on login/logout

  // Fetch registered events for logged-in users
  useEffect(() => {
    if (!isLogged || role !== "user") return;

    const fetchRegisteredEvents = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("authCredentials"));
        if (!tokenData) return;

        const token = tokenData.token;
        const data = await registeredEvents(token);

        setRegistered(data.registeredEvents || []);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchRegisteredEvents();
  }, [isLogged, role]);

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        eventsMap,
        setEventsMap,
        eventRegister,
        registered,
        setRegistered,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
