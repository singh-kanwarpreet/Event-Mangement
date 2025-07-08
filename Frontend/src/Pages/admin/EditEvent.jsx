import { useState } from 'react';
import { edit } from '../../api/admin';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from '../../context/EventProvider';
import { useContext } from 'react';

const EditEvent = () => {
  const {id} = useParams();
  const { eventsMap } = useContext(EventContext);
  const Navigate = useNavigate();

  const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const dateObj = new Date(dateString);
  if (isNaN(dateObj)) return '';
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  const [eventDetails, setEventDetails] = useState({
    name: eventsMap.get(id)?.name || '',
    description: eventsMap.get(id)?.description || '',
    image: eventsMap.get(id)?.image || '',
    date: formatDateForInput(eventsMap.get(id)?.date),
    time: eventsMap.get(id)?.time || '',
    certificate: eventsMap.get(id)?.certificate || ''
  });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prev) => ({ ...prev, [name]: value.trimStart() }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = JSON.parse(localStorage.getItem("authCredentials")).token;
          await edit({ ...eventDetails, token,id });
          alert("Event updated successfully");
          eventsMap.set(id, eventDetails);
          Navigate(`/event/${id}`);
        } catch (err) {
          alert(err.message);
        }
      };
  return (
    <div className="w-full flex justify-center py-2 items-center bg-gradient-to-br from-indigo-500 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-230 space-y-6 "
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
  )
}

export default EditEvent
