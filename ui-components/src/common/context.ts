import {
  createContext,
  createElement,
  useContext,
} from 'react';

type ProviderProps<T extends object | undefined = undefined> = T & {
  children: React.ReactNode;
};

// TODO: Provider should *always* take children with no exceptions.
// Unfortunately, it would seem there occurs a type error when the factory props are not provided.
// Perhaps it needs to be set to "never" or equivalent.
export const contextFactory = <T, U extends object | undefined = undefined>(
  valueFactory: (props: U) => T,
  errorId: string,
) => {
  const Context = createContext<T | undefined>(undefined);

  const Provider = (props: ProviderProps<U>) => {
    const { children } = props;
    const value = valueFactory(props);

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
