import { promocodes } from "@/config/promocodes";
import { LoadingInfo, ProductData } from "@shared/types";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { loadProductsByIds } from "@/shared/productLoader";

type FormDataKeys = 'name' | 'phone' | 'email' | 'country' | 'city' | 'street' | 'cardNumber' | 'cardHolder' | 'validThru' | 'ccv';

export default class BuyPageStore {
  products = new Map<number, { name: string; price: number; count: number; isInStock: boolean }>();
  discount: number = 0
  showForm: boolean = false
  showModal: boolean = false
  modalType: "success" | "error" = "success"
  modalMessage: string = ""
  
  formData = {
    name: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    cardNumber: "",
    cardHolder: "",
    validThru: "",
    ccv: ""
  }
  
  loadingInfo: LoadingInfo = {
    isLoading: false,
    isError: false,
    errorCode: "",
  };

  constructor() {
    makeObservable(this, {
      products: observable,
      loadingInfo: observable,
      discount: observable,
      showForm: observable,
      showModal: observable,
      modalType: observable,
      modalMessage: observable,
      formData: observable,
      loadProducts: action.bound,
      applyPromocode: action.bound,
      setShowForm: action.bound,
      setFormField: action.bound,
      closeModal: action.bound,
      totalPrice: computed,
      totalPriceWithDiscount: computed,
      isFormValid: computed,
      hasInStockProducts: computed,
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
      const products = await loadProductsByIds(uniqueIds);

      runInAction(() => {
        this.products.clear();
        products.forEach((product: ProductData) => {
          const count = productIds.get(product.id) || 1;
          this.products.set(product.id, {
            name: product.title,
            price: product.price,
            count,
            isInStock: product.isInStock,
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
    return Array.from(this.products.values())
      .filter(item => item.isInStock)
      .reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
  }

  get totalPriceWithDiscount() {
    return Array.from(this.products.values())
      .filter(item => item.isInStock)
      .reduce(
        (sum, item) => sum + item.price * item.count * (100 - this.discount) / 100,
        0
      ).toFixed(2);
  }

  get hasInStockProducts() {
    return Array.from(this.products.values()).some(item => item.isInStock);
  }

  get isFormValid() {
    const cardNumberDigits = this.formData.cardNumber.replace(/\s/g, '');
    const cardNumberValid = cardNumberDigits.length === 16 && !isNaN(Number(cardNumberDigits));
    
    const ccvValid = this.formData.ccv.length === 3 && !isNaN(Number(this.formData.ccv));
    
    const validThruParts = this.formData.validThru.split('/');
    const validThruValid = validThruParts.length === 2 &&
      validThruParts[0].length === 2 && !isNaN(Number(validThruParts[0])) &&
      validThruParts[1].length === 2 && !isNaN(Number(validThruParts[1])) &&
      Number(validThruParts[0]) >= 1 && Number(validThruParts[0]) <= 12;

    return this.formData.name.trim() !== '' &&
      this.formData.phone.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.country.trim() !== '' &&
      this.formData.city.trim() !== '' &&
      this.formData.street.trim() !== '' &&
      cardNumberValid &&
      this.formData.cardHolder.trim() !== '' &&
      validThruValid &&
      ccvValid
  }

  applyPromocode(inputed: string) {
    if (promocodes.has(inputed.toUpperCase())) {
      this.discount = promocodes.get(inputed.toUpperCase()) || 0
      this.showModal = true
      this.modalType = "success"
      this.modalMessage = `Promocode applied! ${this.discount}% discount`
    } else {
      this.showModal = true
      this.modalType = "error"
      this.modalMessage = "Invalid promocode"
    }
  }

  closeModal() {
    this.showModal = false
  }

  setShowForm(value: boolean) {
    this.showForm = value
  }

  setFormField(field: FormDataKeys, value: string) {
    if (this.formData.hasOwnProperty(field))
      this.formData[field] = value
  }
}
