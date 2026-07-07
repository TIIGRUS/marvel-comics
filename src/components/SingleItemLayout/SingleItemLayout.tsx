import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./SingleItemLayout.scss";

interface SingleItemLayoutProps {
  title: string;
  description: string;
  thumbnail: string;
  backLink?: string;
  children?: ReactNode;
  favoriteButton?: ReactNode;
}

const SingleItemLayout = ({
  title,
  description,
  thumbnail,
  backLink,
  children,
  favoriteButton,
}: SingleItemLayoutProps) => {
  return (
    <section className="single-item">
      <img src={thumbnail} alt={title} className="single-item__img" />
      <div className="single-item__content">
        <h2 className="single-item__name">
          {title}
          {favoriteButton}
        </h2>
        <p>{description}</p>
        {children}
      </div>
      {backLink && (
        <Link to={backLink} className="single-item__back">
          Back to all
        </Link>
      )}
    </section>
  );
};

export default SingleItemLayout;
