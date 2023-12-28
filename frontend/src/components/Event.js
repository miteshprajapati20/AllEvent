import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    category: "",
    bannerImage: null, // Updated to store the file object
  });
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // Handle file input separately
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Assuming single file selection
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.name==='' || formData.startTime===''||formData.endTime===''||formData.location===''||formData.description===''||formData.category===''){
        toast.error("All Fields are Required !");
        return;
    }


    let decode = jwtDecode(localStorage.getItem('token'));
    let email = decode.data.userEmail;


    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("startTime", formData.startTime);
    formDataToSend.append("endTime", formData.endTime);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("bannerImage", formData.bannerImage);
    formDataToSend.append('email',email);

    try {
     
      const response = await axios.post(
        "http://localhost/allevent/backend/events.php",
        formDataToSend
      );
      console.log(response.data);

      toast.success("Event Created Successfully")
      setFormData({
        name: "",
        startTime: "",
        endTime: "",
        location: "",
        description: "",
        category: "",
        bannerImage: null,
      });

      navigate('/');

    } catch (error) {
      // Handle errors
      toast.error("Error in Creating the Event")
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md"
      >
        <label className="block mb-2 text-sm font-bold text-gray-600">
          Event Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Event Name"
            
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 text-sm font-bold text-gray-600">
          Start Time:
          <input
            type="date"
            name="startTime"
            value={formData.startTime}
            
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 text-sm font-bold text-gray-600">
          End Time:
          <input
            type="date"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 text-sm font-bold text-gray-600">
          Location(Only City Name):
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            
            placeholder="Enter Location"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 text-sm font-bold text-gray-600">
          Description:
          <textarea
            name="description"
            value={formData.description}
            
            onChange={handleChange}
            placeholder="Enter Description"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 text-sm font-bold text-gray-600">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            
            onChange={handleChange}
            placeholder="Enter Category"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2 text-sm font-bold text-gray-600">
          Banner Image:
          <input
            type="file"
            name="bannerImage"
            accept="image/*"
            
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default Event;
