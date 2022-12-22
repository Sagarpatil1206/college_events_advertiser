import React from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//inputAdornment is use for adding icon at the end

const Input = ({name,handleChange,label,half,autoFocus,type,handleShowPassword}) => (
  <Grid item xs={12} sm={half ? 6:12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      autoComplete=""
      label={label}
      autoFocus={autoFocus} //true or false //present or not
      type={type}
      InputProps = {name === 'password' ? {
        endAdornment : ( //add at the end
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type==='password' ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        ),
      } : null }
      />
  </Grid>
);

export default Input;