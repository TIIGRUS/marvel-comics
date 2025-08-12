import { useState, Fragment } from "react";
import { Form, Field, ErrorMessage as FormikErrorMessage, Formik } from "formik";
import { Link } from "react-router-dom";
import "./CharSearchForm.scss";
import useMarvelService from "../../services/MarvelService";
import { ErrorMessage } from "formik";

const CharSearchForm = () => {
    const { searchCharacter, isLoading, error, clearError } = useMarvelService();
    const [chars, setChars] = useState(null);

    const handleSearch = async (name) => {
        // handleClear();

        try {
            const results = await searchCharacter(name);
            setChars(results);
        } catch (error) {
            console.error("Search error:", error);
            setChars([]);
        }
    };

    const handleClear = () => {
        clearError();
        setChars(null);
    }

    const errorMessage = error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
    ) : null;

    console.log("Chars:", chars);

    const results = !chars ? null : chars.length > 0 ? (
        chars.map(char => (
            <Fragment key={char.id}>
                <div className="char__search-success">There is! Visit {char.name} page?</div>
                <Link to={`/characters/${char.id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </Fragment>
        ))
    ) : (
        <div className="char__search-error">
            The character was not found. Check the name and try again.
        </div>
    );

    return (
        <Formik
            initialValues={{
                charName: ''
            }}

            validate={values => {
                const errors = {};

                if (!values.charName) {
                    errors.charName = 'This field is required';
                } else if (values.charName.length < 2) {
                    errors.charName = 'Must be at least 2 characters';
                }

                return errors;
            }}

            onSubmit={(values, { resetForm }) => {
                handleSearch(values.charName);
                // resetForm();
            }}

        >
            {({ handleChange }) => {
                return (
                    <>
                        <Form className="char__info">
                            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                            <div className="char__search-wrapper">
                                <Field
                                    id="charName"
                                    name='charName'
                                    type='text'
                                    placeholder="Enter name"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleClear();
                                    }}
                                />
                                <button
                                    type='submit'
                                    className="button button__main"
                                    disabled={isLoading}
                                >
                                    <div className="inner">find</div>
                                </button>
                                <FormikErrorMessage component="div" className="char__search-error" name="charName" />

                                {results}
                            </div>
                        </Form>
                        {errorMessage}
                    </>
                )
            }}
        </Formik>
    )
}

export default CharSearchForm;