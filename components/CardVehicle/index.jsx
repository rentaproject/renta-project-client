import React, { useState } from "react";
import Vespa from "../../public/vespa.png";
import Image from "next/image.js";
import Modal from "react-bootstrap/Modal";

export default function CardVehicle(props) {
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(props.data);
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
                  <button className="buttonyes">Yes</button>
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
                <Image src={Vespa} alt="" style={{ width: 100, height: 50 }} />
                <div className="flex-fill history_info_vehicle">
                  <h6>{props.data.name}</h6>
                  <h6>
                    {props.data.satrtDate}to{props.data.returnDate}
                  </h6>
                  <h6>Prepayment:Rp P{props.data.price}</h6>
                  <h6 className="history_status">
                    Has Been returned{props.data.status}
                  </h6>
                </div>
                <div className="flex-fill mt-4">
                  <button className="history_button_del" onClick={handleShow}>
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="col image d-flex gap-3">
                <Image src={Vespa} alt="" style={{ width: 100, heiht: 50 }} />
                <div className="flex-fill history_info_vehicle">
                  <h6>{props.data.name}</h6>
                  <h6>
                    {props.data.satrtDate}to{props.data.returnDate}
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
