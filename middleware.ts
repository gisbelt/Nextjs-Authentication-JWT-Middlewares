import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { jwtVerify, JWTVerifyOptions } from "jose";

export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get('myTokenName')?.value

    // if (request.nextUrl.pathname.includes('/dashboard')) { 
        if(cookie === undefined) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET) // convert secret to Uint8Array
            const options: JWTVerifyOptions = { algorithms: ['HS256'] }; //json web token uses agorithm "HS256" by default
            const { payload } = await jwtVerify(cookie, secret, options)
            console.log(payload);
            return NextResponse.next()
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    // }
    // continue with the other routes
    // return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard']
}