import React, { useState, useRef, useEffect } from "react";
import "./navigationBar.scss";
import logo from "../../assets/logo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import circleDp from "../../assets/man-in-suit-and-tie.png";

function NavigationBar() {
  const [searchItems, setSearchItems] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [border, setBorder] = useState({
    borderRadius: "0.8rem 0rem 0rem 0.8rem",
  });

  const [search, setSearch] = useState();

  const searchbarActivated = (e) => {
    const { value } = e.target;
    if (value.length > 0) {
      setSearch(value);
      setBorder({ borderRadius: "0.8rem 0rem 0rem 0rem " });
    } else {
      setSearch(null);
      setBorder({ borderRadius: "0.8rem 0rem 0rem 0.8rem" });
    }
  };
  const navigate = useNavigate();

  const onClickDiv = (e, index) => {
    navigate("/user/view/" + searchItems[index].name);
  };

  const onSearchListClick = (e) => {};

  const searchUrl = "http://localhost:9090/user/search/";

  useEffect(() => {
    axios.get(searchUrl + search).then((e) => {
      console.log(e.data);
      setSearchItems(e.data);
    });
  }, [search]);

  return (
    <div className="nav_main">
      <div className="logo_name">
        <div className="logo">
          <img src={logo} alt="logo" className="logo_img" />
        </div>
        <div className="name">SiaraWagen</div>
      </div>
      <div className="search-bar">
        <div className="search-bar-container">
          <div className="search-bar_search-items">
            <input
              placeholder="search"
              onChange={searchbarActivated}
              style={border}
            />

            {searchItems.length > 0 && (
              <div className="search_items">
                <ul>
                  {search !== null
                    ? searchItems.map((item, index) => (
                        <div
                          className="search-item"
                          id={index}
                          onClick={(e) => onClickDiv(e, index)}
                          key={index}
                        >
                          <li
                            key={index}
                            tabIndex={index}
                            defaultValue="No Cars Found"
                          >
                            {item.name}
                          </li>
                        </div>
                      ))
                    : ""}
                </ul>
              </div>
            )}
          </div>

          <button className="search-btn">search</button>
        </div>
      </div>

      {loggedIn ? (
        <div className="logged-in-circle">
          <div className="name">
            <h6>Falil</h6>
            </div>
          <div className="circle-div">
            <img src={circleDp} />
          </div>
          <div className="logout-btn">
            <button>Logout</button>
          </div>
        </div>
      ) : (
        <div className="login_signup">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Signup</button>
        </div>
      )}

      {/* <div className="login_signup">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Signup</button>
      </div> */}
    </div>
  );
}

export default NavigationBar;
