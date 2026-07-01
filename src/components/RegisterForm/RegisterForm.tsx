import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import getInputClassName from "../../utils/getInputClassName";
import "./RegisterForm.scss";

interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  user_name: string;
  first_name: string;
  last_name: string;
  age: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
  user_name: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  first_name: Yup.string().optional(),
  last_name: Yup.string().optional(),
  age: Yup.number().nullable().optional().typeError("Age must be a number"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, error: authError } = useAuthContext();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      user_name: "",
      first_name: "",
      last_name: "",
      age: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("📝 Attempting registration...", values.email);
        await register({
          email: values.email,
          password: values.password,
          user_name: values.user_name,
          first_name: values.first_name || undefined,
          last_name: values.last_name || undefined,
          age: values.age ? parseInt(values.age) : undefined,
        });
        console.log("Registration successful, navigating profile...");
        navigate("/profile");
      } catch (err) {
        console.error("❌ Registration error:", err);
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <form
      className="form form_layout_stack register-form"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="form__title">Create Account</h2>

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
          className={getInputClassName(
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
        <label className="form__label" htmlFor="user_name">
          Username
        </label>
        <input
          id="user_name"
          type="text"
          placeholder="Choose a username"
          {...formik.getFieldProps("user_name")}
          className={getInputClassName(
            Boolean(formik.touched.user_name && formik.errors.user_name),
          )}
        />
        {formik.touched.user_name && formik.errors.user_name && (
          <span className="form__message form__message_error">
            {formik.errors.user_name}
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
          className={getInputClassName(
            Boolean(formik.touched.password && formik.errors.password),
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <span className="form__message form__message_error">
            {formik.errors.password}
          </span>
        )}
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="passwordConfirm">
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
          {...formik.getFieldProps("passwordConfirm")}
          className={getInputClassName(
            Boolean(
              formik.touched.passwordConfirm && formik.errors.passwordConfirm,
            ),
          )}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <span className="form__message form__message_error">
            {formik.errors.passwordConfirm}
          </span>
        )}
      </div>

      <div className="form__row">
        <div className="form__field">
          <label className="form__label" htmlFor="first_name">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            placeholder="John"
            {...formik.getFieldProps("first_name")}
            className="form__input form__input_wide"
          />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="last_name">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            placeholder="Doe"
            {...formik.getFieldProps("last_name")}
            className="form__input form__input_wide"
          />
        </div>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="age">
          Age
        </label>
        <input
          id="age"
          type="number"
          placeholder="18"
          {...formik.getFieldProps("age")}
          className={getInputClassName(
            Boolean(formik.touched.age && formik.errors.age),
          )}
        />
        {formik.touched.age && formik.errors.age && (
          <span className="form__message form__message_error">
            {formik.errors.age}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="button button_theme_main form__submit"
      >
        <span className="button__inner">
          {formik.isSubmitting ? "Creating Account..." : "Register"}
        </span>
      </button>

      <p className="form__link">
        Already have an account? <Link to="/login">Sign in here</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
