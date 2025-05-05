import { getCookie } from '@/utils/cookie';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// *** THE SEQUENCE OF CHECKING IS IMPORTANT ***
export async function middleware(request: NextRequest) {
    //  ! Check if the agent is browser
    const userAgent = request.headers.get('user-agent');
    if (!userAgent || !isBrowserUserAgent(userAgent)) return new NextResponse(null, { status: 403, statusText: 'Forbidden: Only browser requests allowed' });

    const AToken = await getCookie('authToken');

    const requestedPath = request.nextUrl.pathname;
    const skipPaths = ['login', 'verify-otp', 'test', 'forgot-password', 'student/group-registration', 'signup'];

    if (skipPaths.some(prefix => requestedPath.startsWith(`/${prefix}`)) && !AToken)
        return NextResponse.next();

    //  ! Check if the user has no Access Token
    if (!AToken) return NextResponse.redirect(new URL('/login', request.url));

    return NextResponse.next();
}

// Helper function to check if the user agent is from a browser
function isBrowserUserAgent(userAgent: string): boolean {
    const browserPatterns = [/Mozilla\/5.0/, /Chrome/, /Safari/, /Firefox/, /Edge/, /Opera/];
    return browserPatterns.some(pattern => pattern.test(userAgent));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|images|_next/static|_next/image|favicon.ico).*)',
    ],
}