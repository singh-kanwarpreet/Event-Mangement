import { useState, useEffect } from "react";
import { EventParticipants } from "../../api/admin";
import { useParams } from "react-router-dom";
import { updateAttendance } from "../../api/admin";

const EventStatistics = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventParticipants(id);
        // Map response to include attendance field        
        const withAttendance = response.map((p) => ({
          ...p,
          attendance: p.present ?? false, 
        }));

        setParticipants(withAttendance);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, [id]);

  const handleCheckboxChange = (userId) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p._id === userId ? { ...p, attendance: !p.attendance } : p
      )
    );
  };

  const handleSubmit = () => {
    const attendanceUpdate = {};
    participants.forEach((p) => {
      attendanceUpdate[p._id] = p.attendance;
    });

    const tokenData = JSON.parse(localStorage.getItem("authCredentials"))?.token;
    if (!tokenData) {
      alert("You must be logged in as admin to log attendance.");
      return;
    }

    // Call the API to update attendance
    updateAttendance(id, attendanceUpdate, tokenData)
      .then(() => {
        alert("Attendance updated successfully!");
      })
      .catch((error) => {
        alert("Failed to update attendance: " + error.message);
      });
  };

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-indigo-500 to-purple-700 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full h-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-indigo-800 mb-4">
          Event Participants
        </h1>

        {participants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">URN</th>
                  <th className="border px-4 py-2">CRN</th>
                  <th className="border px-4 py-2">Branch</th>
                  <th className="border px-4 py-2">Year</th>
                  <th className="border px-4 py-2">Present</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{p.name || "—"}</td>
                    <td className="border px-4 py-2">{p.urn || "—"}</td>
                    <td className="border px-4 py-2">{p.crn || "—"}</td>
                    <td className="border px-4 py-2">{p.branch || "—"}</td>
                    <td className="border px-4 py-2">{p.year || "—"}</td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={p.attendance}
                        onChange={() => handleCheckboxChange(p._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Log Attendance
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No participants found.</p>
        )}
      </div>
    </div>
  );
};

export default EventStatistics;
