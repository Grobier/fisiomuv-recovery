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
}

// Declaraciones de módulos React
declare module 'react' {
  export const useState: any
  export const useEffect: any
  export const useCallback: any
  export const useMemo: any
  export const useRef: any
  export const createContext: any
  export const useContext: any
  export const useReducer: any
  export const StrictMode: any
  export const FC: any
  export const ComponentType: any
  export default any
}

declare module 'react-dom/client' {
  export const createRoot: any
}

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}
