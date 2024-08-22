// Customized components import
import Schedule from "./Schedule";

// Fonts import
import RobotoFont from "../../resources/fonts/Roboto-Regular.ttf";
import NeueHaas from "../../resources/fonts/NHaasGroteskTXPro-55Rg.ttf";
import NeueHaasMedium from "../../resources/fonts/NeueHaasUnica/NeueHaasUnicaPro-Medium.otf";
import NeueHaasBold from "../../resources/fonts/NeueHaasUnica/NeueHaasUnicaPro-Bold.otf";
import Helvetica from "../../resources/fonts/Helvetica/FreeSans.ttf";
import HelveticaBold from "../../resources/fonts/Helvetica/FreeSansBold.ttf";
import Calibri from "../../resources/fonts/Calibri.ttf";
import Arial from "../../resources/fonts/arial.ttf";
import Garamond from "../../resources/fonts/EBGaramond-Regular.ttf";
import Geneva from "../../resources/fonts/Geneva Normal.ttf";
import Verdana from "../../resources/fonts/Verdana.ttf";
import AvantGarde from "../../resources/fonts/AvantGarde-Normal.ttf";

// External import
import React from "react";
import { Page, Document, Font, View, Text } from "@react-pdf/renderer";
import MyHeader from "./Header";

Font.register({
  family: "Roboto",
  fonts: [
    { src: RobotoFont }, // font-style: normal, font-weight: normal
  ],
  // family: 'NeueHaas', fonts: [
  //     { src: NeueHaas }, // font-style: normal, font-weight: normal
  // ],
  family: "NeueHaasMedium",
  fonts: [
    { src: NeueHaasMedium }, // font-style: normal, font-weight: normal
  ],
  family: "NeueHaasBold",
  fonts: [
    { src: NeueHaasBold }, // font-style: normal, font-weight: normal
  ],
  family: "Helvetica",
  fonts: [
    { src: Helvetica }, // font-style: normal, font-weight: normal
  ],
  family: "HelveticaBold",
  fonts: [
    { src: HelveticaBold }, // font-style: normal, font-weight: normal
  ],
});
Font.register({
  family: "NeueHaas",
  src: NeueHaas,
});

Font.register({
  family: "Calibri",
  src: Calibri,
});

Font.register({
  family: "Arial",
  src: Arial,
});

Font.register({
  family: "Garamond",
  src: Garamond,
});

Font.register({
  family: "Geneva",
  src: Geneva,
});

Font.register({
  family: "Verdana",
  src: Verdana,
});

Font.register({
  family: "AvantGarde",
  src: AvantGarde,
});

const chunkArray = (array, size, firstPageSize = null) => {
  const chunkedArray = [];

  if (firstPageSize && array.length > 0) {
    chunkedArray.push(array.slice(0, firstPageSize));
    array = array.slice(firstPageSize);
  }

  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }

  return chunkedArray;
};

const MyDocument = (props) => {
  const { parsedScheduleContext, daysPerPage, bannerImage } = props.data;

  const chunks =
    daysPerPage === 3
      ? chunkArray(parsedScheduleContext, daysPerPage, 2)
      : chunkArray(parsedScheduleContext, daysPerPage);

  return (
    <Document>
      {chunks.map((chunk, index) => (
        <Page size={2963} key={index}>
          {index === 0 && (
            <View>
              <MyHeader bannerImage={bannerImage} />
            </View>
          )}
          {chunk.map((day, dayIndex) => (
            <Schedule
              key={dayIndex}
              data={day}
              color={props.data.colorSettings}
              font={props.data.fontSettings}
              grid={props.data.gridSettings}
            />
          ))}
        </Page>
      ))}
    </Document>
  );
};

export default MyDocument;
