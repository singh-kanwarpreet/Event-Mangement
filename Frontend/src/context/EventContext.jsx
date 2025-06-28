import { createContext, useState, useEffect, useMemo } from "react";
import { allEvents } from "../api/events";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

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

  const eventsMap = useMemo(() => {
    const map = new Map();
    events.forEach(event => map.set(event._id, event));
    return map;
  }, [events]); 
  return (
    <EventContext.Provider value={{ events, eventsMap }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
