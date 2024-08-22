import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useScheduleContext } from "../../../Context/ScheduleContext/ScheduleContext";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";

const BannerUpload = () => {
  const { setBannerImage, bannerImage } = useScheduleContext();
  const [imageName, setImageName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setBannerImage(null);
    setImageName("");
  };

  return (
    <>
      <FormControl variant="outlined" sx={{ width: "90%" }}>
        <OutlinedInput
          id="banner-upload"
          type="text"
          value={imageName}
          placeholder="Choose a file"
          readOnly
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="primary"
                component="label"
                htmlFor="file-input"
              >
                <AttachFileIcon />
              </IconButton>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </InputAdornment>
          }
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-adornedEnd": {
              borderRadius: "4px",
            },
          }}
        />
      </FormControl>
      {bannerImage && (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            marginTop: "10px",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={handleRemoveImage}
            sx={{ width: "90%" }}
          >
            Remove Image
          </Button>
        </div>
      )}
      <div
        style={{
          color: "grey",
          fontSize: "0.9em",
          fontStyle: "italic",
          marginTop: "10px",
        }}
      >
        Image should be 12345px wide.
      </div>
    </>
  );
};

export default BannerUpload;
