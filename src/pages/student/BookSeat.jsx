import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function BookSeat() {
  const location = useLocation();
  const navigate = useNavigate();

  // Read the lab passed from Browse Labs
  // API POINT - in Phase 3 lab data comes from API, not navigation state
  const { lab } = location.state || {};

  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Guard clause cus if no lab was passed, show a safe fallback
  if (!lab) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            No lab selected
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Please select a lab from the Browse Labs page first.
          </p>
          <Link
            to="/student/browse-labs"
            className="inline-block px-6 py-2.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg transition duration-150"
          >
            Browse Labs
          </Link>
        </div>
      </div>
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date.';
    } else if (new Date(formData.date) < new Date()) {
      newErrors.date = 'Please select a future date.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time.';
    }

    return newErrors;
  }

  function handleSubmit() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // API POINT - replace with:
    // axios.post('/api/reservations/', {
    //   lab_id: lab.id,
    //   date: formData.date,
    //   time: formData.time,
    // }).then(() => {
    //   setSubmitted(true);
    // }).catch(err => {
    //   setErrors({ date: 'This slot is already booked. Please choose another time.' });
    // })

    console.log('Booking submitted:', {
      lab: lab.room_number,
      date: formData.date,
      time: formData.time,
    });

    setLoading(false);
    setSubmitted(true);
  }

  // Get today's date in YYYY-MM-DD format for the min attribute on the date input
  // This prevents selecting past dates directly from the date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {submitted ? (

        /* Success state */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-green-500" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
            You have successfully booked a seat in
          </p>
          <p className="text-violet-500 font-semibold mb-1">{lab.room_number}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            {formData.date} at {formData.time}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/student/my-reservations"
              className="inline-block w-full py-2.5 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg transition duration-150 text-center"
            >
              View My Reservations
            </Link>
            <Link
              to="/student/browse-labs"
              className="inline-block w-full py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition duration-150 text-center"
            >
              Browse More Labs
            </Link>
          </div>
        </div>

      ) : (

        /* Booking form */
        <div className="max-w-lg mx-auto">

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
              Book a Seat
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Complete your reservation below
            </p>
          </div>

          {/* Lab info card */}
          <div className="bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold uppercase text-violet-400 mb-1">
              Selected Lab
            </p>
            <p className="text-lg font-bold text-violet-600 dark:text-violet-400">
              {lab.room_number}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {lab.availableSeats} of {lab.totalSeats} seats available
            </p>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-6">
            <div className="space-y-5">

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    errors.date
                      ? 'border-red-400 dark:border-red-400'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    errors.time
                      ? 'border-red-400 dark:border-red-400'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <option value="">Select a time slot</option>
                  <option value="08:00">08:00 AM</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-2.5 bg-violet-500 hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-150"
              >
                {loading ? 'Confirming...' : 'Confirm Booking'}
              </button>

              {/* Back link */}
              <button
                onClick={() => navigate(-1)}
                className="w-full py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition duration-150"
              >
                Go Back
              </button>

            </div>
          </div>

        </div>

      )}

    </div>
  );
}

export default BookSeat;