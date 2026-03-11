import CartStore from "./CartStore/CartStore";
import { makeObservable, observable } from "mobx";
import FavoritesStore from "./FavoritesStore/FavoritesStore";
import NavbarStore from "./NavbarStore/NavbarStore";

export default class RootStore {
  cartStore: CartStore = new CartStore(this);
  favoritesStore: FavoritesStore = new FavoritesStore(this);
  navbarStore: NavbarStore = new NavbarStore(this)
  constructor() {
    makeObservable(this, {
      cartStore: observable,
      favoritesStore: observable,
      navbarStore: observable
    });
  }
  hydrate() {
    this.cartStore.hydrate();
    this.favoritesStore.hydrate();
  }
}
