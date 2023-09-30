import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const checkAuth = async (req, res, next) => {
    const {authorization}= req.headers;
    if(authorization && authorization.startsWith('Bearer'))
    {
        let token;
        token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id).select("-password");
        return next();
    }

    if(!token)
    {
        const error = new Error('Token no valido o inexistente');
        res.json(403).json({msg: error.messsage});
    }

    next();
}

export default checkAuth;