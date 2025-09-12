// Declaraciones de tipos para Vite
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly NODE_ENV: string
  readonly VITE_GA_TRACKING_ID?: string
  readonly PROD?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Declaraciones globales para React
declare global {
  interface Window {
    dataLayer: any[]
  }
  
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
  
  const React: any
  const useState: any
  const useEffect: any
  const useCallback: any
  const useMemo: any
  const useRef: any
  const createContext: any
  const useContext: any
  const useReducer: any
  const StrictMode: any
}

// Declaraciones de módulos
declare module 'react' {
  const React: any
  export = React
  export as namespace React
}

declare module 'react-dom/client' {
  function createRoot(container: any): any
  export { createRoot }
}

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}
