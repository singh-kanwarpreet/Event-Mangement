import { useContext, useState, useEffect } from 'react';
import { EventContext } from '../../context/EventProvider';
import EventCard from '../../components/EventCard';


const RegisterdEvent = () => {
  const [register, setRegister] = useState([]);
  const { events, registered } = useContext(EventContext);

    useEffect(() => {
        setRegister(registered);
    }, [registered]);

    const now = new Date();

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-indigo-800 mb-6">Registered Events Which Are Upcoming</h1>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {events
                    .filter(event => {
                        const [hours, minutes] = event.time.split(':').map(Number);
                        const eventDate = new Date(event.date);
                        eventDate.setHours(hours, minutes, 0, 0);

                        const isValid = eventDate >= now;
                        const isRegistered = register.includes(event._id);

                        return isValid && isRegistered;
                    })
                    .map(event => (
                        <EventCard key={event._id} data={event} />
                    ))}
            </div>
        </div>
    );
}

export default RegisterdEvent
