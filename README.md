# retro-components

UI kit **Retro Y2K** para **React 18+**. Componentes en TypeScript, listos para usar, con estilos y gradientes retro.  
Funciona con Vite/Next.js. Exporta CSS propio.

---

## Requisitos
- React y React DOM **>= 18** (peer deps)
- (Opcional) Tailwind en tu app

---

## Instalación (usuario final)

```bash
# en tu proyecto
npm i retro-components
# si no tenés react instalado:
npm i react@18.2.0 react-dom@18.2.0

Importá el CSS de la librería (una sola vez)

Vite/React → src/main.tsx

import "retro-components/index.css"

No uses npm link para instalar esta lib
npm ls react react-dom
Debe haber una versión (la de tu proyecto).
Si hay más: borrá node_modules y package-lock.json y reinstalá.

