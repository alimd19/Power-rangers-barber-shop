import React, { useState, useEffect, useContext } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, MenuItem, TextField } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const BookAppointment = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [appointment, setAppointment] = useState({})
  const [timeSlot, setTimeSlot] = useState({});
  const [services, setServices] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [barbers, setBarbers] = useState([]);
  const [message,setMessage]= useState("");
  useEffect(() => {
    const todaysDate = appointmentDate.getDate() + "/" + (appointmentDate.getMonth() + 1) + "/" + appointmentDate.getFullYear();
    setAppointment(appointment => ({ ...appointment, 'date': todaysDate }));
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

  const handleChange = (event) => {
    setAppointment(appointment => ({ ...appointment, 'customer': loggedInUser._id }))
    console.log(event)
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.name === 'barber') {
      fetch(`http://localhost:3030/api/schedule/getScheduleBybarber/${event.target.value}`)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const schedules = json.schedules[0];
          if (appointmentDate) {
            const day = appointmentDate.getDay();
          }
        })
        .catch((err) => {
          console.log(`Error ${err}`);
        });
    }
    setAppointment(appointment => ({ ...appointment, [name]: value }))
  }

  const handleStartTimeChange = (event) => {
    setTimeSlot((timeSlot) => ({ ...timeSlot, startTime: event.target.value }))
    
  }

  const handleSelectedService=(event)=>{
    const services=[];
    if(!services.includes(event.target.value))
    {
      services.push(event.target.value);
    }
    setAppointment((appointment)=>({...appointment,services}))
  }

  const handleEndTimeChange = (event) => {
    console.log(event.target.value)
    setTimeSlot((timeSlot) => ({ ...timeSlot, endTime: event.target.value }));
  }

  const populateAppointments=()=>{
    setAppointment(appointment => ({ ...appointment,timeSlot:timeSlot ,'status': "scheduled"}))
  }
  const submitHandler = (evt) => {
    evt.preventDefault();
    console.log(appointment)
    fetch("http://localhost:3030/api/appointment/createAppointment",{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    })
      .then((res) => {
        if(res.ok)
        {
          setMessage("Your booking is confirmed!!!")
          navigate("/appointment")
        }else
        {
          setMessage("Booking Not Confirmed")
        }
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });

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
                  const appointmentdate = newValue.getDate() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getFullYear();
                  setAppointment((appointment) => ({ ...appointment, "date": appointmentdate }));
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
              name="services"
              value={appointment.services}
              onChange={handleSelectedService}
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
              onChange={handleStartTimeChange}
              value={timeSlot.startTime}
            ></TextField>
            <TextField
              variant="outlined"
              style={{ width: 400 }}
              label="End Time"
              name="endTime"
              onChange={handleEndTimeChange}
              onBlur={populateAppointments}
              value={timeSlot.endTime}
            ></TextField>
          </div>
        </div>
        <div className="book">
          <Button variant="contained" type="submit">
            Book
          </Button>
        </div>
      </form>

      <div>{message}</div>
    </div>
  );
};

export default BookAppointment;
