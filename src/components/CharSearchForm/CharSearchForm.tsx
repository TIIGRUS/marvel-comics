import { useState, Fragment } from "react";
import {
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
  Formik,
} from "formik";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { ErrorMessage } from "formik";
import { Character } from "../../types";
import "./CharSearchForm.scss";

const CharSearchForm = () => {
  const { status, searchCharacter } = useMarvelService();
  const [chars, setChars] = useState<Character[] | null>(null);

  const handleSearch = async (name: string) => {
    // handleClear();

    try {
      const results = await searchCharacter(name);
      setChars(results);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Search error:", error.message);
      }
      setChars([]);
    }
  };

  const handleClear = () => {
    // clearError();
    setChars(null);
  };

  // const errorMessage = error ? (
  //     <ErrorMessage>{error.message}</ErrorMessage>
  // ) : null;
  const errorMessage =
    status === "error" ? <ErrorMessage name="charName"></ErrorMessage> : null;

  const results = !chars ? null : chars.length > 0 ? (
    chars.map((char) => (
      <Fragment key={char.id}>
        <div className="form__message form__message_success">
          There is! Visit {char.name} page?
        </div>
        <Link
          to={`/characters/${char.id}`}
          className="button button_theme_secondary"
        >
          <span className="button__inner">To page</span>
        </Link>
      </Fragment>
    ))
  ) : (
    <div className="form__message form__message_error form__message_full">
      The character was not found. Check the name and try again.
    </div>
  );

  return (
    <Formik
      initialValues={{
        charName: "",
      }}
      validateOnBlur={false}
      validate={(values) => {
        const errors: { charName?: string } = {};

        if (!values.charName) {
          errors.charName = "This field is required";
        } else if (values.charName.length < 2) {
          errors.charName = "Must be at least 2 characters";
        }

        return errors;
      }}
      onSubmit={(values) => {
        handleSearch(values.charName);
        // resetForm();
      }}
    >
      {({ handleChange }) => {
        return (
          <>
            <Form
              className="form form_layout_search char-search char-section__aside-inner"
              name="search-char"
            >
              <label className="form__label" htmlFor="charName">
                Or find a character by name:
              </label>
              <Field
                id="charName"
                name="charName"
                type="text"
                placeholder="Enter name"
                className="form__input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleClear();
                }}
              />
              <button
                type="submit"
                className="button button_theme_main"
                disabled={status === "loading"}
              >
                <span className="button__inner">find</span>
              </button>
              <FormikErrorMessage
                component="div"
                className="form__message form__message_error form__message_full"
                name="charName"
              />

              {results}
            </Form>
            {errorMessage}
          </>
        );
      }}
    </Formik>
  );
};

export default CharSearchForm;
