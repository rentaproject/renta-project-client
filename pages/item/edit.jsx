/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "layout/main";
import styles from "styles/addItem.module.css";
import Image from "next/image";
import InputVehicel1 from "components/inputVehicle/inputVehicle1";
import InputVehicle2 from "components/inputVehicle/inputVehicle2";
import BtnPayment from "components/BtnPayment/index.jsx";
import defaultItem from "public/defaultPhotoItem.png";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleById } from "stores/action/vehicle";
import InputVehicle from "components/inputVehicle/inputVehicle1";
import axios from "utilities/axiosClient";

export default function Add2() {
  const dispatch = useDispatch();
  const dataVehicle = useSelector((state) => state.vehicle.dataVehicle[0]);
  const id = "e608f4a7-7488-4a2f-8c64-a6f29429bf7b";
  const [searchLocations, setsearchLocations] = useState("");
  const [textCategory, settextCategory] = useState();
  const [dropdowncategory, setdropdowncategory] = useState(0);
  const [newImage1, setNewImage1] = useState({});
  const [newImage2, setNewImage2] = useState({});
  const [newImage3, setNewImage3] = useState({});
  const [imagePreview1, setImagePreview1] = useState("");
  const [imagePreview2, setImagePreview2] = useState("");
  const [imagePreview3, setImagePreview3] = useState("");
  const lengthImage1 = Object.keys(newImage1).length;
  const lengthImage2 = Object.keys(newImage2).length;
  const lengthImage3 = Object.keys(newImage3).length;
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});

  console.log(data.image1);

  useEffect(() => {
    getDataVehicle();
    getDataCategory();
  }, []);
  console.log(data);
  console.log(dataVehicle);

  const getDataVehicle = () => {
    dispatch(getVehicleById(id))
      .then((response) => {
        setData(response.value.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const getDataCategory = async () => {
    try {
      const result = await axios.get("/api/category");
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const inputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleInputImage1 = (e) => {
    const { name, files } = e.target;
    setNewImage1({ [name]: files[0] });
    setImagePreview1(URL.createObjectURL(files[0]));
  };

  const handleInputImage2 = (e) => {
    const { name, files } = e.target;
    setNewImage2({ [name]: files[0] });
    setImagePreview2(URL.createObjectURL(files[0]));
  };
  const handleInputImage3 = (e) => {
    const { name, files } = e.target;
    setNewImage3({ [name]: files[0] });
    setImagePreview3(URL.createObjectURL(files[0]));
  };

  const handleUpdateImage = () => {
    const imageData = new FormData();
    imageData.append("image1", newImage1.image);
    imageData.append("image2", newImage1.image);
    imageData.append("image3", newImage1.image);
    axios
      .patch(`/api/vehicle/${data.vehicleId}`, imageData)
      .then((response) => {
        alert(response.value.data.msg);
      })
      .catch((error) => alert(error.response.data.msg));
  };
  const handleUpdataItem = async () => {
    try {
      await axios.patch(`/api/vehicle/${data.vehicleId}`, data);
      handleUpdateImage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mb-5 pb-5">
        <div className="d-flex align-item-center mt-3 mb-lg-5 mb-md-4 mb-4">
          <button
            className="btn px-1 py-0 me-2 button-update-profile"
            onClick={() => router.back()}
          >
            <i className="bi bi-chevron-left fw-bold"></i>
          </button>
          <span className="fw-bold d-block ms-3">Add new item</span>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <InputVehicel1
              className={styles.input}
              type="text"
              name="name"
              value={data.name}
              placeholder="Name (max up to 50 words)"
              onChange={inputData}
            />

            <label htmlFor="image1" className={styles.cam}>
              <div className={styles.cam}>
                <Image
                  className=""
                  src={
                    lengthImage1 > 0
                      ? imagePreview1
                      : data.image
                      ? process.env.URL_CLOUDINARY + `${data.image1}`
                      : defaultItem
                  }
                  alt="itempicture"
                  width={30}
                  height={30}
                  objectFit="cover"
                />
              </div>
              <input
                onChange={handleInputImage1}
                className="d-none"
                type="file"
                name="image1"
                id="image1"
              />
            </label>

            <div className="row  mt-3">
              <div className="col-12 col-md-12 col-lg-6 text-center">
                <label htmlFor="image2">
                  <div className={styles.subcam}>
                    <Image
                      className=""
                      src={
                        lengthImage2 > 0
                          ? imagePreview2
                          : data.image
                          ? process.env.URL_CLOUDINARY + `${data.image2}`
                          : defaultItem
                      }
                      alt="itempicture"
                      width={30}
                      height={30}
                      objectFit="cover"
                    />
                  </div>
                  <input
                    onChange={handleInputImage2}
                    className="d-none"
                    type="file"
                    name="image2"
                    id="image2"
                  />
                </label>
              </div>
              <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0 text-center">
                <label htmlFor="image3">
                  <div className={styles.subcam}>
                    <Image
                      className=""
                      src={
                        lengthImage3 > 0
                          ? imagePreview3
                          : data.image
                          ? process.env.URL_CLOUDINARY + `${data.image3}`
                          : defaultItem
                      }
                      alt="itempicture"
                      width={30}
                      height={30}
                      objectFit="cover"
                    />
                  </div>
                  <input
                    onChange={handleInputImage3}
                    className="d-none"
                    type="file"
                    name="image3"
                    id="image3"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <input
              className={styles.input}
              type="text"
              name="locationName"
              placeholder="Locations"
              value={data.locationName}
              onChange={inputData}
            />

            <InputVehicle
              onChange={inputData}
              type="text"
              name="description"
              value={data.description}
              placeholder="Description (max up to 150 words)"
            />
            <InputVehicle2
              onChange={inputData}
              name="price"
              type="text"
              placeholder="Type the price"
              title="Price : "
              value={data.price}
            />
            <span className={styles.inputTitle}>Status :</span>

            <div className="row mt-3">
              <div className="col-12 col-md-6 col-lg-6">
                <select
                  className={styles.status}
                  aria-label=".form-select-md fs-6 example"
                >
                  <option selected>
                    <BtnPayment
                      onClick={() => handleCategory()}
                      text={textCategory ? textCategory : "Select Status"}
                      className={styles.status}
                    />
                  </option>
                  <option value="1">Available</option>
                  <option value="2">Full Booked</option>
                </select>

                <div className={styles.dropdowncategory}></div>
              </div>
            </div>

            <InputVehicle2
              onChange={inputData}
              name="stock"
              type="text"
              placeholder="Insert stock"
              title="Stock : "
              value={data.stock}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-md-6 col-lg-6">
            <BtnPayment
              onClick={() => handleCategory()}
              text={textCategory ? textCategory : "Add item to"}
              className="w-100 bg-black"
            />
            {dropdowncategory === 1 && (
              <div className={styles.dropdowncategory}>
                <div
                  className={styles.dropmenu}
                  onClick={() => setdropdowncategory(0)}
                >
                  <span className={styles.category}>
                    <b>Choose Category</b>
                  </span>
                </div>
                {types &&
                  types.map((type, index) => (
                    <div
                      key={index}
                      onClick={(e) => changetype(e)}
                      className={styles.dropmenu}
                    >
                      <span id={type.type_id} className={styles.category}>
                        {type.type_name}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
            <BtnPayment
              onClick={handleUpdataItem}
              text="Save"
              className="w-100 bg-orange"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
