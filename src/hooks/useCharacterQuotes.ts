import { useEffect, useState } from "react";

import { fetchQuoteByCharacter } from "../api/quotes";
import { Tables } from "../types/supabase";

type CharacterQuote = Tables<"marvel_quotes">;

const useCharacterQuotes = (characterName?: string | null) => {
  const [quotes, setQuotes] = useState<CharacterQuote[]>([]);
  const [isQuotesLoading, setIsQuotesLoading] = useState(false);
  const [quotesError, setQuotesError] = useState<string | null>(null);
  const [loadedCharacterName, setLoadedCharacterName] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let isCancelled = false;

    const resetQuotes = () => {
      setQuotes([]);
      setQuotesError(null);
      setLoadedCharacterName(null);
      setIsQuotesLoading(false);
    };

    const updateQuotes = async () => {
      if (!characterName) {
        resetQuotes();
        return;
      }

      setIsQuotesLoading(true);
      setQuotes([]);
      setQuotesError(null);
      setLoadedCharacterName(null);

      try {
        const loadedQuotes = await fetchQuoteByCharacter(characterName);

        if (!isCancelled) {
          setQuotes(loadedQuotes);
          setLoadedCharacterName(characterName);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Failed to load character quotes:", error);

        if (!isCancelled) {
          setQuotes([]);
          setQuotesError(message);
          setLoadedCharacterName(characterName);
        }
      } finally {
        if (!isCancelled) {
          setIsQuotesLoading(false);
        }
      }
    };

    updateQuotes();

    return () => {
      isCancelled = true;
    };
  }, [characterName]);

  return {
    quotes,
    isQuotesLoading,
    quotesError,
    loadedCharacterName,
  };
};

export default useCharacterQuotes;
