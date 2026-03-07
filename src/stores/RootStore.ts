import CartStore from './CartStore/CartStore';
import { makeObservable, observable } from 'mobx';
import FavoritesStore from './FavoritesStore/FavoritesStore';

export default class RootStore {
  cartStore: CartStore = new CartStore(this);
  favoritesStore: FavoritesStore = new FavoritesStore(this);

  constructor() {
    makeObservable(this, {
        cartStore: observable,
        favoritesStore: observable
    })
    }
  hydrate() {
    this.cartStore.hydrate()
    this.favoritesStore.hydrate()
  }
}
