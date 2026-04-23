import { Helmet } from "react-helmet-async";
import SingleItemLayout from "../SingleItemLayout/SingleItemLayout";
import { Comic } from "../../types";

interface SingleComicProps {
  data: Comic;
}

const SingleComic = ({ data }: SingleComicProps) => {
  const { title, description, pageCount, language, price, thumbnail } =
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
      >
        <p className="single-item__descr">{pageCount} pages</p>
        <p className="single-item__descr">Language: {language}</p>
        <div className="single-item__price">{price}$</div>
      </SingleItemLayout>
    </>
  );
};

export default SingleComic;
