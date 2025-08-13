// types/assets.d.ts
declare module '*.gif' {
  const src: number; // Metro returns a numeric module id for local assets
  export default src;
}
declare module '*.png' { const src: number; export default src; }
declare module '*.jpg' { const src: number; export default src; }
declare module '*.jpeg' { const src: number; export default src; }
declare module '*.webp' { const src: number; export default src; }

// (optional, you already use SVG as React components)
declare module '*.svg' {
  import * as React from 'react';
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
