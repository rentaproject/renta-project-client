import React from "react";
import Image from "next/image";
import Layout from "layout/main";
import defaultItem from "../../public/defaultPhotoItem.png";

export default function addItem() {
  const isError = true;
  const message = true;
  const form = [
    {
      name: "Name",
      type: "text",
    },
    {
      name: "Location",
      type: "text",
    },
    { name: "Description", type: "text" },
  ];

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setFormImage({ ...formImage, image: e.target.files[0] });
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
              <div className=" bg-light vh-50 w-60 pt-5 pb-5 pe-md-5 ps-md-5 d-flex  justify-content-center">
                <div className="d-inline">
                  <div
                    className="text-center mx-auto my-auto pt-md-5 pb-md-5 "
                    style={{ height: "20%", width: "20%" }}
                  >
                    <Image
                      className=""
                      src={defaultItem}
                      alt="itempicture"
                      width={200}
                      height={200}
                      objectFit="cover"
                    />
                  </div>
                  <input
                    className="form-control visually-hidden"
                    type="file"
                    id="formFile"
                    onChange={handleSelectFile}
                  />
                  Click to add image
                </div>
              </div>
            </div>

            <div className="col-md-5 h-100 mb-4 mb-md-0  text-start">
              {form.map((info, index) => (
                <div
                  className="  mb-1 d-flex  align-items-center border-bottom"
                  key={index}
                >
                  <div>
                    <input
                      className="form-control mb-2 border-0 from-control"
                      type={info.type}
                      placeholder={info.name}
                    />
                  </div>
                </div>
              ))}
              <label htmlFor="" className="mt-2 fw-bold">
                Price:
              </label>
              <div class="input-group mb-3 ">
                <input
                  type="text"
                  class="form-control bg-light"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <select
                class="form-select form-select-md mb-3"
                aria-label=".form-select-md fs-6 example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <label htmlFor="" className="mt-2 mb-2 fw-bold">
                Stock:
              </label>
            </div>

            <div className="d-flex justify-content-center  mt-3 gap-2 ">
              <select
                class="form-select form-select-md mb-3 btn  shadow btn-dark  btn-sm rounded h-100 "
                style={{ width: "30%", fontSize: "100%" }}
                aria-label=".form-select-md fs-6 example"
              >
                <option selected>Add Item To</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <button
                className="btn  btn-warning shadow rounded ms-5 "
                style={{ width: "50%", fontSize: "100%" }}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
