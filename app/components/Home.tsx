'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Anime {
  id: string
  title: string
  description: string
  image?: string
  rating?: number
  status?: 'ongoing' | 'completed'
}

export default function Home() {
  const [selectedAnime, setSelectedAnime] = useState<string | null>(null)
  const [watchlist, setWatchlist] = useState<string[]>([])

  const anime: Anime[] = [
    {
      id: '1',
      title: 'Solo Leveling',
      description: "Humanity's weakest hunter becomes the strongest.",
      rating: 9.1,
      status: 'completed',
    },
    {
      id: '2',
      title: 'Jujutsu Kaisen',
      description: 'Sorcerers battle cursed spirits.',
      rating: 8.9,
      status: 'ongoing',
    },
    {
      id: '3',
      title: 'Demon Slayer',
      description: 'A swordsman fights demons to save his sister.',
      rating: 8.8,
      status: 'ongoing',
    },
  ]

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-6 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            AniSphere
          </h1>
        </Link>

        <div className="flex gap-4 items-center">
          <span className="text-zinc-400 text-sm">
            Watchlist: {watchlist.length}
          </span>
          <button className="hover:bg-zinc-800 transition px-4 py-2 rounded-xl border border-zinc-700">
            Login
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition px-4 py-2 rounded-xl font-bold">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-24 px-6">
        <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Discover Amazing Anime
        </h2>

        <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Track anime, build watchlists, and discover trending series. Your
          ultimate anime companion.
        </p>

        <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition px-8 py-4 rounded-2xl text-xl font-bold shadow-lg shadow-pink-500/50">
          Start Watching
        </button>
      </section>

      {/* Anime Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20 max-w-7xl mx-auto">
        {anime.map((show) => (
          <div
            key={show.id}
            className="group bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 hover:border-pink-500/50 rounded-3xl p-6 transition duration-300 hover:shadow-xl hover:shadow-pink-500/20 cursor-pointer"
            onClick={() => setSelectedAnime(show.id)}
          >
            {/* Image Placeholder */}
            <div className="h-52 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl mb-6 flex items-center justify-center border border-zinc-800 group-hover:border-pink-500/30 transition overflow-hidden relative">
              <div className="text-zinc-600 text-4xl">📺</div>
              {show.status && (
                <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  {show.status === 'ongoing' ? '🔴 Ongoing' : '✅ Completed'}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-400 transition">
              {show.title}
            </h3>

            <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
              {show.description}
            </p>

            {show.rating && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold">{show.rating}/10</span>
              </div>
            )}

            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition py-3 rounded-2xl font-bold">
                View Anime
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWatchlist(show.id)
                }}
                className={`py-3 px-4 rounded-2xl font-bold transition ${
                  watchlist.includes(show.id)
                    ? 'bg-pink-500 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                {watchlist.includes(show.id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      {selectedAnime && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedAnime(null)}
        >
          <div
            className="bg-zinc-900 rounded-3xl p-8 max-w-md border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">
              {anime.find((a) => a.id === selectedAnime)?.title}
            </h2>
            <p className="text-zinc-400 mb-6">
              {anime.find((a) => a.id === selectedAnime)?.description}
            </p>
            <button
              className="w-full bg-pink-500 py-3 rounded-2xl font-bold hover:bg-pink-600 transition"
              onClick={() => setSelectedAnime(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
