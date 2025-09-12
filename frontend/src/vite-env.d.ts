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

// Declaraciones para React (fallback)
declare module 'react' {
  const React: any
  export = React
  export as namespace React
}

declare module 'react-dom/client' {
  const ReactDOMClient: any
  export = ReactDOMClient
  export as namespace ReactDOMClient
}

declare module 'react/jsx-runtime' {
  const JSXRuntime: any
  export = JSXRuntime
  export as namespace JSXRuntime
}

// Declaraciones para window.dataLayer (Google Analytics)
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
