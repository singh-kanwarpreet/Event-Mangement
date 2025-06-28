import { useContext, useState, useEffect } from 'react';
import EventCard from '../../components/EventCard';
import { EventContext } from '../../context/EventContext';
const AllEvents = () => {
  const { allEvents } = useContext(EventContext);
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
  }, [allEvents]);

  if (events.length === 0) {
    return <p className="text-center mt-10 text-gray-600">No Data Found</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-indigo-800 mb-6">Upcoming Events</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event, index) =>(<EventCard key={index} data={event} />))}
      </div>
    </div>
  );
}

export default AllEvents
