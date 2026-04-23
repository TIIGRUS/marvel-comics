import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./SingleItemLayout.scss";

interface SingleItemLayoutProps {
  title: string;
  description: string;
  thumbnail: string;
  backLink?: string;
  children?: ReactNode;
}

const SingleItemLayout = ({
  title,
  description,
  thumbnail,
  backLink,
  children,
}: SingleItemLayoutProps) => {
  return (
    <div className="single-item">
      <img src={thumbnail} alt={title} className="single-item__img" />
      <div className="single-item__info">
        <h2 className="single-item__name">{title}</h2>
        <p className="single-item__descr">{description}</p>
        {children}
      </div>
      {backLink && (
        <Link to={backLink} className="single-item__back">
          Back to all
        </Link>
      )}
    </div>
  );
};

export default SingleItemLayout;
