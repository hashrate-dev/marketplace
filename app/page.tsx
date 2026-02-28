"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">NFT Market</span>
          </div>
          <ConnectButton />
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Marketplace NFT listo para Web3
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Next.js + wagmi/RainbowKit + Supabase + Hardhat. Usa este
            esqueleto para listar colecciones, publicar NFTs y operar sobre
            contratos EVM.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card
            title="Explorar marketplace"
            description="Pantalla principal donde listarás colecciones, filtros y actividad reciente."
          />
          <Card
            title="Publicar NFTs"
            description="Flujo para mintear NFTs contra el contrato y guardar metadatos en Supabase/IPFS."
          />
          <Card
            title="Panel de creador"
            description="Gestión de colecciones, royalties y estadísticas para creadores."
          />
        </div>

        <div className="mt-4 text-sm text-slate-400">
          <p>
            Empieza editando el componente de esta página y creando tus propias
            rutas en <code className="rounded bg-slate-900 px-1 py-0.5">app/</code>.
          </p>
          <p className="mt-1">
            Recuerda configurar tus variables de entorno de Supabase y
            WalletConnect antes de ejecutar en producción.
          </p>
        </div>

        <div className="mt-4 flex gap-3 text-sm">
          <Link
            href="https://nextjs.org/docs"
            className="rounded border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-slate-500 hover:bg-slate-900"
          >
            Docs Next.js
          </Link>
          <Link
            href="https://rainbowkit.com/docs/introduction"
            className="rounded border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-slate-500 hover:bg-slate-900"
          >
            Docs RainbowKit
          </Link>
          <Link
            href="https://supabase.com/docs"
            className="rounded border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-slate-500 hover:bg-slate-900"
          >
            Docs Supabase
          </Link>
        </div>
      </section>
    </main>
  );
}

function Card(props: { title: string; description: string }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
      <h2 className="text-base font-semibold">{props.title}</h2>
      <p className="mt-1 text-xs text-slate-300">{props.description}</p>
    </article>
  );
}

