import { action, makeObservable, observable } from 'mobx';
import type { pageName } from '@shared/types';
import RootStore from '../RootStore';

export default class NavbarStore {
  isMenuOpen = false;

  rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root
    makeObservable(this, {
      isMenuOpen: observable,
      setCurrentPage: action.bound,
      toggleMenu: action.bound,
      closeMenu: action.bound,
    });
  }

  setCurrentPage(page: pageName) {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
