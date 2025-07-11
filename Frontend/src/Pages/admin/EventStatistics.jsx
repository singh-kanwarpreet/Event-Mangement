import { useState, useEffect } from "react";
import { EventParticipants } from "../../api/admin"; // your API function to fetch participants
import { useParams } from "react-router-dom";

const EventStatistics = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);

  const yearLabels = ["1st", "2nd", "3rd", "4th"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventParticipants(id);
        setData(response || {});
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, [id]);

  const handleSelect = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-700 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto space-y-6 overflow-y-auto max-h-[90vh]">
        <h1 className="text-center text-2xl font-bold text-indigo-800">
          Event Participants
        </h1>

        {/* Year selection buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {yearLabels.map((label) => (
            <button
              key={label}
              onClick={() => handleSelect(label)}
              className={`px-4 py-2 rounded-full font-semibold transition 
              ${
                selectedYear === label
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-indigo-100"
              }`}
            >
              {label} Year
            </button>
          ))}
        </div>

        {/* Participant list */}
        {selectedYear && (
          <div className="bg-gray-50 p-4 rounded-md border space-y-4">
            <h2 className="text-xl font-bold text-indigo-800 text-center">
              Participants for {selectedYear} Year
            </h2>
            <p className="text-center text-gray-700">
              Total Students: {data[selectedYear]?.length || 0}
            </p>

            {data[selectedYear]?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data[selectedYear].map((participant, index) => (
                  <div
                    key={participant._id || index}
                    className="p-4 bg-white rounded shadow border border-gray-200"
                  >
                    <p className="text-gray-800 font-semibold">{participant.name}</p>
                    <p className="text-gray-700 text-sm">{participant.email}</p>
                    <p className="text-gray-700 text-sm">URN: {participant.urn}</p>
                    <p className="text-gray-700 text-sm">CRN: {participant.crn}</p>
                    <p className="text-gray-700 text-sm">Branch: {participant.branch}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No participants for this year.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventStatistics;
