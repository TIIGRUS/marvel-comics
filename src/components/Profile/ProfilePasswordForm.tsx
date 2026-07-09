import { useFormik } from "formik";
import * as Yup from "yup";
import getInputClassName from "../../utils/getInputClassName";

interface ProfilePasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface ProfilePasswordFormProps {
  error?: string | null;
  onCancel: () => void;
  onSubmit: (password: string) => Promise<void>;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your new password"),
});

const ProfilePasswordForm = ({
  error,
  onCancel,
  onSubmit,
}: ProfilePasswordFormProps) => {
  const formik = useFormik<ProfilePasswordFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values.password);
      } catch (err) {
        console.error("Password update error:", err);
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <form className="profile-page form" onSubmit={formik.handleSubmit}>
      <div className="profile-page__summary">
        <h1 className="profile-page__title">Change Password</h1>
      </div>

      <div className="profile-page__form">
        {error && formik.submitCount > 0 && (
          <div className="form__alert form__message_error">{error}</div>
        )}

        <div className="form__field">
          <label className="form__label" htmlFor="profile-password">
            New Password
          </label>
          <input
            id="profile-password"
            type="password"
            autoComplete="new-password"
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
          <label className="form__label" htmlFor="profile-confirm-password">
            Confirm New Password
          </label>
          <input
            id="profile-confirm-password"
            type="password"
            autoComplete="new-password"
            {...formik.getFieldProps("confirmPassword")}
            className={getInputClassName(
              Boolean(
                formik.touched.confirmPassword && formik.errors.confirmPassword,
              ),
            )}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="form__message form__message_error">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>
      </div>

      <div className="profile-page__actions">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="button button_theme_main"
        >
          <span className="button__inner">
            {formik.isSubmitting ? "Saving..." : "Update Password"}
          </span>
        </button>
        <button
          type="button"
          disabled={formik.isSubmitting}
          className="button button_theme_secondary"
          onClick={onCancel}
        >
          <span className="button__inner">Cancel</span>
        </button>
      </div>
    </form>
  );
};

export default ProfilePasswordForm;
