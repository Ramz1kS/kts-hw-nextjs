import { FavoritesPageStoreContext } from "@/context/FavoritesPageStoreProvider"
import { useStrictContext } from "./useStrictContext"

export const useFavoritesPageStore = () => {
    return useStrictContext({
        context: FavoritesPageStoreContext,
        message: "FavoritesPageStoreContext was not provided"
    })
}
