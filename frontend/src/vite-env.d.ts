// Declaraciones de tipos para Vite
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly NODE_ENV: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Declaraciones para window.dataLayer (Google Analytics)
declare global {
  interface Window {
    dataLayer: any[]
  }
}
