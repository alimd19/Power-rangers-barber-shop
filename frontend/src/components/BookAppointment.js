import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, MenuItem, TextField } from "@mui/material";

const BookAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [serviceType, setServiceType] = React.useState("Select");
  const [timeSlot, setTimeSlot] = useState("Select");
  const [showTable, setShowTable] = useState(false);
  const handleChange = (event) => {
    setServiceType(event.target.value);
  };

    const handleTimeChange=(event)=>{
        setTimeSlot(event.target.value)
    }

    const timeSlots=[{
        id: 0,
            "name": "10:00 AM - 10:30 AM"
        }, {
            id: 1,
            "name": "10:30 AM - 11:00 AM"
        },
        {
            id: 2,
            "name": "11:00 AM - 11:30 AM"
        },
        {
            id: 3,
            "name": "11:30 AM - 12:00 AM"
    },
    {
      id: 1,
      name: "10:30 AM - 11:00 AM",
    },
    {
      id: 2,
      name: "11:00 AM - 11:30 AM",
    },
    {
      id: 3,
      name: "11:30 AM - 12:00 AM",
    },
  ];
  const services = [
    {
      id: 0,
      name: "Hair Cut",
    },
    {
      id: 1,
      name: "Beard Cut",
    },
    {
      id: 2,
      name: "Facial Mask",
    },
    {
      id: 3,
      name: "Hair Wash",
    },
  ];
  const submitHandler = (evt) => {
    evt.preventDefault();
    console.log("Date: =>" + appointmentDate);
    console.log(
      "FormatDate: =>" +
        `${appointmentDate.getDate()}/${
          appointmentDate.getMonth() + 1
        }/${appointmentDate.getFullYear()}`
    );
    setShowTable(true);
  };

  return (
    <div className="bookappointment">
      <form noValidate onSubmit={submitHandler}>
        <div>
          <div className="bookingfield">
            <TextField
              variant="outlined"
              style={{ width: 400 }}
              label="Customer Name"
            ></TextField>
            <div>
              <DatePicker
                label="Appointment Date"
                value={appointmentDate}
                InputProps={{ style: { width: 400 } }}
                onChange={(newValue) => {
                  setAppointmentDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="bookingfield">
            <TextField
              select
              label="Service Type"
              value={serviceType}
              onChange={handleChange}
              style={{ width: 400 }}
              helperText="Please select the service"
            >
              {services.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="bookingfield">
            <TextField className=" text-field"
              select
              label="Time Slot"
              variant="outlined"
              value={timeSlot}
              onChange={handleTimeChange}
              style={{ width: 400, color:"black" }}
              helperText="Please select one of the avaliable time slots"
            >
              {timeSlots.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="book">
          <Button variant="contained" type="submit">
            Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
