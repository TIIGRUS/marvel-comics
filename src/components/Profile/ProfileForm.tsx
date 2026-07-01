import { useEffect, useState, type ChangeEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { User, UserProfileUpdates } from "../../types";
import getInputClassName from "../../utils/getInputClassName";
import {
  getProfileDisplayName,
  getProfileInitials,
  formatProfileDate,
} from "./profileUtils";

interface ProfileFormValues {
  user_name: string;
  first_name: string;
  last_name: string;
  age: string;
}

interface ProfileFormProps {
  user: User;
  error?: string | null;
  onCancel: () => void;
  onSubmit: (
    updates: UserProfileUpdates,
    avatarFile?: File | null,
  ) => Promise<void>;
}

const validationSchema = Yup.object({
  user_name: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  first_name: Yup.string().optional(),
  last_name: Yup.string().optional(),
  age: Yup.number().nullable().optional().typeError("Age must be a number"),
});

const ProfileForm = ({ user, error, onCancel, onSubmit }: ProfileFormProps) => {
  const displayName = getProfileDisplayName(user);
  const initials = getProfileInitials(displayName);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar_url || null,
  );
  const [avatarError, setAvatarError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;

    if (!file) {
      setAvatarFile(null);
      setAvatarPreview(user.avatar_url || null);
      setAvatarError(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setAvatarFile(null);
      setAvatarPreview(user.avatar_url || null);
      setAvatarError("Please choose an image file");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setAvatarFile(file);
    setAvatarPreview(previewUrl);
    setAvatarError(null);
  };

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      user_name: user.user_name,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      age: user.age ? String(user.age) : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(
          {
            user_name: values.user_name,
            first_name: values.first_name || null,
            last_name: values.last_name || null,
            age: values.age ? parseInt(values.age) : null,
          },
          avatarFile,
        );
      } catch (err) {
        console.error("Profile update error:", err);
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <form className="profile-page form" onSubmit={formik.handleSubmit}>
      <div className="profile-page__summary">
        <div className="profile-page__avatar" aria-hidden="true">
          {avatarPreview ? (
            <img
              className="profile-page__avatar-image"
              src={avatarPreview}
              alt=""
            />
          ) : (
            initials
          )}
        </div>
        <div className="profile-page__heading">
          <h1 className="profile-page__title">Edit Profile</h1>
          <p className="profile-page__name">{displayName}</p>
          <label className="profile-page__avatar-control button button_theme_secondary">
            <span className="button__inner">
              {avatarPreview ? "Change Avatar" : "Add Avatar"}
            </span>
            <input
              className="profile-page__avatar-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
          {avatarError && (
            <span className="form__message form__message_error">
              {avatarError}
            </span>
          )}
        </div>
      </div>

      <div className="profile-page__form">
        {error && formik.submitCount > 0 && (
          <div className="form__alert form__message_error">{error}</div>
        )}

        <div className="form__field">
          <label className="form__label" htmlFor="profile-email">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            value={user.email}
            className="form__input form__input_wide"
            disabled
          />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="profile-user-name">
            Username
          </label>
          <input
            id="profile-user-name"
            type="text"
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

        <div className="form__row profile-page__form-row">
          <div className="form__field">
            <label className="form__label" htmlFor="profile-first-name">
              First Name
            </label>
            <input
              id="profile-first-name"
              type="text"
              {...formik.getFieldProps("first_name")}
              className="form__input form__input_wide"
            />
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="profile-last-name">
              Last Name
            </label>
            <input
              id="profile-last-name"
              type="text"
              {...formik.getFieldProps("last_name")}
              className="form__input form__input_wide"
            />
          </div>
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="profile-age">
            Age
          </label>
          <input
            id="profile-age"
            type="number"
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

        <div className="form__field">
          <label className="form__label" htmlFor="profile-created-at">
            Account Created
          </label>
          <input
            id="profile-created-at"
            type="text"
            value={formatProfileDate(user.created_at)}
            className="form__input form__input_wide"
            disabled
          />
        </div>
      </div>

      <div className="profile-page__actions">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="button button_theme_main"
        >
          <span className="button__inner">
            {formik.isSubmitting ? "Saving..." : "Save"}
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

export default ProfileForm;
