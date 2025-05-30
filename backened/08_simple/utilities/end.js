
export function end(res , message , statusCode = 200){
    res.status(statusCode).send(message);
}