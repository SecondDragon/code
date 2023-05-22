/* eslint-disable react/jsx-props-no-spreading */
import React, {
  createContext, useMemo, useState, useContext,
} from 'react';
import { IPropChild } from './types';

interface IStore<T> {
  key: string;
  store: T;
  setStore: (payload: Partial<T>) => void;
}

function getCxtProvider<T>(
  key:string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>,
) {
  return ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultValue);
    const value = useMemo(() => ({
      key,
      store,
      setStore: (payload = {}) => setStore((state) => ({
        ...state,
        ...payload,
      })),
    }), [store]);

    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
}

const cxtCache: Record<string, Cxt> = {};

class Cxt<T = any> {
  defaultStore: IStore<T>;

  AppContext: React.Context<IStore<T>>;

  Provider: ({ children }: IPropChild) => JSX.Element;

  constructor(key: string, defaultValue: T) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };
    this.AppContext = createContext(this.defaultStore);
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
    cxtCache[key] = this;
  }
}

export function useAppContext<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>;
  const app = useContext(cxt.AppContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
}

export function connectFactory<T>(
  key: string,
  defaultValue: T,
) {
  const cxt = cxtCache[key];
  let CurCxt: Cxt<T>;
  if (cxt) {
    CurCxt = cxt;
  } else {
    CurCxt = new Cxt<T>(key, defaultValue);
  }

  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  );
}
