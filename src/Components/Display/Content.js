import React, { useState, useEffect } from "react";
import MyDocument from "../PreviewPDF/PDF";
import FileUploader from "./FileUpload";
import { useScheduleContext } from "../../Context/ScheduleContext/ScheduleContext";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { pdf } from "@react-pdf/renderer";
import SchedulePreview from "../EditableSchedule/SchedulePreview";
import CustomBar from "../EditableSchedule/CustomBar";
import "../../css/Header.css";

const Content = (props) => {
  const pdfSettings = {
    schedulePerPage: 4,
  };

  const [parsedSchedule, setParsedSchedule] = useState([]);
  const [parsedGridVenues, setParsedGridVenues] = useState({});
  const [colourInfo, setColourInfo] = useState([]);
  const [showData, setShowData] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const scheduleContext = useScheduleContext();
  const parsedScheduleContext = scheduleContext.gridScreenTimes;
  const colorSettings = scheduleContext.colorSettings;
  const fontSettings = scheduleContext.fontSettings;
  const gridSettings = scheduleContext.gridLineSettings;
  const daysPerPage = scheduleContext.daysPerPage;
  const bannerImage = scheduleContext.bannerImage;

  useEffect(() => {
    // Generate PDF whenever bannerImage or other dependencies change
    if (showData) {
      generatePDF();
    }
  }, [
    bannerImage,
    parsedScheduleContext,
    colorSettings,
    fontSettings,
    gridSettings,
    daysPerPage,
    showData,
  ]);

  const CheckData = async () => {
    if (scheduleContext.gridScreenTimes.length > 0) {
      if (parsedGridVenues.size > 0) {
        scheduleContext.mapVenueName(parsedGridVenues);
      }

      if (colourInfo.size > 0) {
        insertColour();
      }

      // Force PDF regeneration by setting showData to true
      setShowData(true);

      document.getElementById("upload1").style.display = "none";
      document.getElementById("file-upload").style.display = "none";
      document.getElementById("generatePDF-btn").style.display = "none";
      document.getElementById("tabs-right").style.display = "block";
      document.getElementById("generateMsg").innerHTML = "";
    } else {
      document.getElementById("generateMsg").innerHTML =
        "Please upload all files first";
    }
    return parsedSchedule.length > 0;
  };

  const insertColour = () => {
    const colorSchedule = parsedScheduleContext.map((entry) => {
      entry.venue.map((venueEntry) => {
        venueEntry.screens.map((screenEntry) => {
          screenEntry.colour = colourInfo.has(screenEntry.movieType)
            ? colourInfo.get(screenEntry.movieType)
            : "unknown";
          return screenEntry;
        });
        return venueEntry;
      });
      return entry;
    });
    setParsedSchedule(colorSchedule);
  };

  const generatePDF = async () => {
    const blob = await pdf(
      <MyDocument
        data={{
          pdfSettings,
          parsedScheduleContext,
          colorSettings,
          fontSettings,
          gridSettings,
          daysPerPage,
          bannerImage,
        }}
      />
    ).toBlob();
    setPdfBlob(blob);
  };

  const downloadPDF = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "schedule.pdf";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const viewPreview = () => {
    document.getElementById("pdf-viewer").style.display = "none";
    document.getElementById("preview-viewer").style.display = "block";
    document.getElementById("previewBtn").style.fontWeight = "bold";
    document.getElementById("pdfBtn").style.fontWeight = "normal";
  };

  const viewPDF = () => {
    document.getElementById("pdf-viewer").style.display = "block";
    document.getElementById("preview-viewer").style.display = "none";
    document.getElementById("previewBtn").style.fontWeight = "normal";
    document.getElementById("pdfBtn").style.fontWeight = "bold";
  };

  return (
    <>
      <div id="content">
        <div className="tabs-container">
          <div className="tabs-left">
            <h3>Dashboard</h3>
          </div>
          <div id="tabs-right">
            <Button id="pdfBtn" onClick={downloadPDF} disabled={!pdfBlob}>
              Download PDF
            </Button>
          </div>
        </div>

        <div id="upload1">
          <div id="file-upload">
            <FileUploader
              setParsedSchedule={setParsedSchedule}
              setParsedGridVenues={setParsedGridVenues}
              setColourInfo={setColourInfo}
            />
          </div>
        </div>

        <div id="generatePDF">
          <div id="generatePDF-btn">
            <Button
              variant="contained"
              onClick={CheckData}
              sx={{
                borderRadius: 50,
                width: 200,
                height: 40,
              }}
            >
              Generate PDF{" "}
              <span className="btn-icon">
                <KeyboardDoubleArrowRightIcon />
              </span>
            </Button>
          </div>

          {showData ? (
            <div>
              <div id="preview-viewer">
                <CustomBar />
                <SchedulePreview />
              </div>
            </div>
          ) : (
            <div id="generateMsg"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
