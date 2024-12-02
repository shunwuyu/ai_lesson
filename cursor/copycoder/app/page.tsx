// src/app/page.tsx
'use client';

import { Play, Pause, Shuffle, Repeat } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: 'url(https://picsum.photos/1200/600)' }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl font-bold">shunwu: 欢迎你</h1>
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-secondary-dark p-4 rounded-lg">
            <img src="https://picsum.photos/280/280" alt="Playlist" className="w-full rounded-lg mb-2" />
            <h3 className="text-lg font-bold">Playlist Name</h3>
            <p className="text-gray-400">Artist Name</p>
          </div>
          <div className="bg-secondary-dark p-4 rounded-lg">
            <img src="https://picsum.photos/280/280" alt="Playlist" className="w-full rounded-lg mb-2" />
            <h3 className="text-lg font-bold">Playlist Name</h3>
            <p className="text-gray-400">Artist Name</p>
          </div>
          <div className="bg-secondary-dark p-4 rounded-lg">
            <img src="https://picsum.photos/280/280" alt="Playlist" className="w-full rounded-lg mb-2" />
            <h3 className="text-lg font-bold">Playlist Name</h3>
            <p className="text-gray-400">Artist Name</p>
          </div>
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Song List</h2>
        <div className="bg-secondary-dark p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Track Name</h3>
            <div className="flex items-center">
              <button className="mr-2">
                <Shuffle />
              </button>
              <button className="mr-2">
                <Repeat />
              </button>
              <button>
                <Play />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src="https://picsum.photos/50/50" alt="Artist" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <h4 className="text-lg font-bold">Track Name</h4>
                <p className="text-gray-400">Artist Name</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-gray-400">1.2M</p>
              <button className="ml-2">
                <Play />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src="https://picsum.photos/50/50" alt="Artist" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <h4 className="text-lg font-bold">Track Name</h4>
                <p className="text-gray-400">Artist Name</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-gray-400">1.2M</p>
              <button className="ml-2">
                <Play />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Throwback Jams</h2>
        <div className="bg-secondary-dark p-4 rounded-lg overflow-x-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-secondary-dark p-4 rounded-lg">
              <img src="https://picsum.photos/280/280" alt="Album" className="w-full rounded-lg mb-2" />
              <h3 className="text-lg font-bold">Album Name</h3>
              <p className="text-gray-400">Artist Name</p>
            </div>
            <div className="bg-secondary-dark p-4 rounded-lg">
              <img src="https://picsum.photos/280/280" alt="Album" className="w-full rounded-lg mb-2" />
              <h3 className="text-lg font-bold">Album Name</h3>
              <p className="text-gray-400">Artist Name</p>
            </div>
            <div className="bg-secondary-dark p-4 rounded-lg">
              <img src="https://picsum.photos/280/280" alt="Album" className="w-full rounded-lg mb-2" />
              <h3 className="text-lg font-bold">Album Name</h3>
              <p className="text-gray-400">Artist Name</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;