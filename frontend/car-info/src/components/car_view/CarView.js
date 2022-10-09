import { React, useEffect, useState } from "react";
import "./carView.scss";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import ImageGallery from "react-image-gallery";
import Placeholder from "react-bootstrap/Placeholder";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BiGasPump } from "react-icons/bi";
import { TbEngine } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import BootSpaceIcon from "../../assets/car-boot-space.png";
import StarEmoji from "../../assets/star.png";
import SilentEmoji from "../../assets/silent.png";
import { Rating } from "react-simple-star-rating";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

function CarView() {
  const [carName, setCarName] = useState("");
  const [company, setCompany] = useState();
  const [fuelType, setFuelType] = useState();
  const [powerSteering, setPowerSteering] = useState();
  const [brakeSystem, setBrakeSystem] = useState();
  const [showroomPrice, setShowroomPrice] = useState();
  const [onRoadPrice, setOnRoadPrice] = useState();
  const [mileage, setMileage] = useState();
  const [seatingCapacity, setSeatingCapacity] = useState();
  const [engineCapacity, setEngineCapacity] = useState();
  const [gearType, setGearType] = useState();
  const [bhp, setBhp] = useState();
  const [bootSpace, setBootSpace] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [rating, setRating] = useState(3);
  const [prosList, setProsList] = useState([""]);
  const [consList, setConsList] = useState([""]);
  const [faqList, setFaqList] = useState([""]);
  const [imageUrl, setImageUrl] = useState([]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const noImage = [
    {
      original:
        "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=",
      thumbnail:
        "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=",
    },
  ];

  let { item } = useParams();

  const primaryUrl = "http://localhost:9090/user/name/" + item;

  useEffect(() => {
    axios.get(primaryUrl).then((e) => {
      console.log(e.data.allCarDetails[0]);
      const data = e.data.allCarDetails[0];
      setBhp(data.bhp);
      setBootSpace(data.bootSpace);
      setBrakeSystem(data.brakeSystem);
      setCompany(data.company);
      setConsList(data.consList);
      setEngineCapacity(data.engineCapacity);
      setFaqList(data.faqList);
      setFuelType(data.fuelType);
      setGearType(data.gearType);
      setImageUrl(data.imageURL);
      setMileage(data.mileage);
      setCarName(data.name);
      setOnRoadPrice(data.onRoadPrice);
      setPowerSteering(data.powerSteering);
      setProsList(data.prosList);
      setSeatingCapacity(data.seatingCapacity);
      setShowroomPrice(data.showroomPrice.toString());
      setVideoUrl(data.videoUrl);
    });
  }, []);

  return (
    <div className="car_view_main">
      {/* <div className="main"> */}
      <div className="top">
        <div className="name_review">
          <div className="name">
            <h3>{company + " " + carName}</h3>
          </div>
          <div className="review">
            <Rating
              className="rating"
              size="1.5rem"
              readonly={true}
              initialValue={3}
              fillColor="#f5eb0c"
            />
            <p className="review-count">{rating}</p>
            <h3 className="write_review">Write a review</h3>
          </div>
        </div>
        <div className="overview">
          <div className="image-gallery">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              className="carsosel-gallery"
            >
              {imageUrl.map((item) => (
                <Carousel.Item className="carosel-item">
                  <img
                    // className="d-block w-100"
                    className="d-block"
                    src={item.imageUrl}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="right-side-overview">
            <div className="version_city">
              <div className="version">
                <div className="version-title_type">
                  <h4>Version</h4>
                  <h6>LXi</h6>
                </div>
                <div className="expand-icon">
                  <AiOutlineRight />
                </div>
              </div>
              <div className="city">
                <div className="city-title_city-name">
                  <h4>City</h4>
                  <h6>Chennai</h6>
                </div>
                <div className="expand-icon">
                  <AiOutlineRight />
                </div>
              </div>
            </div>
            <div className="price">
              <h2>{"₹ " + showroomPrice + ".00" + " Lakh"}</h2>

              {console.log("ShowRoomPrice " + typeof showroomPrice)}
              <p>*Ex-showroom price, Chennai</p>
            </div>
          </div>
        </div>
      </div>
      <div className="key-specs">
        <div className="title">
          <h3>{"Key Specs of  " + carName}</h3>
        </div>
        <div className="specs">
          <div className="mileage">
            <BiGasPump />
            <p>Mileage(upto)</p>
            <h6>{mileage + " Kmpl"}</h6>
          </div>
          <div className="engine">
            <TbEngine />
            <p>Engine(upto)</p>
            <h6>{engineCapacity + " cc"} </h6>
          </div>
          <div className="bhp">
            <AiOutlineThunderbolt />
            <p>BHP</p>
            <h6>{bhp}</h6>
          </div>
          <div className="transmission">
            <GiGearStickPattern />
            <p>Transmission</p>
            <h6 style={{ fontSize: "0.9rem" }}>Manual/Automatic</h6>
          </div>
          <div className="seats">
            <MdAirlineSeatReclineExtra />
            <p>Seats</p>
            <h6>{seatingCapacity}</h6>
          </div>
          <div className="boot-space">
            <img src={BootSpaceIcon} className="boot-space-icon" />
            <p>Boot Space</p>
            <h6>{bootSpace}</h6>
          </div>
        </div>
      </div>

      <div className="video-review">
        <h3>Video Review</h3>
        <div className="video">
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div className="pros-cons-overview">
        <div className="title">
          <h3>Pros and cons of Maruti Brezza</h3>
        </div>
        <div className="pros-cons">
          <div className="pros">
            <div className="pros-card">
              <div className="happy-emoji">
                <img src={StarEmoji} alt="pros" />
              </div>
              <div className="list">
                <div className="title">
                  <h5>Good Things</h5>
                </div>
                <ul>
                  {prosList !== null
                    ? prosList.map((item, index) => <li key={index}>{item}</li>)
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="cons">
            {" "}
            <div className="cons-card">
              <div className="sad-emoji">
                <img src={SilentEmoji} alt="cons" />
              </div>
              <div className="list">
                <div className="title">
                  <h5>Could be Better</h5>
                </div>
                <ul>
                  {consList !== null
                    ? consList.map((item, index) => <li key={index}>{item}</li>)
                    : ""}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="faq">
        <h3>Freqently Asked Question</h3>
        <Accordion className="accordion">
          {faqList !== null
            ? faqList.map((item, index) => (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              ))
            : ""}
        </Accordion>
      </div>
    </div>
  );
}

export default CarView;
