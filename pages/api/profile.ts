import { NextApiRequest, NextApiResponse } from "next";
import { verify, Secret, JwtPayload } from "jsonwebtoken";

export default function profileHandler(req: NextApiRequest, res: NextApiResponse) {

    const { myTokenName } = req.cookies;
    if( !myTokenName ) return res.status(401).json({ error: 'no token' })

    try {
        const secret: Secret = process.env.JWT_SECRET as string;
        const user: JwtPayload = verify(myTokenName, secret) as JwtPayload;
        console.log(user);
        return res.status(200).json({email: user.email, username: user.username});
    } catch (error) {
        return res.status(401).json({ error: 'invalid token' });
    }

}   