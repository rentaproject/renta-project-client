import React from "react";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer";

function main(props) {
  return (
    <div>
      <Header title={props.title} />
      {props.children}
      <Footer />
    </div>
  );
}

export default main;
