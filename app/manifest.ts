import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Hostel Pro',
        short_name: 'HostelPro',
        description: 'Best hostel booking platform in Bangladesh',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#059669',
        icons: [
            {
                src: '/brand/logo.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/brand/logo.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
