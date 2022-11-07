import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "layout/main";
import defaultItem from "../../public/defaultPhotoItem.png";
import styles from "styles/addItem.module.css";

export default function Additem() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formImage, setFormImage] = useState({
    image: null,
  });
  useEffect(() => {
    if (!selectedFile) {
      setPreview(preview);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [preview, selectedFile]);

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setFormImage({ ...formImage, image: e.target.files[0] });
  };

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
                    <Image
                      className=""
                      src={preview ? preview : defaultItem}
                      alt="itempicture"
                      width={30}
                      height={30}
                      objectFit="cover"
                    />
                    <br />
                    Click to add image
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="formfile"
                    class="inputfile"
                    onChange={handleSelectFile}
                  />
                </div>
              </div>
              <div className="d-flex justify-conten-center gap-2">
                <div
                  className="text-center  p-5 mx-auto bg-light mt-2 my-auto pt-md-5 pb-md-5 "
                  style={{ height: "100%", width: "50%" }}
                >
                  <label className="labela-add-item" for="formfile">
                    <Image
                      className=""
                      src={preview ? preview : defaultItem}
                      alt="itempicture"
                      width={30}
                      height={30}
                      objectFit="cover"
                    />
                    <br />
                    Click to add image
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="formfile"
                    class="inputfile"
                    onChange={handleSelectFile}
                  />
                </div>
                <div
                  className="text-center  p-5 mx-auto bg-light mt-2 my-auto pt-md-5 pb-md-5 "
                  style={{ height: "50%", width: "50%" }}
                >
                  <label className="labela-add-item" for="formfile">
                    <i
                      className="bi bi-plus "
                      style={{ height: "50%", width: "50%" }}
                    ></i>
                    <br />
                    Add more
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="formfile"
                    class="inputfile"
                    onChange={handleSelectFile}
                  />
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
