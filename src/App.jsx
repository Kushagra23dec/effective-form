import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

function App() {
  // fromik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      status: "",
      country: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "username must be less than or equal to 10 characters!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Password Must have atleast 6 digits")
        .required("Required"),
      status: Yup.string()
        .equals(["single", "commited", "coder"])
        .required("Required"),
      country: Yup.string()
        .equals(["India", "Germany", "USA"])
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("form submitted:", values);
      notify();
    },
  });

  console.log(formik.errors);
  // console.log(formik.values);

  // Toastify...
  function notify() {
    toast("Form Submitted");
  }

  return (
    <>
      <h1>App</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "300px",
        }}
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="username"
          onBlur={formik.handleBlur}
          style={{ padding: "2px" }}
        />
        {formik?.touched?.username && formik?.errors?.username && (
          <p style={{ color: "red" }}>{formik.errors.username}</p>
        )}
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="email"
          onBlur={formik.handleBlur}
          style={{ padding: "2px" }}
        />
        {formik?.touched?.email && formik?.errors?.email && (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        )}
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          onBlur={formik.handleBlur}
          style={{ padding: "2px" }}
        />
        {formik?.touched?.password && formik?.errors?.password && (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        )}
        <div style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
          <span>Your Status: </span>

          <input
            type="radio"
            name="status"
            value="single"
            onChange={formik.handleChange}
          />
          <label> single</label>

          <input
            type="radio"
            name="status"
            value="commited"
            onChange={formik.handleChange}
          />
          <label> commited</label>

          <input
            type="radio"
            name="status"
            value="coder"
            onChange={formik.handleChange}
          />
          <label> coder</label>
          {formik?.touched?.status && formik?.errors?.status && (
            <p style={{ color: "red" }}>{formik?.errors?.status}</p>
          )}
        </div>

        <div>
          <span>Your Country: </span>
          <select name="country" onChange={formik.handleChange}>
            <option value="">select Country</option>
            <option value="India">India</option>
            <option value="Germany">Germany</option>
            <option value="USA">USA</option>
          </select>
          {formik?.touched.country && formik?.errors?.country && (
            <p style={{ color: "red" }}>{formik?.errors?.country}</p>
          )}
        </div>

        <button type="submit" style={{ padding: "2px" }}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default App;
