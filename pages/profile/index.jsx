import React, { useState } from "react";
import Image from "next/image";
import defaultImage from "../../public/defaultAvatar.png";
import moment from "moment";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer";

export default function Profile() {
  const isError = true;
  const message = true;

  const dataUser = { name };

  const user = {
    name: "ari",
    mobileNumber: "08888",
    birthDay: moment("2001-12-12").format("YYYY-MM-DD"),
    email: "user1@gmail.com",
    adress: "Lampung",
  };

  const { name, mobileNumber, birthDay, email, adress } = user;
  const [form, setForm] = useState({
    name,
    mobileNumber,
    birthDay,
    email,
    adress,
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  let gender = "checked";

  return (
    <>
      <Header />
      <div
        className="container shadow  position-relative  mt-5 mb-5 fs=profile"
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
        <div className="bg-white  p-4 p-md-5 h-100 d-flex flex-column justify-content-center align-items-center position-relative">
          <div
            className="d-inline-block mb-2 img-profile"
            style={{ width: "20%", height: "20%", borderRadius: "50%" }}
          >
            <Image
              src={defaultImage}
              alt="profile picture"
              width={220}
              height={220}
              objectFit="cover"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <button
            className="btn py-0 mb-0"
            data-bs-toggle="modal"
            data-bs-target="#editImageModal"
          >
            <i className="bi bi-pen opacity-75 fs-7 me-2 mb-0"></i>
            Edit
          </button>
        </div>
        <div className="bg-white r h-100 d-flex flex-column justify-content-center align-items-center position-relative">
          <h2 className="  fw-bold mt-0">Bakso</h2>
          <p className="opacity-75 mb-0 fs-profile">user@gmail</p>
          <p className="opacity-75 mb-0 fs-profile">0857674479</p>
          <p className="opacity-75 mb-0 fs-profile">
            Has been active since 2013
          </p>
          <div className="d-flex mt-4 mb-3 gap-5 text-start">
            <div class="form-check ms-5 me-5">
              <input
                class="form-check-input "
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>
            <div class="form-check ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                gender
              />
              <label class="form-check-label" for="flexRadioDefault2">
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
                value={form.email}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div>
              <p className="opacity-75 fs-7 mb-1  mt-3">Adress</p>
              <input
                type="text"
                className="form-control ps-0"
                id=""
                name="adress"
                placeholder="Email Adress"
                value={form.adress}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div>
              <p className="opacity-75 fs-7 mb-1  mt-3">Mobile Number</p>
              <input
                type="text"
                className="form-control ps-0"
                id=""
                name="mobileNumber"
                placeholder="Mobile Number"
                value={form.mobileNumber}
                onChange={handleChangeForm}
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
              placeholder="name"
              value={form.name}
              onChange={handleChangeForm}
              required
            />

            <input
              type="date"
              className="form-control "
              id="mobileNumber"
              name="birthDay"
              placeholder="mobileNumber"
              value={form.birthDay}
              onChange={handleChangeForm}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5 ms-5 fs-5 me-5">
          <button
            className="btn btn-warning btn-profile  shadow me-auto "
            style={{ width: "32%" }}
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
                <button type="submit" className="btn btn-primary px-4">
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
