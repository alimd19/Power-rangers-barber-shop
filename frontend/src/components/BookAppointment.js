import React, { useState,useEffect,useContext } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, MenuItem, TextField } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

const BookAppointment = () => {
  const { user } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] =useState({});
  const [appointment,setAppointment]=useState({timeSlot:{}})
  const [services, setServices]=useState([]);
  const [appointmentDate,setAppointmentDate]=useState(new Date());
  const [barbers, setBarbers]=useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/api/user/getUserByEmail/${user.email}`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setLoggedInUser(json.users[0])
      console.log(json.users[0])
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    });
    fetch("http://localhost:3030/api/user/getUserByType/bb")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setBarbers(json.user)
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    });
        fetch("http://localhost:3030/api/service/getService")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setServices(json.services)
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
  }, []);

  const handleChange=(event)=>{
    setAppointment(appointment=>({...appointment,['customer']:loggedInUser._id}))
    console.log(event)
    const name = event.target.name;
    const value = event.target.value;
    if(event.target.name==='barber')
    {
      fetch(`http://localhost:3030/api/schedule/getScheduleById/${event.target.value}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
       if(appointmentDate)
       {
          const day=appointmentDate.getDay();
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
    }
    setAppointment(appointment => ({...appointment, [name]: value}))
  }

  const submitHandler=(evt)=>{
    evt.preventDefault();
    console.log(appointment)
  }
  return (
    <div className="bookappointment">
      <form noValidate onSubmit={submitHandler}>
        <div>
          <div className="bookingfield">
            <div>
              <DatePicker
                label="Appointment Date"
                value={appointmentDate}
                InputProps={{ style: { width: 400 } }}
                onChange={(newValue) => {
                  const appointmentdate = newValue.getDate() +"/"+newValue.getMonth() + 1 +"/"+newValue.getFullYear();
                  setAppointment((appointment)=> ({...appointment,["date"]:appointmentdate}));
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
              name="serviceType"
              value={appointment.serviceType}
              onChange={handleChange}
              style={{ width: 400 }}
              helperText="Please select the service"
            >
              {services.map((option) => (
                <MenuItem key={option.id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="bookingfield">
          <TextField
              select
              label="Barber's Name"
              name="barber"
              value={appointment.barber}
              onChange={handleChange}
              style={{ width: 400 }}
              helperText="Please select the barber"
            >
              {barbers.map((option) => (
                <MenuItem key={option.id} value={option._id}>
                  {option.fname}
                </MenuItem>
              ))}
            </TextField>
            
          </div>
        </div>
        <div>
          <div className="bookingfield">
        <TextField
              variant="outlined"
              style={{ width: 400 }}
              label="Start Time"
              name="startTime"
              onChange={handleChange}
              value={appointment.timeSlot.startTime}
            ></TextField>
            <TextField
              variant="outlined"
              style={{ width: 400 }}
              label="End Time"
              name="endTime"
              onChange={handleChange}
              value={appointment.timeSlot.endTime}
            ></TextField>
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
