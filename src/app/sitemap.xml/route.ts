import { SUPPORTED_LOCALES_NOEN } from '@/i18n'
import type { Locale } from '@/types/json'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webptopdf.pro'

  // 生成 sitemap XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 根路径 -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${SUPPORTED_LOCALES_NOEN.map((locale: Locale) => `
  <!-- ${locale} 语言版本 -->
  <url>
    <loc>${baseUrl}/${locale}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
  <url>
    <loc>${baseUrl}/r</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`

  // 返回正确的 Content-Type
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      // 添加缓存控制
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
} 