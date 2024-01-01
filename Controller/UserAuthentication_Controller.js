const UserandPassword = require("../Schema/Username_Password")



const CreateUserPassword = async (req, res) => { 
    const { username, password } = req.body;
    try {
        const Ismatch = await UserandPassword.findOne({ username })
        if (Ismatch) {
            res.status(400).json({ status: "Not Allowed", message: "A User Already Exist for Given Username, try different Username" });
            return;
        }
        const data = await UserandPassword.create({ username, password });
        res.status(200).json({ status: "Successful", message: "Your Credentials has been Successfully Created" });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
}

// Check UserId and Password
const Check_UserId_Password = async (req, res) => {
    const { username, password } = req.body;
    try {
        const User = await UserandPassword.findOne({ username })
        if (User) {
            const IsPasswordMatch = await User.comparepasswords(password);
            if (IsPasswordMatch) {
                const JWTToken = User.createJWT(password);
                res.status(200).json({ status: "Successful", message: "You've successfully Signed In!", TOKEN: JWTToken })
                return;
            }
        }
        res.status(404).json({ status: "Not Allowed", message: "Un-Authorised User!. Check your credentials" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ status: "Something Went Wrong!" })
    }
}


module.exports = { 
    CreateUserPassword,
    Check_UserId_Password
}