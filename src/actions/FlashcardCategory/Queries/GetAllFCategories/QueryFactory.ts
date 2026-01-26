// IMPORTS
import { GET_ALL_FCATEGORIES_QUERY, GetAllFCategoriesQuery } from "./Query"

export function getAllFCategories(userId: string): GetAllFCategoriesQuery {

    return {
        type: GET_ALL_FCATEGORIES_QUERY,
        userId
    }
}