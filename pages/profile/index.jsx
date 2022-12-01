import React, { useState, useEffect } from "react";
import Image from "next/image";
import defaultImage from "../../public/defaultAvatar.png";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataUserById,
  updateDataUser,
  updateUserImage,
} from "stores/action/user";

export default function Profile() {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.data[0]);
  const [gender, setGender] = useState(dataUser?.gneder);
  console.log(dataUser);
  const userId = Cookies.get("userId");
  const [data, setData] = useState({ dataUser });
  console.log(data);
  const [newImage, setNewImage] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const lengthImage = Object.keys(newImage).length;
  const [show, setShow] = useState(false);
  const isError = true;
  const message = true;

  useEffect(() => {
    getDataUser();
  }, []);
  console.log(data);

  const getDataUser = () => {
    dispatch(getDataUserById(userId)).then((response) => {
      setData(response.value.data.data[0]);
    });
  };
  const dateOfBirth = data.dateOfBirth?.split("T")[0];
  console.log(dataUser?.image);

  const { name, mobileNumber, email } = data;

  const inputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setGender(value.gender);
    setShow(true);
  };

  const handleUpdateDataUser = () => {
    dispatch(updateDataUser(userId, data)).then(() => {
      dispatch(getDataUserById(userId));
    });
  };

  const handleInputImage = (e) => {
    const { name, files } = e.target;
    setNewImage({ [name]: files[0] });
    setImagePreview(URL.createObjectURL(files[0]));
  };

  const handleUpdateImage = () => {
    const imageData = new FormData();
    imageData.append("image", newImage.image);
    dispatch(updateUserImage(userId, imageData))
      .then((response) => {
        alert(response.value.data.msg);
        dispatch(getDataUserById(userId));
      })
      .catch((error) => alert(error.response.data.msg));
  };

  return (
    <>
      <Header />
      <div
        className="container  position-relative  mb-5 fs-profile"
        style={{ padding: "5% ", borderRadius: "25px" }}
      >
        <div className="d-flex align-items-center mb-4 mb-md-3 ">
          <button
            className="btn px-1 py-0 me-2 button-update-profile"
            onClick={() => router.back()}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <h2 className="fs-5 fw-bold m-0">Profile</h2>
        </div>

        {imagePreview.length < 1 ? (
          <div className="bg-white  p-4 p-md-5 h-100 d-flex flex-column justify-content-center align-items-center position-relative">
            <div
              className="d-inline-block mb-2 img-profile"
              style={{ width: "20%", height: "20%", borderRadius: "50%" }}
            >
              <img
                src={
                  lengthImage > 0
                    ? imagePreview
                    : data.image
                    ? process.env.URL_CLOUDINARY + `${dataUser?.image}`
                    : defaultImage
                }
                alt="profile picture"
                width={220}
                height={220}
                objectFit="cover"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="text-center mb-3">
              <label className="border-0 bg-transparent" htmlFor="image">
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="d-none"
                  onChange={handleInputImage}
                />
                <div className="d-flex align-items-center color-gray gap-2">
                  <i className="bi bi-pen opacity-75 fs-7 me-2 mb-0"></i>
                  Edit
                </div>
              </label>
            </div>
          </div>
        ) : (
          <div className="bg-white  p-4 p-md-5 h-100 d-flex flex-column justify-content-center align-items-center position-relative">
            <div
              className="d-inline-block mb-2 img-profile"
              style={{ width: "20%", height: "20%", borderRadius: "50%" }}
            >
              <Image
                src={
                  lengthImage > 0
                    ? imagePreview
                    : data.image
                    ? `${URL_CLOUDINARY$}${dataUser.image}`
                    : defaultImage
                }
                alt="profile picture"
                width={220}
                height={220}
                objectFit="cover"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-danger px-4"
                data-bs-toggle="modal"
                data-bs-target="#confirmDeleteModal"
              >
                Delete
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4 "
                onClick={handleUpdateImage}
              >
                Update
              </button>
            </div>
          </div>
        )}

        <div className=" container bg-white  r h-100 d-flex flex-column justify-content-center align-items-center position-relative  ">
          <h2 className="  fw-bold mt-0">{name}</h2>
          <p className="opacity-75 mb-0 fs-profile">{email}</p>
          <p className="opacity-75 mb-0 fs-profile">{mobileNumber}</p>
          <p className="opacity-75 mb-0 fs-profile">
            Has been active since 2013
          </p>
          <div className="d-flex mt-4 mb-3 gap-5 text-start">
            <div className="form-check ms-5 me-5">
              <input
                className="form-check-input "
                type="radio"
                value={"male"}
                checked={dataUser?.gender == "male" ? true : false}
                name="gender"
                id="flexRadioDefault1"
                onChange={inputData}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>
            <div className="form-check ms-3">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value={"female"}
                onChange={inputData}
                id="flexRadioDefault2"
                checked={dataUser?.gender == "female" ? true : false}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                Female
              </label>
            </div>
          </div>
        </div>
        <div>
          <p className="  mb-3 me-2 ms-2 ms-5 me-5 fw-bold">Contacts</p>

          <div className="  mb-1 align-items-center  ms-5 me-5">
            <div>
              <p className="opacity-75 fs-7 mb-1  ">Email Adress</p>
              <input
                type="text"
                className="form-control ps-0"
                id=""
                name="email"
                placeholder="Email Adress"
                value={data.email ? data.email : ""}
                onChange={inputData}
                required
              />
            </div>
            <div>
              <p className="opacity-75 fs-7 mb-1  mt-3">Adress</p>
              <input
                type="text"
                className="form-control ps-0"
                id=""
                name="address"
                placeholder="Input Adress"
                value={data.address ? data.address : ""}
                onChange={inputData}
                required
              />
            </div>
            <div>
              <p className="opacity-75 fs-7 mb-1  mt-3">Mobile Number</p>
              <input
                type="text"
                className="form-control ps-0"
                id=""
                name="phoneNumber"
                placeholder="Input Mobile Number"
                value={data?.phoneNumber}
                onChange={inputData}
                required
              />
            </div>
          </div>

          <p className="fw-bold mt-4 ms-5 me-5">Identity</p>
          <div className="d-flex justify-content-center ms-5 me-5 gap-5">
            <p className="opacity-75 fs-7 mb-1  mt-3 me-auto ">Name</p>
            <p className="opacity-75 fs-7 mb-1   mt-3 me-auto ms-5">DD/MM/YY</p>
          </div>

          <div className="d-flex justify-content-center ms-5 me-5 gap-5 ">
            <input
              type="text"
              className="form-control ps-0 "
              id="name"
              name="name"
              placeholder="Input Name"
              value={data.name ? data.name : ""}
              onChange={inputData}
              required
            />

            <input
              type="date"
              className="form-control "
              id="mobileNumber"
              name="dateOfBirth"
              value={data.dateOfBirth ? dateOfBirth : ""}
              onChange={inputData}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5 ms-5 fs-5 me-5">
          <button
            className="btn btn-warning btn-profile  shadow me-auto "
            style={{ width: "32%" }}
            onClick={handleUpdateDataUser}
          >
            Save Change
          </button>
          <button
            className="btn  btn-dark shadow btn-profile fs-sm-6"
            style={{ width: "32%" }}
          >
            Edit Password
          </button>
          <button
            className="btn btn-light  shadow ms-auto btn-profile fs-sm-5"
            style={{ width: "32%" }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Edit Profile Image Modal */}
      <div
        className="modal fade"
        id="editImageModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editImageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="editImageModalLabel">
                Update Profile Image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body text-center">
                <label
                  htmlFor="formFile"
                  className="form-label update-image-input d-inline-block mb-0 position-relative"
                >
                  <Image
                    src={defaultImage}
                    alt="profile image preview"
                    width={120}
                    height={120}
                    objectFit="cover"
                    style={{ borderRadius: "16px" }}
                  />
                  <div className="update-image__overlay position-absolute top-0 start-0 justify-content-center align-items-center">
                    <span className="text-white fw-semibold align-middle d-block">
                      Upload
                      <br />
                      image
                    </span>
                  </div>
                </label>
                <input
                  className="form-control visually-hidden"
                  type="file"
                  id="formFile"
                  name="image"
                  onChange={handleInputImage}
                />
              </div>
              {message ? (
                isError ? (
                  <p className="text-danger text-center mb-0">{message}</p>
                ) : (
                  <p className="text-success text-center mb-0">{message}</p>
                )
              ) : null}
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-danger px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-4 "
                  onClick={handleUpdateImage}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="confirmDeleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="confirmDeleteModalLabel">
                <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">Are you sure to delete your profile image?</p>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-primary px-4"
                data-bs-toggle="modal"
                data-bs-target="#editImageModal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-danger px-4"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
