import axios from "axios";
import React, { createContext, useState } from "react";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
  const [events, setEvents] = useState([]);


  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost/allevent/backend/events.php`
      );
      console.log(response.data.events);
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // const deleteEvent = async (eventId) => {
  //   try {
  //     await axios.delete(
  //       `http://localhost/allevent/backend/events.php?id=${eventId}`
  //       );
  //     } catch (error) {
  //       console.error(`Error deleting event with ID ${eventId}:`, error);
  //     }
  //     fetchEvents();
  // };


  const value = {
    events,
    setEvents,
    // deleteEvent,
    fetchEvents
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
