/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// YAML module declaration
declare module '*.yaml' {
  const content: any;
  export default content;
}

declare module '*.yml' {
  const content: any;
  export default content;
}
