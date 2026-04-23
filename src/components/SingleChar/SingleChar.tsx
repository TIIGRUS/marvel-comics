import { Helmet } from "react-helmet";
import SingleItemLayout from "../SingleItemLayout/SingleItemLayout";
import { Character } from "../../types";

interface SingleCharProps {
  data: Character;
}

const SingleChar = ({ data }: SingleCharProps) => {
  const { name, description, thumbnail } = data || {};

  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <title>{name}</title>
      </Helmet>
      <SingleItemLayout
        title={name}
        description={description}
        thumbnail={thumbnail}
      ></SingleItemLayout>
    </>
  );
};

export default SingleChar;
