import React, { useState, useEffect, useContext } from "react";
import { EventContext } from "../context/AppContext";

const EventFilter = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const { events } = useContext(EventContext);
  const [filteredEvents, setFilteredEvents] = useState(events);




  useEffect(() => {
    // Filter events based on selectedCity, selectedCategory, and selectedDate
    const filteredEvents = events.filter((event) => {
      const isCityMatch = selectedCity === "" ||event.location.toLowerCase() === selectedCity.toLowerCase();
      const isCategoryMatch = selectedCategory === "" ||event.category.toLowerCase() === selectedCategory.toLowerCase();
      const isDateMatch = selectedDate === "" ||(event.startTime <= selectedDate && event.endTime >= selectedDate);

      return isCityMatch && isCategoryMatch && isDateMatch;
    });

    // Set the filtered events in the state
    setFilteredEvents(filteredEvents);
    console.log(filteredEvents);
  }, [events, selectedCity, selectedCategory, selectedDate, setFilteredEvents]);

  return (
    <div className="my-4 px-4">
      <div className="py-4 px-4 bg-gray-100 rounded shadow-md flex flex-col md:flex-row items-start">
        <label className="mb-2 text-lg font-medium text-gray-800">
          City:
          <input
            className="w-full md:w-48 p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            value={selectedCity}
            placeholder="Enter City"
            onChange={(e) => setSelectedCity(e.target.value)}
          />
        </label>

        <label className="mb-2 text-lg font-medium text-gray-800 mx-2">
          Category:
          <input
            className="w-full md:w-48 p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
        </label>

        <label className="mb-2 text-lg font-bold text-gray-800">
          Date:
          <input
            className="w-full md:w-48 p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>


        {/* show filtered data with count */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Filtered Events<span>{" ("}{filteredEvents.length}{")"}: </span></h2>
          <ul>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-4 rounded-md shadow-md"
                  >
                    <img
                      src={event.bannerImage}
                      alt={event.name}
                      className="w-full h-40 object-cover mb-4 rounded-md"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-mono text-xl font-semibold mb-2">
                        {event.name}
                      </h3>
                      <p className="font-mono mb-2">{event.description}</p>
                      <p className="font-mono text-gray-700">
                        {" "}
                        <span className="font-semibold">Location:</span>{" "}
                        {event.location}
                      </p>
                      <p className="font-mono text-gray-700">
                        <span className="font-semibold">Start Time:</span>{" "}
                        {event.startTime}
                      </p>
                      <p className="font-mono text-gray-700">
                        <span className="font-semibold">End Time:</span>{" "}
                        {event.endTime}
                      </p>
                      <p className="font-mono text-gray-700">
                        <span className="font-semibold">Category:</span>{" "}
                        {event.category}
                      </p>
                    </div>
                  </div>
                ))
              ) : <div><h3 className="font-bold text-red-600">No Event Found</h3></div>}
            </div>
          </ul>
        </div>
    </div>
  );
};

export default EventFilter;
