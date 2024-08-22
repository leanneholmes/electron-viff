import React from "react";

// MUI imports
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import { useScheduleContext } from "../../../Context/ScheduleContext/ScheduleContext";

const DaysPerPageSettings = () => {
  const scheduleContext = useScheduleContext();
  const { daysPerPage, setDaysPerPage } = scheduleContext;

  const handleChange = (event) => {
    const value = event.target.value;
    setDaysPerPage(value);
  };

  return (
    <div>
      <FormControl sx={{ width: "40%" }} size="small">
        <Select size="small" value={daysPerPage} onChange={handleChange}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DaysPerPageSettings;
