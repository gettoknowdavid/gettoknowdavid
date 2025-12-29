import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'David Michael II',
        short_name: 'David Michael II',
        description: 'David Michael II • Official Portfolio',
        start_url: '/',
        display: 'standalone',
        background_color: '#000',
        theme_color: '#FF0000FF',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}