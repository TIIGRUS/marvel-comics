import { supabase } from "../utils/supabase";

// метод для получения данных из всех таблиц
async function fetchAllData() {
    try {
        // пример получения данных из таблицы "marvel_quotes"
        const { data: quotes } = await supabase.from("marvel_quotes").select();

        return { quotes };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

const dbApi = {
    fetchAllData,
}

export default dbApi;