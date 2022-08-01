import { Route, Routes } from "react-router-dom";

import UserProvider from "./contexts/UserContext";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EditProfile from "./components/EditProfile";
import ViewCancelAppointment from "./components/ViewCancelAppointment";
import BookAppointment from "./components/BookAppointment";
import MyBooking from "./components/MyBooking";

const color = "#000";
const theme = createTheme({
  palette: {
    primary: {
      main: color,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: color,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: color,
          color,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <UserProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/log-in" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/booking" element={<BookAppointment />} />
                <Route path="/profile" element={<EditProfile />}></Route>
                <Route
                  path="/appointmenthistory"
                  element={<ViewCancelAppointment />}
                ></Route>
                <Route path="/appointment" element={<MyBooking />}></Route>
              </Routes>
            </Layout>
          </UserProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
