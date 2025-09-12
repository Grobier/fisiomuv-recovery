// Declaraciones de tipos para Vite
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly NODE_ENV: string
  readonly VITE_GA_TRACKING_ID?: string
  readonly PROD?: boolean
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Declaraciones globales
declare global {
  interface Window {
    dataLayer: any[]
  }
  
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
  
  namespace React {
    type FC<P = {}> = (props: P) => any
    type ComponentType<P = {}> = FC<P>
    
    function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void]
    function useEffect(effect: () => void | (() => void), deps?: any[]): void
    function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T
    function useMemo<T>(factory: () => T, deps: any[]): T
    function useRef<T>(initialValue: T): { current: T }
    function createContext<T>(defaultValue: T): any
    function useContext<T>(context: any): T
    function useReducer<R extends (state: any, action: any) => any, I>(
      reducer: R,
      initialArg: I,
      init?: (arg: I) => any
    ): [any, (action: any) => void]
    
    const StrictMode: any
  }
  
  const React: typeof React
  const useState: typeof React.useState
  const useEffect: typeof React.useEffect
  const useCallback: typeof React.useCallback
  const useMemo: typeof React.useMemo
  const useRef: typeof React.useRef
  const createContext: typeof React.createContext
  const useContext: typeof React.useContext
  const useReducer: typeof React.useReducer
  const StrictMode: typeof React.StrictMode
}

// Declaraciones de módulos
declare module 'react' {
  export = React
  export as namespace React
}

declare module 'react-dom/client' {
  function createRoot(container: Element | Document | DocumentFragment | null): {
    render(children: any): void
    unmount(): void
  }
  export { createRoot }
}

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}
