import { createContext } from "react";
import {allEvents} from '../api/events';
 
export const EventContext = createContext();

const EventProvider = ({ children }) => {
  return (
    <EventContext.Provider value={{allEvents}}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
