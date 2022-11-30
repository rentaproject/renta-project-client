import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Layout from "layout/main";
import styles from "styles/addItem.module.css";
import InputVehicle1 from "components/inputVehicle/inputVehicle1";
import InputVehicle2 from "components/inputVehicle/inputVehicle2";
import BtnPayment from "components/BtnPayment/index.jsx";
import defaultItem from "public/defaultPhotoItem.png";
import swal from "sweetalert";
import axios from "utilities/axiosClient";
import { addVehicle } from "stores/action/vehicle";

export default function Add2() {
  const { push, back } = useRouter();
  const dataUser = useSelector((state) => state.user.data[0]);

  const dispatch = useDispatch();

  const [form, setform] = useState({
    locationId: "",
    typeId: "",
    name: "",
    price: "",
    status: "",
    stock: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    rentCount: 0,
  });
  const [types, setTypes] = useState();
  const [locations, setlocations] = useState();
  const [dropdowncategory, setdropdowncategory] = useState(0);
  const [textCategory, settextCategory] = useState("");
  const [textLocation, settextLocation] = useState("");
  const [status, setstatus] = useState("Select status");
  const [urlImage1, seturlImage1] = useState(defaultItem.src);
  const [urlImage2, seturlImage2] = useState(defaultItem.src);
  const [urlImage3, seturlImage3] = useState(defaultItem.src);
  const [locationId, setLocationId] = useState("");

  useEffect(() => {
    getTypes();
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(types);
  const getTypes = () => {
    axios
      .get(`/api/category`)
      .then((result) => {
        console.log(result);
        setTypes(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(locations);

  const getLocations = () => {
    axios
      .get(`api/location/`)
      .then((result) => {
        setlocations(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForm = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleImg = (e) => {
    const urlImage1 = URL.createObjectURL(e.target.files[0]);
    const urlImage2 = URL.createObjectURL(e.target.files[0]);
    const urlImage3 = URL.createObjectURL(e.target.files[0]);
    const inputId = e.target.id;
    if (inputId === "image1") {
      setform({
        ...form,
        image1: e.target.files[0],
      });
      seturlImage1(urlImage1);
    } else if (inputId === "image2") {
      setform({
        ...form,
        image2: e.target.files[0],
      });
      seturlImage2(urlImage2);
    } else {
      setform({
        ...form,
        image3: e.target.files[0],
      });
      seturlImage3(urlImage3);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    console.log(formData);

    dispatch(addVehicle(formData))
      .then((result) => {
        console.log(result.value.data.data[0]);
        swal(`${result.value.data.msg}`);
        push(`/item/edit/${result.value.data.data[0]?.vehicleId}`);
      })
      .catch((error) => console.log(error));
  };

  const handleCategory = () => {
    if (dropdowncategory === 0) {
      setdropdowncategory(1);
    } else {
      setdropdowncategory(0);
    }
  };

  const handleLocations = (e) => {
    settextLocation(e.target.value);
  };

  const changeStatus = (e) => {
    setstatus(e.target.textContent);
    setform({
      ...form,
      status: e.target.value,
    });
  };

  const changetype = (e) => {
    setform({
      ...form,
      typeId: e.target.id,
    });
    settextCategory(e.target.textContent);
    setdropdowncategory(0);
  };

  const changeLocations = (e) => {
    setform({
      ...form,
      locationId: e.target.value,
    });
    setLocationId(locationId);
    settextLocation(e.target.textContent);
  };
  console.log(locations);

  return (
    <Layout>
      <div className="container mb-5 pb-5">
        <div className="d-flex align-item-center mt-3 mb-lg-5 mb-md-4 mb-4">
          <button
            className="btn px-1 py-0 me-2 button-update-profile"
            onClick={() => back()}
          >
            <i className="bi bi-chevron-left fw-bold"></i>
          </button>
          <span className="fw-bold d-block ms-3">Add new item</span>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <InputVehicle1
              onChange={(e) => handleForm(e)}
              name="name"
              placeholder="Name (max up to 50 words)"
            />
            <label
              htmlFor="image1"
              className={
                urlImage1 !== defaultItem.src ? styles.image1 : styles.cam
              }
            >
              <div className={urlImage1 ? styles.image1 : styles.cam}>
                <img src={urlImage1} alt="" />
              </div>
            </label>
            <div className="row mt-3">
              <div className="col-12 col-md-12 col-lg-6">
                <label htmlFor="image2" className={styles.subcam}>
                  <div className={styles.subcam}>
                    <img src={urlImage2} alt="" />
                  </div>
                </label>
              </div>
              <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0">
                <label htmlFor="image3" className={styles.subcam}>
                  <div className={styles.subcam}>
                    <img src={urlImage3} alt="" />
                  </div>
                </label>
              </div>
            </div>
            <input
              onChange={(e) => handleImg(e)}
              className="d-none"
              type="file"
              name="image1"
              id="image1"
            />
            <input
              onChange={(e) => handleImg(e)}
              className="d-none"
              type="file"
              name="image2"
              id="image2"
            />
            <input
              onChange={(e) => handleImg(e)}
              className="d-none"
              type="file"
              name="image3"
              id="image3"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <div className="row mt-3">
              <div className="col-12 col-md-6 col-lg-6">
                <span className={styles.inputTitle}>Location : </span>
                <select
                  className={styles.status}
                  aria-label=".form-select-md fs-6 example"
                  id={locationId}
                  onClick={(e) => changeLocations(e)}
                >
                  <option selected>
                    <BtnPayment
                      onClick={() => handleLocations()}
                      text={"Select Location"}
                      className={styles.status}
                    />
                  </option>

                  {locations &&
                    locations?.map((location, index) => (
                      <option
                        key={index}
                        className={styles.dropmenu}
                        value={location.locationId}
                      >
                        <span className={styles.category}>{location.name}</span>
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <span className={styles.inputTitle}>Description : </span>
            <InputVehicle1
              onChange={(e) => handleForm(e)}
              name="description"
              placeholder="Description (max up to 150 words)"
            />
            <InputVehicle2
              onChange={(e) => handleForm(e)}
              name="price"
              placeholder="Type the price"
              title="Price : "
            />
            <span className={styles.inputTitle}>Status : </span>

            <div className="row mt-3">
              <div className="col-12 col-md-6 col-lg-6">
                <select
                  className={styles.status}
                  aria-label=".form-select-md fs-6 example"
                  onClick={(e) => changeStatus(e)}
                >
                  <option selected>
                    <BtnPayment
                      onClick={() => status()}
                      text={textCategory ? textCategory : "Select Status"}
                      className={styles.status}
                    />
                  </option>
                  <option value="Available">Available</option>
                  <option value="Full Booking">Full Booked</option>
                </select>
              </div>
            </div>

            <InputVehicle2
              onChange={(e) => handleForm(e)}
              name="stock"
              placeholder="Insert stock"
              title="Stock : "
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
                  types?.map((type, index) => (
                    <div
                      key={index}
                      onClick={(e) => changetype(e)}
                      className={styles.dropmenu}
                    >
                      <span id={type.typeId} className={styles.category}>
                        {type.name}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
            <BtnPayment
              onClick={() => handleSave()}
              text="Save"
              className="w-100 bg-orange"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
