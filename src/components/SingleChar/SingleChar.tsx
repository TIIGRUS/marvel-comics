import { Helmet } from "react-helmet-async";

import SingleItemLayout from "../SingleItemLayout/SingleItemLayout";
import CharacterQuotes from "../CharacterQuotes/CharacterQuotes";
import { Character } from "../../types";
import { useCharacterQuotes } from "../../hooks";

interface SingleCharProps {
  data: Character;
}

const SingleChar = ({ data }: SingleCharProps) => {
  const { name, description, thumbnail } = data || {};
  const { quotes, isQuotesLoading } = useCharacterQuotes(name);

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
      >
        <CharacterQuotes quotes={quotes} isLoading={isQuotesLoading} />
      </SingleItemLayout>
    </>
  );
};

export default SingleChar;
