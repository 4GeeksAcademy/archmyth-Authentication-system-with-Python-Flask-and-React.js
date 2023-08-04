import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [itemUser, setitemUser] = useState({
    email: "",
    password: "",
  });

  const validateUser = () => {
    if (!itemUser.email || !itemUser.password) return false;
    return true;
  };

  const InsertNewUser = async () => {
    console.log(itemUser);
    if (validateUser()) {
      let user = {
        email: itemUser.email,
        password: itemUser.password,
        // "is_active": true
      };

      let resp = await actions.newUser(user);
      if (resp) {
        console.log("success");
        navigate("/login");
      } else {
        console.log("Error");
      }
    } else {
      console.log("resp");
    }
  };

  return (
    <div className="my-4 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50">
        <h1 className="m-2 text-center">Create an account</h1>

        <div className="row m-2">
          <div className="col-md-6 col-sm-6 col-xs-3 mb-2">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputGrid"
                onChange={(event) =>
                  setitemUser({ ...itemUser, email: event.target.value })
                }
              />
              <label htmlFor="floatingSelectGrid">Email</label>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-3 mb-2">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingInputGrid"
                onChange={(event) =>
                  setitemUser({ ...itemUser, password: event.target.value })
                }
              />
              <label htmlFor="floatingSelectGrid">Password</label>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center m-2">
          <div className="d-flex justify-content-center col-md-6 col-sm-5 col-xs-3 px-0">
            <button
              type="submit"
              onClick={InsertNewUser}
              className="col-10 btn btn-travelink btn-outline-info rounded-pill"
            >
              Register
            </button>
          </div>
          <Link
            to="/login"
            className="d-flex justify-content-center col-md-6 col-sm-5 col-xs-3 px-0 d-flex"
          >
            <button
              type="button"
              className="col-10 btn btn-travelink btn-outline-info rounded-pill"
            >
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

