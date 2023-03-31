import { serialize } from 'cookie';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default function logoutHandler(req:NextApiRequest, res:NextApiResponse) {
    const { myTokenName } = req.cookies
    if( !myTokenName ) return res.status(401).json({ error: 'no token' })

    // const { email, usename } = verify( myTokenName, process.env.JWT_SECRET)
    try {
        // verify the token is valid 
        verify( myTokenName, process.env.JWT_SECRET)
        // serialize token (generate cookie to set in the header)
        const serializedToken = serialize('myTokenName', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 0, //expires in 0 days
            path: '/'
        })
        // we send the serialized token through the headers
        res.setHeader('Set-Cookie', serializedToken)
        return res.status(200).json('logout succesfully');
    } catch (error) {
        return res.status(401).json({ error: 'invalid token' });
    }
}