import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios";
import toast from "react-hot-toast";

function getStatusBadge(status) {
  if (status === "Full") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
        Full
      </span>
    );
  } else if (status === "Almost Full") {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-600">
        Almost Full
      </span>
    );
  } else {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
        Open
      </span>
    );
  }
}

function BrowseLabs() {
  const [labs, setLabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLabs();
  }, []);

  function fetchLabs() {
    api
      .get("/labs/")
      .then((response) => {
        setLabs(response.data);
      })
      .catch(() => {
        toast.error("Failed to load labs");
      });
  }

  function handleBookClick(lab) {
    // Pass the selected lab to the BookSeat page via navigation state
    navigate("/student/book-seat", { state: { lab } });
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Browse Labs
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View available laboratory rooms and book a seat
        </p>
      </div>

      {/* Lab cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-6 flex flex-col justify-between"
          >
            {/* Top section */}
            <div>
              {/* Room number and status badge */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Room {lab.room_number}
                </h2>
                {getStatusBadge(lab.status)}
              </div>

              {/* Seat info */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Total Seats
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {lab.total_seats}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Available
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {lab.available_seats}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Occupied
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {lab.total_seats - lab.available_seats}
                  </span>
                </div>
              </div>

              {/* Availability bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    lab.status === "Full"
                      ? "bg-red-400"
                      : lab.status === "Almost Full"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                  }`}
                  style={{
                    width: `${((lab.total_seats - lab.available_seats) / lab.total_seats) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Book button */}
            <button
              onClick={() => handleBookClick(lab)}
              disabled={lab.available_seats === 0}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition duration-150 ${
                lab.available_seats === 0
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {lab.available_seats === 0 ? "Fully Booked" : "Book a Seat"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseLabs;
