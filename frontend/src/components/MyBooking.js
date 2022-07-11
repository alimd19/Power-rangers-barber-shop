import React from 'react'
import { Typography } from '@mui/material'

const myBooking=[
    {
        bookingId:1,
        customerId:23,
        name:'Nirmal Panchal Mayur',
        date:'25-07-1996',
        time:'5:00 pm - 5:30 pm'
    },
    {
        bookingId:2,
        customerId:23,
        name:'Bina Mayur Panchal',
        date:'25-07-1996',
        time:'5:00 pm - 5:30 pm'
    },
    {
        bookingId:3,
        customerId:23,
        name:'Manushi Desai',
        date:'25-07-1996',
        time:'5:00 pm - 5:30 pm'
    }
]
const MyBooking = () => {
  return (
        <div>
            <Typography variant="h5" sx={{marginTop:3,marginBottom:2,color:'black'}} >
                Upcoming Booking Details
            </Typography>
            {
                myBooking.map((mybooking)=>(
                    <div className='bookingcard'>
                        <Typography variant="h4" >
                            {mybooking.name}
                        </Typography>
                        <Typography variant="h5">
                            Booking Id: {mybooking.bookingId}
                        </Typography>
                        <Typography variant="h5">
                            Date: {mybooking.date}
                        </Typography>
                        <Typography variant="h5">
                            Time: {mybooking.time}
                        </Typography>
                    </div>
                ))
            }
            </div>
  )
}

export default MyBooking