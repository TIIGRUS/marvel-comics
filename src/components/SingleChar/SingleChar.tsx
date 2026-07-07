import { Helmet } from "react-helmet-async";

import SingleItemLayout from "../SingleItemLayout/SingleItemLayout";
import CharacterQuotes from "../CharacterQuotes/CharacterQuotes";
import { Character } from "../../types";
import { useCharacterQuotes } from "../../hooks";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface SingleCharProps {
  data: Character;
}

const SingleChar = ({ data }: SingleCharProps) => {
  const { id, name, description, thumbnail } = data || {};
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
        favoriteButton={
          <FavoriteButton
            type="characters"
            item={{ id, name, thumbnail }}
            size={22}
          />
        }
      >
        <CharacterQuotes quotes={quotes} isLoading={isQuotesLoading} />
      </SingleItemLayout>
    </>
  );
};

export default SingleChar;
