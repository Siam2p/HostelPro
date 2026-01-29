import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://hostel-pro.vercel.app'
    const pages = [
        '',
        '/hostels',
        '/about',
        '/contact',
        '/faq',
        '/guide',
        '/help',
        '/privacy',
        '/terms',
        '/refund',
        '/cookies',
        '/report',
        '/login',
        '/signup',
    ]

    return pages.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' || page === '/hostels' ? 'daily' : 'monthly',
        priority: page === '' ? 1 : page === '/hostels' ? 0.9 : 0.7,
    }))
}
