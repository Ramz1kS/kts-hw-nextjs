import CartStore from './CartStore/CartStore';
import { makeObservable, observable } from 'mobx';

export default class RootStore {
  cartStore: CartStore = new CartStore(this);

  constructor() {
    makeObservable(this, {
        cartStore: observable
    })
    }
}
