import users from "../models/users";

async function getUser(req, res, next) {

    try {

        const { emailId } = req.body;
        if (!emailId) return res.status(400).json({ success: false, err: "emaildId is not found!" })

        const existingUser = await users.findOne({ emailId });
        req.existingUser = existingUser;
        next();

    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }

}

export default getUser;