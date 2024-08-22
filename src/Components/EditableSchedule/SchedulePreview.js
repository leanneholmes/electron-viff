import React from "react";
import ScheduleEditable from "./ScheduleEditable";
import { useScheduleContext } from "../../Context/ScheduleContext/ScheduleContext";

const SchedulePreview = () => {
  const { bannerImage, gridScreenTimes } = useScheduleContext();

  return (
    <div className="schedule-preview-container">
      <div className="image-container">
        {bannerImage ? (
          <img
            src={bannerImage}
            alt="Calendar Header"
            className="calendar-image"
          />
        ) : (
          <></>
        )}
      </div>
      {gridScreenTimes.map((day, index) => (
        <ScheduleEditable key={index} data={day} />
      ))}
    </div>
  );
};

export default SchedulePreview;
