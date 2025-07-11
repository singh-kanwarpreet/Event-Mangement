import { useState } from 'react';
import { edit } from '../../api/admin';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from '../../context/EventProvider';
import { useContext } from 'react';

const EditEvent = () => {
  const { id } = useParams();
  const { eventsMap } = useContext(EventContext);
  const navigate = useNavigate();

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return '';
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const event = eventsMap.get(id) || {};

  const [eventDetails, setEventDetails] = useState({
    name: event.name || '',
    description: event.description || '',
    image: event.image || '',
    date: formatDateForInput(event.date),
    time: event.time || '',
    certificate: event.certificate || '',
    degrees: event.degrees || [],
    years: event.years || []
  });

  const degreesList = ['CSE', 'IT', 'Mechanical', 'Civil', 'Electrical', 'Electronics'];
  const yearsList = ['1st', '2nd', '3rd', '4th'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setEventDetails((prev) => {
      const updated = checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value);
      return { ...prev, [category]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("authCredentials")).token;
      await edit({ ...eventDetails, token, id });
      alert("Event updated successfully");
      eventsMap.set(id, eventDetails);
      navigate(`/event/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center py-4 items-center bg-gradient-to-br from-indigo-500 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Edit Event</h2>

        {/* Event Name */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Event Name</label>
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
          <label className="block text-gray-800 font-medium mb-1">Description</label>
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
          <label className="block text-gray-800 font-medium mb-1">Image URL (optional)</label>
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

        {/* Certificate Link */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Certificate Link</label>
          <input
            type="text"
            name="certificate"
            value={eventDetails.certificate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter certificate link"
          />
        </div>

        {/* Degrees Checkboxes */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">Eligible Degrees</label>
          <div className="flex flex-wrap gap-2">
            {degreesList.map((degree) => {
              const selected = eventDetails.degrees.includes(degree);
              return (
                <label
                  key={degree}
                  className={`cursor-pointer select-none rounded-full px-3 py-1 text-sm font-medium border
                    ${selected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-800 border-gray-300'}
                    hover:bg-indigo-50 transition`}
                >
                  <input
                    type="checkbox"
                    value={degree}
                    checked={selected}
                    onChange={(e) => handleCheckboxChange(e, 'degrees')}
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
          <label className="block text-gray-800 font-medium mb-2">Eligible Years</label>
          <div className="flex flex-wrap gap-2">
            {yearsList.map((year) => {
              const selected = eventDetails.years.includes(year);
              return (
                <label
                  key={year}
                  className={`cursor-pointer select-none rounded-full px-3 py-1 text-sm font-medium border
                    ${selected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-800 border-gray-300'}
                    hover:bg-indigo-50 transition`}
                >
                  <input
                    type="checkbox"
                    value={year}
                    checked={selected}
                    onChange={(e) => handleCheckboxChange(e, 'years')}
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
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
