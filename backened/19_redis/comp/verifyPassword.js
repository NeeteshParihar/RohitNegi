import bcrypt from "bcrypt";

async function verifyUserPassword(password, hashCode){
    return await bcrypt.compare( password, hashCode);
}

export default verifyUserPassword;

