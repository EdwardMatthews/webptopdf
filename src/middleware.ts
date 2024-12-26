import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Locale } from '@/types/json'

// 支持的语言列表
const SUPPORTED_LOCALES: Locale[] = ['en', 'zh']
const DEFAULT_LOCALE: Locale = 'en'

// 获取请求的语言
function getLocale(request: NextRequest): Locale {
  const userAgent = request.headers.get('user-agent') || '';
  if (userAgent.toLowerCase().includes('googlebot')) {
    return DEFAULT_LOCALE; // 对爬虫直接返回默认语言
  }
  // 检查 URL 中的语言参数
  const pathname = request.nextUrl.pathname
  const pathnameLocale = pathname.split('/')[1] as Locale

  if (pathnameLocale && SUPPORTED_LOCALES.includes(pathnameLocale)) {
    return pathnameLocale
  }

  // 检查 Accept-Language 头
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0] as Locale

    if (SUPPORTED_LOCALES.includes(preferredLocale)) {
      return preferredLocale
    }
  }

  // 默认返回英语
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 如果是根路径，不做重定向
  if (pathname === '/') {
    return;
  }

  // 如果路径是 /en，返回 404
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return new NextResponse(null, { status: 404 })
  }

  // 获取路径中的语言代码
  const pathnameLocale = pathname.split('/')[1]

  // 检查语言代码是否有效（除了 en）
  if (pathnameLocale && !SUPPORTED_LOCALES.includes(pathnameLocale as Locale)) {
    return new NextResponse(null, { status: 404 })
  }

  // 如果路径已经包含其他语言代码，不做任何处理
  if (SUPPORTED_LOCALES.some(locale => locale !== 'en' && pathname.startsWith(`/${locale}`))) {
    return
  }

  // 获取合适的语言
  const locale = getLocale(request)

  // 如果是英文且不在根路径，重定向到根路径
  if (locale === 'en') {
    const newUrl = new URL(pathname, request.url)
    newUrl.pathname = pathname
    newUrl.search = request.nextUrl.search
    return NextResponse.redirect(newUrl)
  }

  // 对于其他语言，添加语言代码
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  newUrl.search = request.nextUrl.search
  return NextResponse.redirect(newUrl)
}

export const config = {
  // 匹配所有路径，除了 api 路由、静态文件等
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|logo.svg).*)']
} 