import React, { useState } from "react";
import Vespa from "../../public/vespa.png";
import Image from "next/image.js";
import Modal from "react-bootstrap/Modal";
import axios from "../../utilities/axiosClient";
import moment from "moment";

export default function CardVehicle(props) {
  const [vehicleData, setVehicleData] = useState();
  console.log(props);
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `/api/reservation/${props.data.reservationId}`
      );
      // console.log(result.data.data);
      alert("succes");
    } catch (error) {
      alert(error);
    }
  };
  // console.log(props.data);
  return (
    <div>
      {/* modal */}
      <div className="row_topup row">
        <div className="col d-flex">
          {/* <div className="img_topup"> */}
          {/* <img
                    src="../../public/icon3.png"
                    alt=""
                    style={{ width: 20, height: 20 }}
                  /> */}
          {/* </div> */}
          <div className="icon_topup mt-1">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h6 className="modal_tittle">
                    Are you sure do you want to delete selected item?
                  </h6>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="group_button_modal me-2">
                  <button className="buttonyes" onClick={handleDelete}>
                    Yes
                  </button>
                  <button className="buttonno">No</button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      {/* end modal */}
      <div className="row history_card_vehicle">
        <div className="col">
          <div
            className="card history_card_vehicle"
            onClick={() => setShowDelete(!showDelete)}
          >
            {showDelete ? (
              <div className="col image d-flex gap-3">
                <Image
                  src={`${process.env.URL_CLOUDINARY}${props.data.image1}`}
                  width={197}
                  height={165}
                  style={{ borderRadius: 20 }}
                />
                <div className="flex-fill history_info_vehicle">
                  <h6>{props.data.name}</h6>
                  <h6>
                    {moment(props.data.startDate).format("YYYY-MM-DD")} &nbsp;
                    to &nbsp;
                    {moment(props.data.returnDate).format("YYYY-MM-DD")}
                  </h6>
                  <h6>Prepayment:Rp{props.data.price}</h6>
                  <h6 className="history_status">{props.data.status}</h6>
                </div>
                <div className="flex-fill mt-4">
                  <button className="history_button_del" onClick={handleShow}>
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="col image d-flex gap-3">
                <Image
                  src={`${process.env.URL_CLOUDINARY}${props.data.image1}`}
                  width={197}
                  height={165}
                  style={{ borderRadius: 20 }}
                />
                <div className="flex-fill history_info_vehicle">
                  <h6>{props.data.name}</h6>
                  <h6>
                    {moment(props.data.startDate).format("YYYY-MM-DD")} &nbsp;
                    to &nbsp;
                    {moment(props.data.returnDate).format("YYYY-MM-DD")}
                  </h6>
                  <h6>Prepayment:Rp {props.data.price}</h6>
                  <h6 className="history_status">{props.data.status}</h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
