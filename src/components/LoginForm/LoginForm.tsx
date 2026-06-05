import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./LoginForm.scss";

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuthContext();
  const inputClassName = (hasError: boolean) =>
    `form__input form__input_wide${hasError ? " form__input_invalid" : ""}`;

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("🔐 Attempting login...", values.email);
        await login(values);
        console.log("✅ Login successful, navigating home...");
        navigate("/profile");
      } catch (err) {
        console.error("❌ Login error:", err);
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <form
      className="form form_layout_stack login-form"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="form__title">Sign In</h2>

      {authError && (
        <div className="form__alert form__message_error">{authError}</div>
      )}

      <div className="form__field">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...formik.getFieldProps("email")}
          className={inputClassName(
            Boolean(formik.touched.email && formik.errors.email),
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="form__message form__message_error">
            {formik.errors.email}
          </span>
        )}
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
          className={inputClassName(
            Boolean(formik.touched.password && formik.errors.password),
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <span className="form__message form__message_error">
            {formik.errors.password}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="button button_theme_main form__submit"
      >
        <span className="button__inner">
          {formik.isSubmitting ? "Signing In..." : "Sign In"}
        </span>
      </button>

      <p className="form__link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
};

export default LoginForm;
