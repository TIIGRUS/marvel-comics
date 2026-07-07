import { Helmet } from "react-helmet-async";

import SingleItemLayout from "../SingleItemLayout/SingleItemLayout";
import { Comic } from "../../types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface SingleComicProps {
  data: Comic;
}

const SingleComic = ({ data }: SingleComicProps) => {
  const { id, title, description, pageCount, language, price, thumbnail } =
    data || {};

  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <title>{title}</title>
      </Helmet>
      <SingleItemLayout
        title={title}
        description={description}
        thumbnail={thumbnail}
        backLink="/comics"
        favoriteButton={
          <FavoriteButton
            type="comics"
            item={{ id, title, thumbnail, price }}
            size={22}
          />
        }
      >
        <p>{pageCount} pages</p>
        <p>Language: {language}</p>
        <div className="single-item__price">{price}$</div>
      </SingleItemLayout>
    </>
  );
};

export default SingleComic;
