const EventCard = ({ data }) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition hover:shadow-2xl">
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold text-indigo-800 mb-2 tracking-wide">
          {data.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {data.description}
        </p>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          Read More
        </button>
      </div>
    </div>
  );
};

export default EventCard;
