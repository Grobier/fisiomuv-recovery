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

// Declaraciones globales mínimas
declare global {
  interface Window {
    dataLayer: any[]
  }
}
