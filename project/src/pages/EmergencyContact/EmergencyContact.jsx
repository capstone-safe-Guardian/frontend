import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
// import { navigate } from 'react-router-dom'; // Assuming you're using react-router


function EmergencyContact() {
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Navigate=useNavigate();
  // Validation for contact form input
  const validateInput = () => {
    // Validate all fields
    if (!contactName || !contactNumber || !relationship) {
      setError("All fields are required.");
      return false;
    }

    // Contact Number validation with country code (e.g., +91 9876543210)
    const phoneRegex = /^\+?\d{1,4}[-.\s]?\d{10}$/; // Optional country code, followed by 10 digits
    if (!phoneRegex.test(contactNumber)) {
      setError("Contact number must be a valid number with an optional country code (e.g., +91 9876543210).");
      return false;
    }

    // Relationship validation
    if (!relationship) {
      setError("Relationship is required.");
      return false;
    }

    // Reset error message if all validations pass
    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input fields
    if (!validateInput()) return;

    setIsSubmitting(true); // Indicate that the form is being submitted

    try {
      // Retrieve userId and auth token from localStorage
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("auth_token");

      if (!userId) {
        setError("User ID is missing. Please log in.");
        setIsSubmitting(false);
        return;
      }

      if (!token) {
        setError("Authentication token is missing. Please log in.");
        setIsSubmitting(false);
        return;
      }

      // Prepare data to send
      const formData = {
        userId,
        contactName,
        contactNumber,
        relationship
      };

      // Set up headers with Authorization token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the auth token as Bearer token
        },
      };

      // Make the POST request to the backend API
      const response = await axios.post(
        "/api/emergency-contacts", 
        formData, 
        config
      );

      // Log the response data
      console.log("Emergency contact submitted successfully", response.data);

      // Check if the response status is 200
      if (response.status === 201||response.status=== 200) {
        console.log("Submission successful:", response.data);
        // Optionally, navigate to the success page or any other route
        Navigate("/Home1");
        // Navigate("/login")
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      // Handle any errors that occur during the request
      console.error("Failed to submit emergency contact", err);

      if (err.response) {
        // If there's an error response from the backend
        setError(err.response.data?.message || "Submission failed. Please try again.");
      } else {
        // If there was a network or server issue
        setError("Network error or server is unavailable.");
      }
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Emergency Contact Form
          </h2>

          {/* Display error message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Contact Name Input */}
            <div className="flex gap-3">
              <div className="w-full">
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Contact Number Input */}
            <div className="flex gap-3">
              <div className="w-full">
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Relationship Input */}
            <div className="flex gap-3">
              <div className="w-full">
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                  Relationship
                </label>
                <input
                  type="text"
                  id="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="mt-2 p-3 w-full rounded-lg border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50 text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
      <p>
        
        <span className="mx-2">|</span>
        <Link to="/home1" className="text-gray-500 hover:underline">Already Filled</Link>
      </p>
    </div>
        </div>
      </div>
    </>
  );
}

export default EmergencyContact;
