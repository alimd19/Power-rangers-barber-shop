import { Button, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserContext } from '../contexts/UserContext';
const ViewCancelAppointment = () => {

  const [appointmentDate, setAppointmentDate] = useState(null);
  const [barberNames, setBarberNames] = React.useState([]);
  const [barberName, setBarberName] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [appointment, setAppointment] = useState([]);

  const { user } = useContext(UserContext);
  useEffect(() => {

    fetch("http://localhost:3030/api/user/getUserByType/bb")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.user)
        setBarberNames(json.user)
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
  }, [])


  const cancelAllAppointment = () => {
    let appdate = appointmentDate.toISOString();
    fetch(`/api/appointment/deleteAppointmentByDateAndBarber?date=${appdate}&barber=${barberName}`, { method: "PUT" })
      .then((res) => {
          if(res.status===200)
          {
              if(res.json().updateresult.modifiedCount===appointment.length)
              {
                setAppointment([]);
              }
          }           
      })
      
      .catch((err) => {
        console.log(err.message);
      });
      setShowTable(true)
  }


  const handleChange = (event) => {
    console.log(event.target.value)
    setBarberName(event.target.value);
  }
  const submitHandler = (evt) => {
    evt.preventDefault();
    let appdate = appointmentDate.toISOString();
    fetch(`/api/appointment/getAppointmentsByDateAndBarber?date=${appdate}&barber=${barberName}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setAppointment(json.appointments);
      })
      .catch((err) => {
        console.log(err.message);
      });
      setShowTable(true);
  }
  const clickCancelHandler = (event, bookingId) => {
    fetch(`api/appointment/deleteAppointment?id=${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: null
    })
    let appdate = appointmentDate.toISOString();
    fetch(`/api/appointment/getAppointmentsByDateAndBarber?date=${appdate}&barber=${barberName}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setAppointment(json.appointments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (

    <div>
      <div className='viewcancelapp'>
        <form noValidate onSubmit={submitHandler}>
          <div>
            <div className='viewfield'>
              <DatePicker
                label="Appointment Date"
                value={appointmentDate}
                onChange={(newValue) => {
                  console.log(newValue)
                  setAppointmentDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className='viewfield'>
              <TextField
                select
                label="Barber's Name"
                onChange={handleChange}
                helperText="Please select Barber's Name"
              >
                {barberNames.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.fname}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className='book'>
            <Button
              variant="contained"
              type='submit'
            >Get Appointments</Button>
          </div>
        </form>
      </div>
      <div className='tablecontent'>
        {showTable && <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600, color: '#f5deb3' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
                  <TableCell align="center">Booking Id</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">
                    <Button variant="contained"
                      type='button' color='secondary' onClick={cancelAllAppointment}>Cancel All</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointment.map((row, index) => (
                  <TableRow
                    key={row.bookingId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row._id}</TableCell>
                    <TableCell align="center">{row.customer.fname}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">
                      <Button onClick={(event) => clickCancelHandler(event, row._id)} startIcon={<CancelIcon />}></Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>}
      </div>
    </div>
  )
}

export default ViewCancelAppointment