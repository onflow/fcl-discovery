import React, {
  ComponentProps,
  createContext,
  useContext,
  useState,
} from 'react'

export type Route<T> = {
  path: string
  component: React.ComponentType<T>
}

export type RouterContextType<T extends [...Route<any>[]] = any> = {
  routes: T
  navigate: <C extends T[number]>(
    route: C['path'],
    props: ComponentProps<C['component']>,
  ) => void
}

export const RouterContext = createContext<RouterContextType | undefined>(
  undefined,
)

type ActiveRoute<T extends Route<any>> = {
  path: T['path']
  props: ComponentProps<T['component']>
}

type RouteByPath<
  Routes extends [...Route<any>[]],
  Path extends Routes[number]['path'],
> = Extract<Routes[number], { path: Path }>

type RouterProviderProps<
  Routes extends [...Route<any>[]],
  DefaultRoute extends Routes[number]['path'],
> = {
  routes: Routes
  defaultRoute: DefaultRoute
  defaultRouteProps: ComponentProps<
    RouteByPath<Routes, DefaultRoute>['component']
  >
}

export const Router = <
  Routes extends [...Route<any>[]],
  DefaultRoute extends Routes[number]['path'],
>({
  routes,
  defaultRoute,
  defaultRouteProps,
}: RouterProviderProps<Routes, DefaultRoute>) => {
  const [currentRoute, setCurrentRoute] = useState<ActiveRoute<Routes[number]>>(
    {
      path: defaultRoute,
      props: defaultRouteProps,
    },
  )
  const Component = routes.find(
    route => route.path === currentRoute.path,
  )?.component

  return (
    <RouterContext.Provider
      value={{
        routes,
        navigate: (path, props) => setCurrentRoute({ path, props }),
      }}
    >
      <Component {...currentRoute.props} />
    </RouterContext.Provider>
  )
}

export const useRouterContext = () => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider')
  }
  return context
}
