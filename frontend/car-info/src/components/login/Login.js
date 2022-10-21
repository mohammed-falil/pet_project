import "./login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();

  const [updateResponse, setUpdateResponse] = useState();
  const initialStateError = {
    name: { required: false },
    password: { required: false },
    custom_error: null,
  };
  const [error, setError] = useState(initialStateError);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); //prvent unwanted loading
    let error = initialStateError;
    let hasError = false;

    if (input.name == "") {
      error.name.required = true;
      hasError = true;
    } else if (input.password == "") {
      error.password.required = true;
      hasError = true;
    } else if (!hasError) {
      setLoading(true);
    }
    setError(error);
  };
  const [input, setInput] = useState({
    //state properties
    name: "",
    password: "",
  });
  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const loginUrl = "http://localhost:9090/admin/loginAuthenticate";

  useEffect(() => {
    if (loading) {
      axios
        .post(loginUrl, {
          username: input.name,
          password: input.password,
        })
        .then((response) => {
          if (response.data.error === false) {
            sessionStorage.setItem("JWT", "Bearer " + response.data.token);
          }

          setUpdateResponse(response.data.error);
        });
    }
  }, [loading]);

  useEffect(() => {
    console.log("updateResponse : ", updateResponse);
    if (updateResponse === false) {
      props.setLoggedIn(true);
      navigate("/admin/car-list");
    } else if (updateResponse === true) {
      alert("Invalid username or password");
      setLoading(false);
    }
  }, [updateResponse]);
  return (
    <section className="login-block">
      <div className="container">
        <div className="row ">
          <div className="col login-sec">
            <h2 className="text-center">Login Now</h2>
            <form onSubmit={handleSubmit} className="login-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputemail1" className="text-uppercase">
                  Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  onChange={handleInput}
                  name="name"
                  id=""
                  placeholder="name"
                />
                {error.name.required ? (
                  <span className="text-danger">Name is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className="text-uppercase"
                >
                  Password
                </label>
                <input
                  className="form-control"
                  onChange={handleInput}
                  type="password"
                  name="password"
                  placeholder="password"
                  id=""
                />
                {error.password.required ? (
                  <span className="text-danger">Password is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
                <span className="text-danger">
                  {error.custom_error ? <p>Custom Error Message!</p> : null}
                </span>
                <input
                  type="submit"
                  className="btn btn-login float-right"
                  value="Login"
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Create new account ? Please <a href="#">Register</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
