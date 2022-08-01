import React from "react";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

// const myBooking=[
//     {
//         bookingId:1,
//         customerId:23,
//         name:'Nirmal Panchal Mayur',
//         date:'25-07-1996',
//         time:'5:00 pm - 5:30 pm'
//     },
//     {
//         bookingId:2,
//         customerId:23,
//         name:'Bina Mayur Panchal',
//         date:'25-07-1996',
//         time:'5:00 pm - 5:30 pm'
//     },
//     {
//         bookingId:3,
//         customerId:23,
//         name:'Manushi Desai',
//         date:'25-07-1996',
//         time:'5:00 pm - 5:30 pm'
//     }
// ]

const MyBooking = () => {
  const [myBooking, setBooking] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/appointment/getAppointment")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setBooking(json.appointments);
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ marginTop: 3, marginBottom: 2, color: "black" }}
      >
        Upcoming Booking Details
      </Typography>
      {myBooking.map((mybooking) => {
        const customer = fetch(
          `http://localhost:3030/api/user/getUser/${mybooking.customer}`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            return json.user;
          })
          .catch((err) => {
            console.log(`Error ${err}`);
          });
         
        return (
          <div className="bookingcard">
            <Typography variant="h4">{}</Typography>
            <Typography variant="h5">Booking Id: {mybooking._id}</Typography>
            <Typography variant="h5">Date: {mybooking.date}</Typography>
            <Typography variant="h5">
              Time: {mybooking.timeSlot.startTime}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default MyBooking;
