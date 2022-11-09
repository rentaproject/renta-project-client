import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "layout/main";
import defaultItem from "../../public/defaultPhotoItem.png";
import styles from "styles/addItem.module.css";
import { Toast, ToastContainer } from "react-bootstrap";
import axios from "utilities/axiosClient";
export default function Additem() {
  const [formImage, setFormImage] = useState();
  const [formImage2, setFormImage2] = useState();
  const [formImage3, setFormImage3] = useState();
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [formItem, setFormItem] = useState();
  const [succes, setSucces] = useState(false);
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleSelectFile = (e) => {
    const { name, files } = e.target;

    if (name === "image") {
      setFormImage({ ...formImage, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
    } else {
      setFormImage({ ...formImage, [name]: value });
    }
  };

  const handleSelectFile2 = (e) => {
    const { name, files } = e.target;

    if (name === "image") {
      setFormImage2({ ...formImage2, [name]: files[0] });
      setImage2(URL.createObjectURL(files[0]));
    } else {
      setFormImage2({ ...formImage2, [name]: value });
    }
  };
  const handleSelectFile3 = (e) => {
    const { name, files } = e.target;

    if (name === "image") {
      setFormImage3({ ...formImage3, [name]: files[0] });
      setImage3(URL.createObjectURL(files[0]));
    } else {
      setFormImage3({ ...formImage3, [name]: value });
    }
  };
  const addImage = {
    image1: formImage,
    image2: formImage2,
    image3: formImage3,
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormItem({ ...formItem, [name]: value });
    // console.log(e.target.value);
  };
  const handleAddItem = async () => {
    const form = { ...addImage, ...formItem };
    setLoading(true);
    try {
      console.log(form);
      const result = await axios.post("api/vehicle/", form);
      console.log(result);
      setSucces(true);
      // setLoading(false);
      setMsg("wkwk");
      setShowToast(true);
    } catch (error) {
      console.log(error);
      // setMsg(error.response.data.msg);
      setLoading(false);
      setShowToast(true);
    }
  };

  return (
    <>
      <Layout>
        <div
          className="container  shadow  position-relative  mt-5 mb-md-5  "
          style={{
            padding: "5% ",
            borderRadius: "25px",
            width: "70% ",
            fontSize: "75%",
          }}
        >
          <div className="d-flex align-items-center mb-4 mb-md-3 ">
            <button
              className="btn px-1 py-0 me-2 button-update-profile"
              onClick={() => router.back()}
            >
              <i className="bi bi-chevron-left fw-bold"></i>
            </button>
            <h2 className="fs-5 fw-bold m-0">Add New Item</h2>
          </div>
          <div className="row item-row">
            <div className="col-md-5 h-100  ">
              <div
                className=" bg-light  pt-5 pb-5 pe-md-5 ps-md-5 d-flex  justify-content-center"
                style={{ height: "100%", width: "100%" }}
              >
                <div
                  className="text-center mx-auto my-auto pt-md-5 pb-md-5 "
                  style={{ height: "100%", width: "100%" }}
                >
                  <label className="labela-add-item" for="formfile">
                    {image ? (
                      <img
                        className=""
                        src={image}
                        // src={defaultItem}
                        alt="itempicture"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        // width={1000}
                        // height={1000}
                        objectFit="cover"
                      />
                    ) : (
                      <>
                        {" "}
                        <Image
                          className=""
                          src={defaultItem}
                          // src={defaultItem}
                          alt="itempicture"
                          width={30}
                          height={30}
                          objectFit="cover"
                        />
                        <br />
                        Click to add image
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="formfile"
                    className="inputfile"
                    onChange={handleSelectFile}
                  />
                </div>
              </div>
              <div className="d-flex justify-conten-center gap-2">
                <div
                  className="text-center  p-5 mx-auto bg-light mt-2 my-auto pt-md-5 pb-md-5 "
                  style={{ height: "100%", width: "50%" }}
                >
                  <label className="labela-add-item" for="formfile2">
                    {image2 ? (
                      <img
                        className=""
                        src={image2}
                        // src={defaultItem}
                        alt="itempicture"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        // width={1000}
                        // height={1000}
                        objectFit="cover"
                      />
                    ) : (
                      <>
                        {" "}
                        <Image
                          className=""
                          src={defaultItem}
                          // src={defaultItem}
                          alt="itempicture"
                          width={30}
                          height={30}
                          objectFit="cover"
                        />
                        <br />
                        Click to add image
                      </>
                    )}
                  </label>
                  <input
                    name="image"
                    onChange={handleSelectFile2}
                    id="formfile2"
                    style={{ visibility: "hidden" }}
                    type="file"
                  />
                </div>
                <div
                  className="text-center  p-5 mx-auto bg-light mt-2 my-auto pt-md-5 pb-md-5 "
                  style={{ height: "100%", width: "50%" }}
                >
                  <label className="labela-add-item" for="formfile3">
                    {image3 ? (
                      <img
                        className=""
                        src={image3}
                        // src={defaultItem}
                        alt="itempicture"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        // width={1000}
                        // height={1000}
                        objectFit="cover"
                      />
                    ) : (
                      <>
                        {" "}
                        <Image
                          className=""
                          src={defaultItem}
                          // src={defaultItem}
                          alt="itempicture"
                          width={30}
                          height={30}
                          objectFit="cover"
                        />
                        <br />
                        Click to add image
                      </>
                    )}
                  </label>
                  <input
                    name="image"
                    onChange={handleSelectFile3}
                    id="formfile3"
                    style={{ visibility: "hidden" }}
                    type="file"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-5 h-100 mb-4 mb-md-0  text-start">
              <div className="  mb-1 d-flex  align-items-center border-bottom">
                <div>
                  <input
                    onChange={handleChangeForm}
                    className="form-control mb-2 border-0 from-control"
                    type="text"
                    placeholder="name"
                    name="name"
                  />
                </div>
              </div>
              <div className="  mb-1 d-flex  align-items-center border-bottom">
                <div>
                  <input
                    onChange={handleChangeForm}
                    className="form-control mb-2 border-0 from-control"
                    type="text"
                    placeholder="description"
                    name="description"
                  />
                </div>
              </div>

              <label htmlFor="" className="mt-2 fw-bold">
                Price:
              </label>
              <div className="input-group mb-3 ">
                <input
                  onChange={handleChangeForm}
                  type="text"
                  className="form-control bg-light"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  name="price"
                />
              </div>

              <select
                id="status"
                className="dropdown form-select form-select-md mb-3"
                onChange={handleChangeForm}
                name="status"
              >
                <option selected>Select Status</option>
                <option className="text-success">Available</option>
                <option className="text-danger">Full Booked</option>
              </select>
              <select
                id="status"
                className="dropdown form-select form-select-md mb-3"
                onChange={handleChangeForm}
                name="locationId"
              >
                <option selected>Select Location</option>
                <option value="c93af45c-1ed0-4271-b069-3d1ef2f45b25">
                  Jakarta
                </option>
                <option>Bandung</option>
                <option>Bogor</option>
              </select>
              <label htmlFor="" className="mt-2 mb-2 fw-bold gap-3">
                Stock:
                <input type="number" name="stock" onChange={handleChangeForm} />
              </label>
            </div>

            <div className="d-flex justify-content-center  mt-3 gap-2 ">
              <select
                className="form-select form-select-md mb-3 btn  shadow btn-dark  btn-sm rounded h-100 "
                style={{ width: "30%", fontSize: "100%" }}
                aria-label=".form-select-md fs-6 example"
                // id="typeId"
                onChange={handleChangeForm}
                name="typeId"
              >
                <option selected>Add Item To</option>
                <option value="19dff347-7bc6-4c3c-9ee4-cd16a4348fc8">
                  Cars
                </option>
                <option value="988f6f97-c232-47bd-bf7c-cb8a2db08874">
                  Motorbike
                </option>
                <option value="4832974c-feb8-4d46-ab40-5f0e90e3d343">
                  Bike
                </option>
              </select>
              <button
                className="btn  btn-warning shadow rounded ms-5 "
                style={{ width: "50%", fontSize: "100%" }}
                onClick={handleAddItem}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "save item"
                )}
              </button>
              <ToastContainer
                position="top-center"
                className="p-3 position-fixed toast-container"
              >
                <Toast
                  show={showToast}
                  onClose={() => {
                    setShowToast(false);
                  }}
                >
                  <Toast.Header>
                    <strong className="me-auto">
                      {succes === true ? "Success" : "failed"}
                    </strong>
                    <small className="text-muted">just now</small>
                  </Toast.Header>
                  <Toast.Body>{msg}</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
