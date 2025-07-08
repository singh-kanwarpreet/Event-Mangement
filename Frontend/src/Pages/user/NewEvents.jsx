import { useContext, useState, useEffect } from 'react';
import { EventContext } from '../../context/EventProvider';
import EventCard from '../../components/EventCard';

const NewEvents = () => {
    const [register, setRegister] = useState([]);
    const { events, registered } = useContext(EventContext);

    useEffect(() => {
        setRegister(registered);
    }, [registered]);

    const now = new Date();

    const filteredEvents = events
        .filter(event => {
            const [hours, minutes] = event.time.split(':').map(Number);
            const eventDate = new Date(event.date);
            eventDate.setHours(hours, minutes, 0, 0);

            const isUpcoming = eventDate > now;
            const isRegistered = register.includes(event._id);

            return isUpcoming && !isRegistered;
        });

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-indigo-800 mb-6">Register To Attend Events</h1>

            {filteredEvents.length === 0 ? (
                <div className="text-gray-500 text-lg mt-10">No new events</div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredEvents.map(event => (
                        <EventCard key={event._id} data={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewEvents;
