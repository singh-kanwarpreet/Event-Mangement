import { useContext, useState, useEffect } from "react";
import { EventContext } from "../../context/EventProvider";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const EventDetail = () => {
  const { id } = useParams();
  const { eventsMap, eventRegister, registered, setRegistered } =
    useContext(EventContext);
  const { isLogged } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [isAlreadyParticipant, setIsAlreadyParticipant] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);

  // Check if already registered
  useEffect(() => {
    setIsAlreadyParticipant(
      Array.isArray(registered)
        ? registered.map(String).includes(String(id))
        : false
    );
  }, [registered, id]);

  // Load event details
  useEffect(() => {
    const foundEvent = eventsMap.get(id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [eventsMap, id]);

  // Check if event date & time has passed
  useEffect(() => {
    if (event?.date && event?.time) {
      const [hours, minutes] = event.time.split(":").map(Number);
      const eventDate = new Date(event.date);
      eventDate.setHours(hours, minutes, 0, 0);
      const now = new Date();
      setIsPastEvent(eventDate < now);
    }
  }, [event]);

  const handleSubmit = async () => {
    try {
      if (!!isLogged && !isAlreadyParticipant && !isPastEvent) {
        await eventRegister(
          id,
          JSON.parse(localStorage.getItem("authCredentials")).token
        );
        setRegistered((prev) => [...prev, id]);
        alert("Successfully Registered");
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleDownloadCertificate = () => {
    // Implement certificate download logic here
    alert("Certificate download functionality to be implemented.");
  }

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


      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        {/* Register / Event Button */}
        <button
          onClick={handleSubmit}
          className={`px-6 py-2 font-semibold rounded-md transition
      ${
        isLogged && !isAlreadyParticipant && !isPastEvent
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-400 text-gray-700 cursor-not-allowed"
      }`}
          disabled={!isLogged || isAlreadyParticipant || isPastEvent}
        >
          {isPastEvent
            ? "Event Over"
            : isAlreadyParticipant
            ? "Already Registered"
            : "Register"}
        </button>

        {/* Certificate Button */}
        {event.present && event.certificate ? (
          <button
            onClick={handleDownloadCertificate} // your download handler
            className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Download Certificate
          </button>
        ) : (
          <button
            disabled
            className="px-6 py-2 font-normal text-gray-500 bg-gray-200 rounded-md cursor-not-allowed"
          >
            Certificate Not Available
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
