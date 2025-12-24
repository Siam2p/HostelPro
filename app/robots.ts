import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/manager/'],
        },
        sitemap: 'https://hostel-pro-2xl2.vercel.app/sitemap.xml',
    }
}
