import React from "react";
import Image from "next/image";
import defaultImage from "../../public/defaultAvatar.png";
import moment from "moment";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer";

export default function Profile() {
  const isError = true;
  const message = true;
  const personalInfos = [
    {
      name: "Email Adress",
      value: "user@gmail.com",
      destination: "/profile/update-profile",
    },
    {
      name: "Adress",
      value: "Lampung",
      destination: "/profile/update-profile",
    },
    { name: "Mobile Number", value: "087675868", destination: "" },
  ];

  const identity = [
    {
      name: "Name",
      value: "Ahmad Dhohir",
      type: "text",
      id: "myDate",
    },
    {
      name: "Birthday",
      value: moment("2001-12-12").format("YYYY-MM-DD"),
      type: "date",
      id: "myDate",
    },
  ];
  let gender = "checked";
  return (
    <>
      <Header />
      <div
        className="container  shadow  position-relative  mt-5 mb-5"
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
            className="d-inline-block mb-2"
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
          <h2 className="fs-4 fw-bold mt-0">Bakso</h2>
          <p className="opacity-75 mb-0">user@gmail</p>
          <p className="opacity-75 mb-0">0857674479</p>
          <p className="opacity-75 mb-0">Has been active since 2013</p>
          <div className="d-flex mt-5 gap-5 text-start">
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
          {personalInfos.map((info, index) => (
            <div
              className="  mb-1 d-flex justify-content-between align-items-center border-bottom ms-5 me-5"
              key={index}
            >
              <div>
                <p className="opacity-75 fs-7 mb-1 ">{info.name}</p>
                <input className="fw-bold mb-2 border-0" value={info.value} />
              </div>
            </div>
          ))}
          <p className="fw-bold mt-4 ms-5 me-5">Identity</p>
          <div className="d-flex justify-content-center ms-5 me-5 gap-5 ">
            {identity.map((info, index) => (
              <div className=" mb-1  w-50 border-bottom" key={index}>
                <div>
                  <p className="opacity-75 fs-7 mb-1 ">{info.name}</p>
                  <input
                    className="fw-bold mb-2 border-0"
                    type={info.type}
                    value={info.value}
                    id={info.id}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5 ms-5 me-5">
          <button
            className="btn btn-warning shadow me-auto p-3"
            style={{ width: "32%" }}
          >
            Save Change
          </button>
          <button className="btn  btn-dark shadow" style={{ width: "32%" }}>
            Edit Password
          </button>
          <button
            className="btn btn-light  shadow ms-auto "
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
