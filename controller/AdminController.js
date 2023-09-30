import generateJWT from '../middleware/JWT.js';
import Admin from '../models/Admin.js'


const registerAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        const adminSaved = await admin.save();
        
        res.status(200).json(adminSaved);
    } catch (error) {
        const e = new Error('Could not register user');
        res.status(500).json({msg: e.message})
    }
}

const authenticate = async (req, res) => {
    const {email, password} = req.body;
    const admin = await Admin.findOne({email})

    if(!admin){
        const error = new Error('User does not exist');
        return res.status(403).json({msg: error.message})
    }

    if(await admin.comparePassword(password)){
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateJWT(admin.id)
        }); 
    }else{
        const error = new Error("incorrect password");
        return res.status(403).json({msg: error.message}); 
    }
}


export {
    registerAdmin,
    authenticate
}