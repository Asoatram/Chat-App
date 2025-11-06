import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

  

  if (request.nextUrl.pathname === '/chat') {
    return NextResponse.next()
  }

  // Redirect to /chat if not already there
  return NextResponse.redirect(new URL('/chat', request.url))
}


export const config = {
  matcher: [
    /*
      Apply to all routes except:
      - _next (internal assets)
      - api routes
      - static files with extensions
    */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|ico|css|js|webp)$).*)',
  ],
}