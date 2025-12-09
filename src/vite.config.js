import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt',
            includeAssets: ['icons/icon-192', 'incon/icon-512.png'],
            manifest: {
                name: 'SteamList Soundtracks',
                short_name: 'SteamList',
                description: 'Stearch albums, view tracks, and manage your cart.',
                start_url: '/',
                display: 'standalone',
                background_color: '#1e1e2e',
                theme_color: '#7209b7',
                icons: [
                    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
                    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,svg']
            }
        })
    ]
});