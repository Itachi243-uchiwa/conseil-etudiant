import type { ThreeElements } from '@react-three/fiber'

// React 18 + new JSX transform utilise React.JSX.IntrinsicElements,
// pas le global JSX.IntrinsicElements qu'augmente R3F — on comble l'écart.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
