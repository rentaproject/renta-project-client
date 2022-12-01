import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer";
import CardVehicle from "../../components/CardVehicle";
import Image from "next/image.js";
import Lambo from "../../public/lambo.png";
import Jeep from "../../public/jeep.png";
import Rowdown from "../../public/rowdown.png";
import Vector from "../../public/Vector2.png";
import axios from "../../utilities/axiosClient";
import Cookies from "js-cookie";

export default function HistoryUser() {
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [datahistory, setDataHistory] = useState([]);
  const [keyword, setKeyword] = useState("");
  // console.log(datahistory);
  const userid = Cookies.get("userId");
  useEffect(() => {
    getDataHistory();
  }, []);
  useEffect(() => {
    getDataHistory();
  }, [keyword]);
  const getDataHistory = async () => {
    try {
      const result = await axios.get(
        `/api/reservation/user/${userid}?keyword=${keyword}`
      );
      // console.log(result.data.data);
      setDataHistory(result.data.data);
      // alert("succes");
    } catch (error) {
      // alert(error);
      console.log(error.response);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid history_container">
        <div className="row">
          <div className="leftside col col-md-8">
            {/* start search */}
            <div className="history_search d-flex mt-3">
              <input
                className="form-control form-control__history me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              ></input>
              {/* input filter */}
              <div className="history_filter">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
              {/* input filter */}
            </div>
            {/* end search */}
            {/* modal delete */}

            {/* end modal delete */}
            <div className="history_main">
              <div className="row history_phone_">History Order</div>
              <div className="row history_tittle">Today</div>
              <div className="row history_row_one">
                <div className="col col-md-8">
                  <h6 className="history_message">
                    Please Finish your payment for vespa for Vespa Rental Jogja
                  </h6>
                  <hr />
                </div>
                <div className="col col-md-2 ">
                  <Image
                    src={Vector}
                    alt=""
                    style={{ width: 10, height: 15 }}
                  />
                </div>
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    ></label>
                  </div>
                </div>
              </div>
              {/* row 2 */}
              <div className="row history_row_two">
                <div className="col col-md-8">
                  <h6 className="history_message">
                    Your Payment has been confirmed
                  </h6>
                  <hr />
                </div>
                <div className="col col-md-2">
                  <Image
                    src={Vector}
                    alt=""
                    style={{ width: 10, height: 15 }}
                  />
                </div>
                <div className="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    ></label>
                  </div>
                </div>
              </div>
              {/* row 3 */}
              <div className="row history_tittle_2 row-3">A Week ago</div>
              {datahistory.length > 0 ? (
                datahistory.map((item) => (
                  <div key={item.id}>
                    <CardVehicle data={item} />
                  </div>
                ))
              ) : (
                <div>
                  <span>Data Not Found !</span>
                </div>
              )}

              {/* end row 3 */}
              {/* card 2 */}

              {/* end card 2 */}
            </div>
          </div>
          <div className="rightside col col-md-4">
            <div className="card histoycrd justify-content-center">
              <h5 className="card_right_tittle">New Arrival</h5>
              <div className="new_arrival_img mb-3">
                <div className="card_arrival">
                  {/* <div className="overlay"> */}
                  <Image
                    src={Lambo}
                    alt=""
                    style={{ width: 286, height: 360 }}
                  />
                  {/* </div> */}
                  <div className="card_text card">
                    <h6>Lamborghini</h6>
                    <h6>South Jakarta</h6>
                  </div>
                </div>
              </div>
              <div className="new_arrival_img">
                <div className="card_arrival">
                  {/* <div className="overlay"> */}
                  <Image
                    src={Jeep}
                    alt=""
                    style={{ width: 286, height: 360 }}
                  />
                  {/* </div> */}
                  <div className="card_text card">
                    <h6>White Jeep</h6>
                    <h6>Kalimantan</h6>
                  </div>
                </div>
              </div>
              <div className="history_more_button">
                <h6>View More</h6>
                <div className="history_row_icon">
                  <Image
                    src={Rowdown}
                    alt=""
                    style={{ width: 43, height: 22 }}
                  />
                </div>
              </div>
            </div>
            {/* <div className="card histoycrd"> */}

            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
