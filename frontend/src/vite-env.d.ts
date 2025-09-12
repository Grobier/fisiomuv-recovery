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
  export * from 'react'
}

declare module 'react-dom/client' {
  export * from 'react-dom/client'
}

declare module 'react/jsx-runtime' {
  export * from 'react/jsx-runtime'
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
