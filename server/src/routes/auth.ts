import { Router, Request, Response} from "express";
import { User } from "../models/User";
import { isEmpty } from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import auth from "../middlewares/auth";
import user from "../middlewares/user";

const me = async(_:Request, res: Response) => {
    return res.json(res.locals.user);
}

const signup = async(req: Request, res: Response) => {
    try {
        // 이미 사용중인 이메일인지 확인
        const emailUser = await User.findOne({ email: req.body.email });

        if(emailUser) {
            return res.json({ success: false, error: "email already exist." })
        }

        const user = new User(req.body);

        user.save((err, doc) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let errors : any = {};

        if (isEmpty(email)) errors.email = "please enter your email.";
        if (isEmpty(password)) errors.password = "please enter your password.";
        if (Object.keys(errors).length > 0) {
            return res.json(400).json(errors);
        }
        
        const user = await User.findOne({ email });

        if(!user) return res.status(404).json({ email: "this email is not registered." });

        const passwordMatches = await bcrypt.compare(password, user.password);

        if(!passwordMatches) {
            return res.status(401).json({ password: 'Oops! wrong password!' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        // 쿠키 저장
        res.set("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            secure: false
        }));

        return res.json({ user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const logout = async(_: Request, res: Response) => {
    res.set(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        })
    );

    res.status(200).json({ success: true })
};

const router = Router();

router.get("/me", user, auth, me);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", user, auth, logout);

export default router;