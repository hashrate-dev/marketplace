# NFT Marketplace (Next.js + wagmi/RainbowKit + Hardhat + Supabase)

Este repositorio contiene un esqueleto de marketplace NFT listo para desplegar en **Vercel** (frontend Next.js) y **Supabase** (auth y datos), con contratos en **Hardhat**.

## Stack

- **Frontend**: Next.js (App Router, TypeScript, TailwindCSS)
- **Web3**: wagmi + RainbowKit + WalletConnect
- **Backend-as-a-service**: Supabase (`@supabase/supabase-js` + `@supabase/ssr`)
- **Smart contracts**: Hardhat + Solidity, contrato `Marketplace.sol`

## Estructura rápida

- `app/` – rutas de Next.js
  - `app/page.tsx` – landing principal del marketplace con botón de wallet
  - `app/(auth)/login/page.tsx` – ejemplo de login con Supabase por magic link
- `lib/supabaseClient.ts` – helper para crear el cliente de Supabase en el navegador
- `contracts/Marketplace.sol` – contrato sencillo de marketplace (listar, comprar, cancelar)
- `scripts/deploy.ts` – script Hardhat para desplegar el contrato
- `hardhat.config.ts` – configuración de Hardhat

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

Configura:

- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` – tu Project ID de WalletConnect
- `NEXT_PUBLIC_SUPABASE_URL` – URL del proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` – clave pública de Supabase

## Instalación de dependencias

En local (requiere Node.js instalado):

```bash
npm install
```

> Nota: el `package.json` ya lista las dependencias necesarias. Ajusta versiones si lo necesitas antes de instalar.

## Ejecutar en desarrollo

Servidor Next.js:

```bash
npm run dev
```

Luego abre `http://localhost:3000`.

## Contratos (Hardhat)

Compilar y desplegar en una red local:

```bash
npx hardhat compile
npx hardhat node
npm run deploy:local
```

El script `scripts/deploy.ts` imprimirá la dirección del contrato `Marketplace`.

## Deploy en Vercel

1. Crea un nuevo proyecto en Vercel apuntando a este repositorio.
2. Asegúrate de que el directorio de la app sea la raíz (donde está `package.json`).
3. En la sección **Environment Variables** de Vercel, añade las mismas variables que en `.env.local`.
4. Usa los comandos por defecto de Vercel para apps Next.js:
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Conexión con Supabase

- En `app/(auth)/login/page.tsx` tienes un ejemplo mínimo de **login por magic link** usando Supabase.
- En producción puedes:
  - Guardar en Supabase metadatos de colecciones, activity feed, favoritos, etc.
  - Unir identidad de wallet (wagmi) con usuario de Supabase.

## Próximos pasos sugeridos

- Añadir modelos de datos en Supabase (colecciones, listings, bids, activity).
- Conectar el frontend al contrato `Marketplace` usando wagmi/viem (lectura de listings, ejecución de `list`, `buy`, `cancel`).
- Integrar almacenamiento de metadatos en IPFS o similar y vincularlo con Supabase.
