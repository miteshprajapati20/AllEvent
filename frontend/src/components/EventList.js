import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/AppContext';

const EventList = () => {
  const { events, fetchEvents } = useContext(EventContext)
  const navigate = useNavigate();


  useEffect(() => {
    fetchEvents();
  }, [])

  // const handleDelete = async (eventId) => {
  //   try {
  //     console.log('Deleting event with ID:', eventId);
  //     await deleteEvent(eventId);
  //     console.log('Event deleted successfully');
  //     // After deletion, navigate to the home page
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error deleting event:', error);
  //   }
  // };
  



  return (
    <div className="container mx-auto my-8">
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl font-bold mb-4">Event List</h2>
        <button onClick={() => navigate('filter-data')} className='px-3 py-1 font-medium rounded-lg mb-4 bg-blue-500 text-white'>Filter Events</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length > 0 ? events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={event.bannerImage}
              alt={event.name}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-mono font-bold mb-2">{event.name}</h3>
              <p className="font-mono mb-2">{event.description}</p>
              <p className="font-mono text-gray-700"> <span className='font-semibold'>Location:</span>  {event.location}</p>
              <p className="font-mono text-gray-700"><span className='font-semibold'>Start Time:</span> {event.startTime}</p>
              <p className="font-mono text-gray-700"><span className='font-semibold'>End Time:</span> {event.endTime}</p>
              <p className="font-mono text-gray-700"><span className='font-semibold'>Category:</span> {event.category}</p>
              {/* <button onClick={() => handleDelete(event.id)} className='px-3 py-1 mt-2 font-medium rounded-lg bg-red-500 text-white'>Delete</button> */}
            </div>
          </div>
        )) : <div><h3 className="font-bold text-red-600">No Event Found</h3></div>}
      </div>
    </div>
  );
};

export default EventList;
