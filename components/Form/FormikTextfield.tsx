import { InputAdornment } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-mui";

const FormikTextfield = ({
  name,
  label,
  required = false,
  type = "text",
  adornment = <></>,
  maxLength = 500,
  ...props
}) => {
  const formik = useFormikContext();
  return (
    <Field
      variant="standard"
      component={TextField}
      InputLabelProps={{ shrink: true }}
      name={name}
      label={label}
      type={type}
      required={required}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      InputProps={{
        endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
      }}
      inputProps={{
        fullwidth: "true",
        maxLength: maxLength,
      }}
      autoComplete="off"
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  );
};

export default FormikTextfield;
