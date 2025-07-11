import { useState } from "react";

const EventStatistics = () => {
  const yearLabels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const data = {
    1: [
      { name: "John Doe", email: "john@example.com", urn: "1234567890", crn: "0987654321" },
      { name: "Jane Smith", email: "jane@example.com", urn: "9876543210", crn: "1234567890" }
    ],
    2: [
      { name: "Alice Brown", email: "alice@example.com", urn: "5551234567", crn: "5559876543" },
      { name: "Bob White", email: "bob@example.com", urn: "5559876543", crn: "5551234567" },
      { name: "Alice Brown", email: "alice@example.com", urn: "5551234567", crn: "5559876543" },
      { name: "Bob White", email: "bob@example.com", urn: "5559876543", crn: "5551234567" },
      { name: "Alice Brown", email: "alice@example.com", urn: "5551234567", crn: "5559876543" },
      { name: "Bob White", email: "bob@example.com", urn: "5559876543", crn: "5551234567" },
      { name: "Alice Brown", email: "alice@example.com", urn: "5551234567", crn: "5559876543" },
      { name: "Bob White", email: "bob@example.com", urn: "5559876543", crn: "5551234567" }
    ],
    3: [
      { name: "Charlie Green", email: "charlie@example.com", urn: "5555555555", crn: "5551112222" },
      { name: "Dana Black", email: "dana@example.com", urn: "5551112222", crn: "5555555555" }
    ],
    4: [
      { name: "Eve Blue", email: "eve@example.com", urn: "5553334444", crn: "5556667777" },
      { name: "Frank Gray", email: "frank@example.com", urn: "5556667777", crn: "5553334444" }
    ]
  };

  const [selected, setSelected] = useState(null);

  const handleSelect = (e) => {
    setSelected(Number(e.target.value));
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-700 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full h-screen mx-auto space-y-6">
        <div className="flex justify-around">
          {yearLabels.map((label, index) => (
            <label key={index + 1} className="flex flex-col items-center space-y-2">
              <input
                type="radio"
                name="eventRadio"
                value={index + 1}
                checked={selected === index + 1}
                onChange={handleSelect}
                className="accent-purple-700 w-5 h-5"
              />
              <span className="text-gray-800 font-medium">{label}</span>
            </label>
          ))}
        </div>

        {selected && (
          <div className="bg-gray-50 p-4 rounded-md border space-y-4">
            <h2 className="text-xl font-bold text-indigo-800 text-center">
              Participants for {yearLabels[selected - 1]}
            </h2>
            <p className="text-center text-gray-700">
              Total Students: {data[selected]?.length}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {data[selected]?.map((participant, index) => (
                <div
                  key={index}
                  className="p-3 bg-white rounded shadow border border-gray-200 w-60"
                >
                  <p className="text-gray-800 font-semibold">{participant.name}</p>
                  <p className="text-gray-700 text-sm">{participant.email}</p>
                  <p className="text-gray-700 text-sm">{participant.urn}</p>
                  <p className="text-gray-700 text-sm">{participant.crn}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventStatistics;
