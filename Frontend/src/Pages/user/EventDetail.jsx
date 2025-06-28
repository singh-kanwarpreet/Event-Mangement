import { useContext, useState, useEffect } from "react";
import { EventContext } from "../../context/EventContext";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const { eventsMap } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = eventsMap.get(id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [eventsMap, id]);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600">Loading event or event not found...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
      {/* Image */}
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Name */}
      <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>

      {/* Description */}
      <p className="text-gray-700">{event.description}</p>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-md border">
          <p className="text-gray-600 text-sm">Date</p>
          <p className="text-gray-800 font-semibold">
            {new Date(event.date).toDateString()}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border">
          <p className="text-gray-600 text-sm">Time</p>
          <p className="text-gray-800 font-semibold">{event.time}</p>
        </div>
      </div>

      {/* Certificate */}
      {event.certificate && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <p className="text-gray-600 text-sm mb-1">Certificate</p>
          <a
            href={event.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            View Certificate
          </a>
        </div>
      )}

      {/* Button */}
      <div className="text-left">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          Register
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
