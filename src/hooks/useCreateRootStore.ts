'use client'

import RootStore from "@/stores/RootStore";
import { enableStaticRendering } from "mobx-react-lite";

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer)

let clientStore: RootStore | undefined;

export const useCreateRootStore = (): RootStore => {
  const initRootStore = (): RootStore => {
    const rootStore = new RootStore()
    return rootStore;
  };

  let result: RootStore;

  if (isServer) {
    result = initRootStore();
  } else {
    clientStore = clientStore ?? initRootStore();
    result = clientStore;
  }
  return result;
};