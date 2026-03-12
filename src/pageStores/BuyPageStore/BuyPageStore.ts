import apiPaths from "@config/apiRoutes";
import { LoadingInfo, ProductData } from "@shared/types";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

export default class BuyPageStore {
  products = new Map<number, { name: string; price: number; count: number }>();
  discount: number = 0
  showForm: boolean = false
  
  name: string = ""
  phone: string = ""
  email: string = ""
  country: string = ""
  city: string = ""
  street: string = ""
  cardNumber: string = ""
  cardHolder: string = ""
  validThru: string = ""
  ccv: string = ""
  
  loadingInfo: LoadingInfo = {
    isLoading: false,
    isError: false,
    errorCode: "",
  };

  promocodes = new Map<string, number>([
    ['BULLY', 10],
    ['DONDAVIBES', 15],
    ['THISONEHEREISFAFA', 20],
    ['GOLDDIGGER', 20],
    ['24HOURS', 24],
    ['ALLTHELOVE', 30],
    ['BULLETPROOF', 40],
    ['PAYPERVIEW', 50]
  ])

  constructor() {
    makeObservable(this, {
      products: observable,
      loadingInfo: observable,
      promocodes: observable,
      discount: observable,
      showForm: observable,
      name: observable,
      phone: observable,
      email: observable,
      country: observable,
      city: observable,
      street: observable,
      cardNumber: observable,
      cardHolder: observable,
      validThru: observable,
      ccv: observable,
      loadProducts: action.bound,
      applyPromocode: action.bound,
      setShowForm: action.bound,
      setName: action.bound,
      setPhone: action.bound,
      setEmail: action.bound,
      setCountry: action.bound,
      setCity: action.bound,
      setStreet: action.bound,
      setCardNumber: action.bound,
      setCardHolder: action.bound,
      setValidThru: action.bound,
      setCcv: action.bound,
      totalPrice: computed,
      totalPriceWithDiscount: computed,
      isFormValid: computed,
    });
  }

  async loadProducts(productIds: Map<number, number>) {
    if (productIds.size === 0) {
      this.products.clear();
      this.loadingInfo.isLoading = false;
      return;
    }

    this.loadingInfo.isLoading = true;

    try {
      const uniqueIds = Array.from(productIds.keys());
      const res = await fetch(apiPaths.getProductsByIds(uniqueIds));

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const resJson = await res.json();
      console.log(resJson)
      const data = resJson.data;

      runInAction(() => {
        this.products.clear();
        data.forEach((product: ProductData) => {
          const count = productIds.get(product.id) || 1;
          this.products.set(product.id, {
            name: product.title,
            price: product.price,
            count,
          });
        });
      });
    } catch (e) {
      runInAction(() => {
        this.loadingInfo.isError = true;
        this.loadingInfo.errorCode = e instanceof Error ? e.message : "200";
      });
    } finally {
      runInAction(() => {
        this.loadingInfo.isLoading = false;
      });
    }
  }

  get totalPrice() {
    return Array.from(this.products.values()).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
  }

  get totalPriceWithDiscount() {
    return Array.from(this.products.values()).reduce(
      (sum, item) => sum + item.price * item.count * (100 - this.discount) / 100,
      0
    );
  }

  get isFormValid() {
    return this.name.trim() !== '' &&
      this.phone.trim() !== '' &&
      this.email.trim() !== '' &&
      this.country.trim() !== '' &&
      this.city.trim() !== '' &&
      this.street.trim() !== '' &&
      this.cardNumber.trim() !== '' &&
      this.cardHolder.trim() !== '' &&
      this.validThru.trim() !== '' &&
      this.ccv.trim() !== ''
  }

  applyPromocode(inputed: string) {
    if (this.promocodes.has(inputed.toUpperCase())) {
      this.discount = this.promocodes.get(inputed.toUpperCase()) || 0
    }
  }

  setShowForm(value: boolean) {
    this.showForm = value
  }

  setName(value: string) {
    this.name = value
  }

  setPhone(value: string) {
    this.phone = value
  }

  setEmail(value: string) {
    this.email = value
  }

  setCountry(value: string) {
    this.country = value
  }

  setCity(value: string) {
    this.city = value
  }

  setStreet(value: string) {
    this.street = value
  }

  setCardNumber(value: string) {
    this.cardNumber = value
  }

  setCardHolder(value: string) {
    this.cardHolder = value
  }

  setValidThru(value: string) {
    this.validThru = value
  }

  setCcv(value: string) {
    this.ccv = value
  }
}
