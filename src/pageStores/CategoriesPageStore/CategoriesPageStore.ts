import { CategoryData, LoadingInfo } from "@/shared/types";
import { makeObservable, observable } from "mobx";
import { loadingDefaultInfo } from "@/config/defaults";

export default class CategoriesPageStore {
  categories: CategoryData[] = [];
  loadingInfo: LoadingInfo = loadingDefaultInfo;

  constructor(categories: CategoryData[] = []) {
    this.categories = categories;
    makeObservable(this, {
      categories: observable,
      loadingInfo: observable,
    });
  }
}
