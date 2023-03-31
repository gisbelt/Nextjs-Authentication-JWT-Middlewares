import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie'
import jwt from "jsonwebtoken";

export default function loginHandler(req: NextApiRequest, res: NextApiResponse){
    const { email, password } = req.body;

    // check if email and password are valid

    // if email exist, return success and a message

    // if password is correct

    if ( email === 'gis@gmail.com' && password === 'admin') {
        // if es valid, generate a token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: email,
            username: 'gis',
        }, 'secret') 
        // serialize token (generate cookie to set in the header)
        const serializedToken: string = serialize('myTokenName' as string, token as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 24 * 30,
            path: '/'
        })
        // we send the serialized token through the headers
        res.setHeader('Set-Cookie', serializedToken)

        return res.status(200).json('login succesfully');
    } 

    return res.status(401).json({ error: 'invalid email or password' });    
}
