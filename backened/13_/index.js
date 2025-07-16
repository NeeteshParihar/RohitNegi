import bcrypt from  "bcrypt"; // import the bcrypt library 

async function hashPasword1(password){

    // bcrypt adds the  differ - differ salt  to the password and encrypt the password using hashing 
    // bcrypt ke algorithm ko 2^10 baar run kardo we can pas diiffernt differnt numbers
     
    console.time("hash");
    const hashCode =  await bcrypt.hash(password , 10) ;
    console.timeEnd("hash");
    console.log(hashCode);

}


// hashPasword("Neetesh");

async function hashPasword2(password){

    try{

        const salt = await bcrypt.genSalt(11);  // 10 rounds karke salt generatation 
        const hashCode = await   bcrypt.hash(password , salt );
        console.log(salt , hashCode);

        const ans = await  bcrypt.compare(password , hashCode); // hascode mai se password ko verify karlo 

        console.log(ans);

        const wrongPass = "N2t1sh";
        const ans2 = await bcrypt.compare(wrongPass , hashCode);
        console.log(ans2);

    }catch(err){

        console.log(err.message);

    }

}

hashPasword2("Neetesh");