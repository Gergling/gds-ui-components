import { createContext, createElement, useContext } from 'react';

export const contextFactory = <T>(
  valueFactory: () => T,
  errorId: string,
) => {
  const Context = createContext<T | undefined>(undefined);

  const Provider = ({ children }: {
    children: React.ReactNode;
  }) => {
    const value = valueFactory();

    return createElement(Context.Provider, { value }, children);
  };

  const useContextHook = (): T => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`Context hook must be used within the generated provider: ${errorId}`);
    }
    return context;
  };

  return { Context, Provider, useContextHook };
};
