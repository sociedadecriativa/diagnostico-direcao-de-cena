// Type shim for @cloudflare/vite-plugin
declare module '@cloudflare/vite-plugin' {
  import { Plugin } from 'vite';
  export function cloudflare(options?: {
    auxiliaryWorkers?: Array<{ configPath: string }>;
    [key: string]: unknown;
  }): Plugin | Plugin[];
}
