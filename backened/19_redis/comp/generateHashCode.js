import bcrypt from "bcrypt";

async function getHashcode(password, n = 10) {
    const hashCode = await bcrypt.hash(password, n);
    return hashCode;
}
export default getHashcode;