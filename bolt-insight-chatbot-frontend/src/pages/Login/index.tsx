import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Grid2 } from "@mui/material";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/service/User";
import { toast } from "react-toastify";

interface IFormValues {
  userName: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues: IFormValues = { userName: "", password: "" };

  const handleSubmit = async (values: IFormValues) => {
    const response = await login(values);

    if (response.status === 200) {
      const { token } = response.data;

      localStorage.setItem("token", token);
      navigate("/main-page");
    }
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid2
        style={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="userName"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.userName && touched.userName}
                helperText={
                  errors.userName && touched.userName ? errors.userName : ""
                }
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password ? errors.password : ""
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "1rem" }}
        >
          You haven't an account? <Link to="/register">Register</Link>
        </Typography>
      </Grid2>
    </Grid2>
  );
}
