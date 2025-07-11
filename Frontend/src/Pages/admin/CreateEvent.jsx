import { useState } from "react";
import { upload } from "../../api/admin";
import { EventContext } from "../../context/EventProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    description: "",
    image: "",
    date: "",
    time: "",
    certificate: "",
    degrees: [],
    years: [],
  });

  const { eventsMap, setEvents,setEventsMap } = useContext(EventContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setEventDetails((prev) => {
      let updated = checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value);
      updated = updated.sort();
      return { ...prev, [category]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!eventDetails.name || !eventDetails.description || !eventDetails.date || !eventDetails.time || !eventDetails.degrees.length || !eventDetails.years.length) {
        return alert("Please fill all required fields");
      }
      
      const token = JSON.parse(localStorage.getItem("authCredentials")).token;
      const response = await upload({ ...eventDetails, token });
      console.log("Submitted:", response);
      alert("Event created successfully");
      setEventsMap((prev) => new Map(prev).set(response._id, response));
      setEvents((prev) => [...prev, response]);
      navigate(`/event/${response._id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const degreesList = [
    "CSE",
    "IT",
    "Mechanical",
    "Civil",
    "Electrical",
    "Electronics",
  ];
  const yearsList = ["1st", "2nd", "3rd", "4th"];

  return (
    <div className="h-screen w-full flex justify-center py-2 items-center bg-gradient-to-br from-indigo-500 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-230 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Create New Event
        </h2>

        {/* Event Name */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            value={eventDetails.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter event name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter description..."
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Image URL (optional)
          </label>
          <input
            type="url"
            name="image"
            value={eventDetails.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Degrees Checkboxes */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Eligible Degrees
          </label>
          <div className="flex flex-wrap gap-2">
            {degreesList.map((degree) => {
              const selected = eventDetails.degrees.includes(degree);
              return (
                <label
                  key={degree}
                  className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium border 
            ${
              selected
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-800 border-gray-300"
            }
            hover:bg-indigo-50 transition`}
                >
                  <input
                    type="checkbox"
                    value={degree}
                    checked={selected}
                    onChange={(e) => handleCheckboxChange(e, "degrees")}
                    className="hidden"
                  />
                  {degree}
                </label>
              );
            })}
          </div>
        </div>

        {/* Years Checkboxes */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Eligible Years
          </label>
          <div className="flex flex-wrap gap-2">
            {yearsList.map((year) => {
              const selected = eventDetails.years.includes(year);
              return (
                <label
                  key={year}
                  className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium border 
            ${
              selected
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-800 border-gray-300"
            }
            hover:bg-indigo-50 transition`}
                >
                  <input
                    type="checkbox"
                    value={year}
                    checked={selected}
                    onChange={(e) => handleCheckboxChange(e, "years")}
                    className="hidden"
                  />
                  {year} Year
                </label>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-left block">
          <button
            type="submit"
            className="w-50 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
