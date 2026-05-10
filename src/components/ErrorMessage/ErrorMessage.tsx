import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import errorImg from "./error.gif";
import "./ErrorMessage.scss";

interface ErrorMessageProps {
  children?: ReactNode;
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
        src={errorImg}
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
