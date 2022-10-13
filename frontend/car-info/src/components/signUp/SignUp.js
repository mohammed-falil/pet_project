import { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const initialStateError = {
    name: { required: false },
    role: { required: false },
    password: { required: false },
    custom_error: null,
  };
  const [error, setError] = useState(initialStateError);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = initialStateError;
    let hasError = false;
    if (input.name.length === 0) {
      error.name.required = true;
      hasError = true;
    } else if (input.role.length === 0) {
      error.role.required = true;
      hasError = true;
    } else if (input.password.length === 0) {
      error.password.required = true;
      hasError = true;
    } else if (!hasError) {
      setLoading(true);
    }
    setError(error);
  };

  const [input, setInput] = useState({
    name: "",
    role: "",
    password: "",
  });

  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const signUpUrl = "http://localhost:9090/admin/signupAuthenticate";

  useEffect(() => {
    if (loading) {
      axios
        .post(signUpUrl, {
          username: input.name,
          password: input.password,
          role: input.role,
        })
        .then((response) => {
          if (!response.error) {
            sessionStorage.setItem("JWT", response.data.token);
            navigate("/admin/car-list");
          }
        });
    }
  }, [loading]);

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Register Now</h2>
            <form onSubmit={handleSubmit} className="register-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleInput}
                  name="name"
                  id="name"
                />
                {error.name.required ? (
                  <span className="text-danger">Name is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Role
                </label>

                <input
                  type="text"
                  className="form-control"
                  onChange={handleInput}
                  name="role"
                  id=""
                />
                {error.role.required ? (
                  <span className="text-danger">Role is required.</span>
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
                  type="password"
                  onChange={handleInput}
                  name="password"
                  id=""
                />
                {error.password.required ? (
                  <span className="text-danger">Password is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                <span className="text-danger">
                  {error.custom_error ? <p>{error.custom_error}</p> : null}
                </span>
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}

                <input
                  type="submit"
                  className="btn btn-login float-right"
                  disabled={loading}
                  value="Register"
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Already have account ? Please <a href="#">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
