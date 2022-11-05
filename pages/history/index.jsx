import React from "react";
import Image from "next/image";
import Vespa from "../../public/vespa.png";

export default function index() {
  return (
    <div>
      <Image
        src={Vespa}
        alt="vespa"
        width={220}
        height={220}
        objectFit="cover"
      />
      <img src="../../public/vespa.png" alt="" />
      index
    </div>
  );
}
