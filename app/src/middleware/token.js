import 'dotenv/config'
import jwt from 'jsonwebtoken'

const checkToken = (req, res, next ) => {

    let token = req.cookies || req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token){
        res.redirect('/auth/login')
        return res.json({
            message: 'No hay token proporcionado'
        })
    }
    try {
        const tempToken = token.split(' ')
        if (tempToken.length == 2) {
            token = tempToken[1]
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Falló la autenticación del token'
        });
    }
}

export default checkToken