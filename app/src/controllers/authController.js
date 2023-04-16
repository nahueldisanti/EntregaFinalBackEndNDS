import AuthServices from '../Services/authServices.js'
const authServices = new AuthServices();

export default class AuthController {

    async register(req, res) {
        try {
            const newUser = await authServices.register(req.body) 
            res.status(200).json(newUser)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async login(req, res) {
        try{    
            const user = await authServices.login(req.body)
            res.cookie('token-cookie', user.token , { httpOnly: true });
            res.status(200).json({token: user.token})
        }catch(error){
            res.status(403).json({message: error.message})
        }
    }
}