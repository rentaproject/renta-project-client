import React, { useState } from "react";
// import Image from "next/image";
import { Toast, ToastContainer } from "react-bootstrap";
import Link from "next/link";
import axios from "utilities/axiosClient";
import Footer from "components/Footer";

export default function ConfirmResetPassword() {
  const [form, setForm] = useState({
    email: "",
  });
  const [succes, setSucces] = useState(false);
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleForgot = async () => {
    setLoading(true);
    try {
      const result = await axios.post("api/auth/forgotpassword", form);
      console.log(result);
      console.log(form);

      setSucces(true);
      setLoading(false);
      setMsg(result.data.msg);
      setShowToast(true);
      // Router.push("/");
    } catch (error) {
      setMsg(error.response.data.msg);
      setLoading(false);
      setShowToast(true);
      console.log(error);
    }
  };
  return (
    <div>
      <div className="banner--forgot ">
        <div className="overlay">
          <Link href="/auth/login" className="mb-5  bg-primary mt-5">
            <p
              className="back-forgot"
              style={{
                cursor: "pointer",

                marginRight: "3000px",
                color: "white",
              }}
            >
              Back
            </p>
          </Link>
          <h1 className="text-center title-forgot mb-5">
            {" "}
            Don’t worry, we got your back!
          </h1>
          <div className="form-forgot text-center  ">
            <input
              type="text"
              className="input-forgot text-white mb-4"
              placeholder="Enter your email adress"
              name="email"
              onChange={handleOnChange}
            />
            <br />
            {!form.email ? (
              <button className="btn btn-forgot mb-5" disabled>
                Send Link
              </button>
            ) : (
              <button
                className="btn btn-forgot mb-5"
                onClick={handleForgot}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "Send Link"
                )}
              </button>
            )}

            <p className="desc-forgot mt-5">
              You will receive a link to reset your password. If you haven’t
              received any link, click Resend Link
            </p>
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
        <Footer />
      </div>
    </div>
  );
}
