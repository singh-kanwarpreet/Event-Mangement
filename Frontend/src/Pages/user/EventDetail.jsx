import { useContext, useState, useEffect } from "react";
import { EventContext } from "../../context/EventProvider";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const EventDetail = () => {
  const { id } = useParams();
  const { eventsMap, eventRegister, registered, setRegistered  } = useContext(EventContext);
  const [event, setEvent] = useState(null);
  const { isLogged } = useContext(AuthContext);
  const [isAlreadyParticipant, setIsAlreadyParticipant] = useState(false);

useEffect(() => { 
  setIsAlreadyParticipant(
    Array.isArray(registered)
      ? registered.map(String).includes(String(id))
      : false
  );
}, [registered]);

useEffect(() => {
  const foundEvent = eventsMap.get(id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [eventsMap, id]);

  const handleSubmit = async () => {
    try {
      if (!!isLogged && !isAlreadyParticipant) {
        await eventRegister(id, JSON.parse(localStorage.getItem("authCredentials")).token);
        setRegistered((prev) => [...prev, id]);
        alert("Successfully Registered");
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

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
        <button
          onClick={handleSubmit}
          className={`px-6 py-2 font-semibold rounded-md transition
            ${
              isLogged && !isAlreadyParticipant
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          disabled={!isLogged || isAlreadyParticipant}
        >
          {isAlreadyParticipant ? "Already Registered" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
