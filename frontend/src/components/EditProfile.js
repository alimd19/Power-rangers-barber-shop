import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { UserContext } from "../contexts/UserContext";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const [updatedUser, setUpdatedUsers] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;

    const value = event.target.value;

    setUpdatedUsers((users) => ({ ...users, [name]: value }));
  };
  const submitHandler = (evt) => {
    evt.preventDefault();
    console.log(updatedUser);
    fetch(`http://localhost:3030/api/user/getUserByEmail/${user.email}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setLoggedInUser(json.users[0]);
        console.log(json.users[0]);
        fetch(
          `http://localhost:3030/api/user/updateUser/${json.users[0]._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(user),
          }
        )
          .then((res) => {
            if (res.ok) {
              console.log("User updated");
            } else {
              console.log("user not updated");
            }
          })
          .catch((err) => {
            console.log(`Error ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
    console.log(loggedInUser);
  };
  return (
    <div>
      <form noValidate onSubmit={submitHandler}>
        <div className="form">
          <div className="form-body">
            <div className="username">
              <label className="form__label" for="fname">
                First Name:
              </label>
              <input
                onChange={handleChange}
                className="form__input"
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
              />
            </div>
            <div className="lastname">
              <label className="form__label" for="lname">
                Last Name:
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="lname"
                id="lname"
                className="form__input"
                placeholder="LastName"
              />
            </div>
            {/* <div className="phone#">
              <label className="form__label" for="lastName">
                Phone number:
              </label>
              <input
                type="text"
                name=""
                id="phone#"
                className="form__input"
                placeholder="Phone #"
              />
            </div> */}
            <div className="email">
              <label className="form__label" for="email">
                Email:
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="form__input"
                placeholder="Email"
              />
            </div>
            {/* <div className="password">
              <label className="form__label" for="password">
                Password:
              </label>
              <input
                className="form__input"
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="confirm-password">
              <label className="form__label" for="confirmPassword">
                Confirm Password:
              </label>
              <input
                className="form__input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </div> */}
          </div>
          <div class="footer">
            <Button type="submit" class="btn" variant="outline-primary">
              Update Details
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
