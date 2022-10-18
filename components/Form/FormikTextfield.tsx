import { InputAdornment } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-mui";
const FormikTextfield = ({
  name,
  label,
  required = false,
  type = "text",
  adornment = <></>,
  maxLength = undefined,
  ...props
}) => {
  const formik = useFormikContext();
  return (
    <Field
      component={TextField}
      name={name}
      label={label}
      type={type}
      required={required}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      InputProps={{
        endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
      }}
      inputProps={{
        maxLength: maxLength,
      }}
      sx={{ m: 1 }}
      autoComplete="off"
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  );
};

export default FormikTextfield;

/**
 * 
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={type}
      value={formik.values[name]}
      required={required}
      autoComplete="off"
      sx={{ m: 1 }}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      InputProps={{
        endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
      }}
      inputProps={{
        maxLength: maxLength,
      }}
      {...props}
    />
 */
