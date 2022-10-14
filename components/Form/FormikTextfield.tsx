import { InputAdornment, TextField } from "@mui/material";
import { useFormikContext } from "formik";

const FormikTextfield = ({ key, label, required = false, type = "text", adornment = <></> }) => {
  const formik = useFormikContext();
  return (
    <TextField
      fullWidth
      id={key}
      name={key}
      label={label}
      type={type}
      value={formik.values[key]}
      required={required}
      autoComplete="off"
      sx={{ m: 1 }}
      onChange={formik.handleChange}
      error={formik.touched[key] && Boolean(formik.errors[key])}
      helperText={formik.touched[key] && formik.errors[key]}
      InputProps={{
        endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
      }}
    />
  );
};

export default FormikTextfield;
