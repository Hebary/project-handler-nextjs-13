//this middleware redirects user to login if isn't auth
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {

    if(req.nextUrl.pathname === '/') {
        
        const reqPage = req.nextUrl.pathname;
        const token = req.cookies.get('token');
        //copy all the url
        if(!token){
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`
        return NextResponse.redirect(url)
        }
    
    }
}

export const config = {
    matcher:['/']
}