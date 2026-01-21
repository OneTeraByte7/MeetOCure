import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaVenusMars,
  FaPencilAlt,
} from "react-icons/fa";
import profileImg from "/assets/doc_profile.png";
import TopIcons from "../../../components/PatientTopIcons";
import axios from "axios";
import { apiUrl } from "../../../utils/api";

const PatientEditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    photo: profileImg,
  });
  const [loading, setLoading] = useState(true);

  // Fetch patient profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          apiUrl("/api/patient/profile"),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let dob = res.data.dob || "";
        if (dob) {
          const d = new Date(dob);
          dob = d.toISOString().slice(0, 10);
        }

        setForm({
          name: res.data.name || "",
          phone: res.data.phone || "",
          dob,
          gender: res.data.gender || "",
          photo: res.data.photo || profileImg,
        });
      } catch (err) {
        alert("Failed to fetch profile: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderSelect = (gender) => {
    setForm((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        apiUrl("/api/patient/profile"),
        {
          name: form.name,
          phone: form.phone,
          dob: form.dob,
          gender: form.gender,
          photo: form.photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
      navigate("/patient/profile");
    } catch (err) {
      alert("Failed to update profile: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFC] font-[Poppins] px-6 pt-6 pb-28">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaArrowLeft
            className="text-2xl text-[#1F2A37] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[22px] font-semibold text-[#1F2A37]">Edit Profile</h1>
        </div>
        <TopIcons />
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="rounded-full p-1 bg-white shadow-xl">
          <img
            src={form.photo}
            alt="User"
            className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-inner"
          />
        </div>
        <label className="absolute bottom-3 right-[calc(50%-36px)] bg-[#0A4D68] p-2 rounded-full cursor-pointer shadow-md">
          <FaPencilAlt className="text-white text-sm" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <h2 className="text-center text-xl font-bold text-[#0A4D68] mb-10">Edit</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {[
          {
            label: "Full Name",
            name: "name",
            icon: <FaUser className="text-[#0A4D68]" />,
            type: "text",
            placeholder: "Enter full name",
          },
          {
            label: "Mobile Number",
            name: "phone",
            icon: <FaPhone className="text-[#0A4D68]" />,
            type: "tel",
            placeholder: "Enter phone number",
          },
          {
            label: "Date of Birth",
            name: "dob",
            icon: <FaCalendarAlt className="text-[#0A4D68]" />,
            type: "date",
          },
        ].map(({ label, name, icon, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div className="flex items-center gap-3 border border-[#0A4D68] rounded-lg px-4 py-2 bg-white shadow-sm">
              {icon}
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
                placeholder={placeholder}
              />
            </div>
          </div>
        ))}

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
          <div className="flex flex-wrap gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => handleGenderSelect(g)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition border shadow-sm ${
                  form.gender === g
                    ? "bg-[#0A4D68] text-white"
                    : "bg-white text-[#1F2A37] border-gray-300"
                }`}
              >
                <FaVenusMars />
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-4 bg-[#0A4D68] text-white py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#083e54] transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PatientEditProfile;
