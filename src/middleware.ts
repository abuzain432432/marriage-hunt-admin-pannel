'use server';
import { NextRequest, NextResponse } from 'next/server';
import {
  LINKS,
  protectedRoutes,
  publicRoutes,
  sitesRoutes,
} from '@/lib/contants';

import { UserType } from '@/types';
import { getMeAction } from '@/server/actions';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  const isPublicPath = publicRoutes.some(route => route === path);
  const isPrivatePath = protectedRoutes.some(route => route === path);

  let user: UserType | undefined;
  try {
    const userActionRes = await getMeAction();
    if (userActionRes.success) {
      user = userActionRes.success.user;
    }
  } catch (err) {
    console.info(err);
  }

  if (isPublicPath && user && user?.role === 'admin') {
    return NextResponse.redirect(
      new URL(LINKS.DASHBOARD, req.nextUrl)
    );
  } else if (isPrivatePath && user?.role !== 'admin') {
    return NextResponse.redirect(new URL(LINKS.LOGIN, req.nextUrl));
  }
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
