import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user.id) {
      fetch(`/api/appointment/getAppointment?type=customer&userId=${user.id}`)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setBookings(json.appointments);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ marginTop: 3, marginBottom: 2, color: "black" }}
      >
        Upcoming Booking Details
      </Typography>
      {bookings.map((booking) => {
        return (
          <div className="bookingcard" key={booking._id}>
            <Typography variant="h5">
              Barber: {booking.barber.fname + " " + booking.barber.lname}
            </Typography>
            <Typography variant="h5">Booking Id: {booking._id}</Typography>
            <Typography variant="h5">Date: {booking.date}</Typography>
            <Typography variant="h5">
              Time: {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default MyBooking;
