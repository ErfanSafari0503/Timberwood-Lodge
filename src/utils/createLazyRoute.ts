import { type ComponentType } from "react";

type ImportComponentFunction<T extends object> = () => Promise<{
  default: ComponentType<T>;
}>;

interface LazyRouteObject<T extends object> {
  Component: ComponentType<T>;
}

const createLazyRoute = <T extends object>(
  importFn: ImportComponentFunction<T>
) => {
  return {
    lazy: async (): Promise<LazyRouteObject<T>> => {
      const { default: Component } = await importFn();
      return {
        Component: Component,
      };
    },
  };
};

export { createLazyRoute };
