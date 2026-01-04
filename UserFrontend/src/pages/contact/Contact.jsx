import React, { useState } from 'react'
import nepal from "../../assets/contact/nepal.png"
import { Bounce, toast } from 'react-toastify';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

function Contact() {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    phone: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
       toast.warn("Plz fill all required fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    console.log("Submitted Data:", formData);

     toast.success("Sent Messages Sucessfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

    // Clear form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      service: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div>
      <section>
        <div className="bg-white">
      <h1 className="text-[#0C6967] italic font-medium text-2xl text-center p-6">
        Our Contact
      </h1>
      <p className="text-[#6B788E] text-center font-bold p-2">GET IN TOUCH</p>
      <h1 className="font-bold text-2xl text-orange-500 flex justify-center gap-2 ">
        We
        <span className="font-bold text-2xl text-black ">
          would love to hear from you
        </span>
      </h1>

      <div className="flex gap-6 justify-center p-10 font-medium">
        <div className="rounded-2xl shadow-2xl shadow-gray-500 p-3">
          <h1 className="flex items-center gap-2">
            <FaLocationDot color="#D95103" /> Location
          </h1>
          <br />
          <h1>
            Jhaukhel-Bhaktapur,Nepal
          </h1>
          <br />
          <h1 className="flex items-center gap-2"></h1>
        </div>

        <div className="rounded-2xl shadow-2xl shadow-gray-500 p-3">
          <h1 className="flex items-center gap-2"><FaPhoneAlt color="#D95103" /> Phone</h1><br />
          <div className="flex gap-6">
            <h1 className="text-[#0C6967] font-medium flex">Mobile:</h1>
            <p>(+977) 9800002011</p>
          </div>        
        </div>

        <div className="rounded-2xl shadow-2xl shadow-gray-500 p-3">
            <h1 className="flex items-center gap-2"><FaClock color="#D95103" /> SERVICE TIME</h1><br />
          <div className="flex gap-6">
            <h1 className="text-[#0C6967] font-medium flex">Sun - Sat</h1>
            <p>8 am - 8 pm</p> 
          </div>
        </div>
      </div>

      
    </div>
      </section>

      <section>
         <div className="bg-white flex p-10 justify-between">
      {/* Map */}
      <div className="rounded-2xl bg-white">
        <iframe
          className="w-[90vh] h-[90vh]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28262.43593962273!2d85.40919517270598!3d27.692436876197114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1acf27793fc5%3A0xfec900900962fa59!2sJhaukhel%2C%20Changunarayan!5e0!3m2!1sen!2snp!4v1764125520418!5m2!1sen!2snp"
          loading="lazy"
        ></iframe>
      </div>

      {/* Form */}
      <form className="p-6 bg-white" onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl flex gap-2">
          Contact <span className="text-orange-500">Us</span>
        </h1>

        <p className="text-[#6B788E] font-medium mt-3">
          If you have any queries, send us a message. Our friendly team would
          love to hear from you.
        </p>

        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mt-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* Select */}
        <div className="mt-4">
          <label>What can we do for you</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Choose</option>
            <option value="Support">Support</option>
            <option value="Service">Service</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label>Phone Number</label>
          <div className="flex">
            <div className="flex items-center p-3 border rounded-l-xl bg-gray-100">
              <img src={nepal} alt="" className="w-5 mr-1" /> +977
            </div>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-r-xl"
            />
          </div>
        </div>

        {/* Message */}
        <div className="mt-4">
          <label>Message</label>
          <textarea
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          ></textarea>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button 
            type="submit"
            className="px-10 py-3 bg-[#0C6967] ml-60 text-white rounded-full hover:bg-green-600"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>

      </section>
    </div>
  )
}

export default Contact