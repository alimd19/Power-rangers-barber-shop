import { Button, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';

function createData(srno, bookingId, customerName, date, time, cancelbutton) {
  return { srno, bookingId, customerName, date, time, cancelbutton };
}

const rows = [
  createData('1', 125456, "Nirmal", '07/08/2022', '10:00 AM to 10:30 AM'),
  createData('2', 546456, "Klaus", '07/08/2022', '10:30 AM to 11:00 AM'),
  createData('3', 786767, "Ali", '07/08/2022', '11:00 AM to 11:30 AM'),
  createData('4', 345433, "Jorid", '07/08/2022', '11:30 AM to 12:00 PM'),
];

const barberNames = [
  {
    id: 0,
    "name": "Select"
  }, {
    id: 1,
    "name": "James"
  },
  {
    id: 2,
    "name": "Adam"
  },
  {
    id: 3,
    "name": "Praggy"
  },
]

const ViewCancelAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [barberName, setBarberName] = React.useState('Select');
  const [showTable, setShowTable] = useState(false);
  const handleChange = (event) => {
    setBarberName(event.target.value);
  }
  const submitHandler = (evt) => {
    evt.preventDefault();
    console.log("Date: =>" + appointmentDate)
    console.log("FormatDate: =>" + `${appointmentDate.getDate()}/${appointmentDate.getMonth() + 1}/${appointmentDate.getFullYear()}`)
    console.log("barberName =>" + barberName)
    setShowTable(true);
  }
  const clickCancelHandler = (event, bookingId) => {
    console.log(bookingId)
    setShowTable(false)
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
                value={barberName}
                onChange={handleChange}
                helperText="Please select Barber's Name"
              >
                {barberNames.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
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
                <TableCell align="center">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.bookingId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.srno}
                  </TableCell>
                  <TableCell align="center">{row.bookingId}</TableCell>
                  <TableCell align="center">{row.customerName}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                  <TableCell align="center">
                    <Button onClick={(event) => clickCancelHandler(event, row.bookingId)} startIcon={<CancelIcon />}></Button>
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