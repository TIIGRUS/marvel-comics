import { Tables } from "../types/supabase";
import { supabase } from "../utils/supabase";

export const fetchQuoteByCharacter = async (characterName: string): Promise<Tables<"marvel_quotes">[]> => {
    try {
        const { data, error } = await supabase
            .from("marvel_quotes")
            .select()
            .ilike("character", `%${characterName}%`);

        if (error) {
            console.error("Error fetching quotes:", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Unexpected error:", error);
        throw error;
    }
};