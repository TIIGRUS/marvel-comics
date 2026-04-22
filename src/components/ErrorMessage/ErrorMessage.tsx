import { ReactElement } from "react";
import classnames from "classnames";
import "./ErrorMessage.scss";
import { Link } from "react-router-dom";

interface ErrorMessageProps {
  children?: ReactElement;
  textLink?: string;
  pathLink?: string;
}

const ErrorMessage = ({ children, textLink, pathLink }: ErrorMessageProps) => {
  const errorText = children || "Something went wrong. Please try again later.";
  const classNamesError = classnames("error-message", {
    "error-message_has-text": children,
  });

  return (
    <div className={classNamesError}>
      <img
        src={`${process.env.PUBLIC_URL}/error.gif`}
        className="error-message__img"
        alt="Robot and it system is error"
      />
      {
        <div className="error-message__text">
          {children ? (
            <>
              {errorText}
              <Link to={pathLink || "/"} className="button button__main">
                <span className="inner">{textLink || "Go back"}</span>
              </Link>
            </>
          ) : (
            <>
              <p>{errorText}</p>
              {textLink && pathLink && (
                <Link to={pathLink} className="button button__main">
                  <span className="inner">{textLink}</span>
                </Link>
              )}
            </>
          )}
        </div>
      }
    </div>
  );
};

export default ErrorMessage;
