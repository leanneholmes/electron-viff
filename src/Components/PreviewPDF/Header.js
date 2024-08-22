import React from "react";
import { Image } from "@react-pdf/renderer";

const MyHeader = ({ bannerImage }) => {
  return <>{bannerImage ? <Image src={bannerImage} /> : <></>}</>;
};

export default MyHeader;
