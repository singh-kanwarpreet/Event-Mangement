import { useContext, useState, useEffect } from "react";
import { EventContext } from "../../context/EventProvider";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const AdminEventDetail = () => {
  const { id } = useParams();
  const { eventsMap } = useContext(EventContext);
  const { isLogged } = useContext(AuthContext);

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

      {/* Degrees */}
      {Array.isArray(event.degrees) && event.degrees.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <p className="text-gray-600 text-sm mb-1">Eligible Degrees</p>
          <p className="text-gray-800 font-semibold">
            {event.degrees.join(", ")}
          </p>
        </div>
      )}

      {/* Years */}
      {Array.isArray(event.years) && event.years.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <p className="text-gray-600 text-sm mb-1">Eligible Years</p>
          <p className="text-gray-800 font-semibold">
            {event.years.join(", ")}
          </p>
        </div>
      )}

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

      {/* Edit Button */}
      <div className="text-left">
        <Link to={`/edit-event/${id}`}>
          <button
            disabled={!isLogged}
            className={`${
              !isLogged
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            } font-semibold px-4 py-2 rounded transition`}
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminEventDetail;
