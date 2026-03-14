import CartStore from "./CartStore/CartStore";
import FavoritesStore from "./FavoritesStore/FavoritesStore";

export default class RootStore {
  cartStore: CartStore;
  favoritesStore: FavoritesStore;

  constructor() {
    this.cartStore = new CartStore(this);
    this.favoritesStore = new FavoritesStore(this);
  }

  hydrate() {
    this.cartStore.hydrate();
    this.favoritesStore.hydrate();
  }
}
