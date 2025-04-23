


const sanskritQuotes = [
    {
      quote: "सत्यं वद धर्मं चर",
      transliteration: "Satyaṁ vada dharmaṁ cara",
      meaning: "Speak the truth, follow righteousness."
    },
    {
      quote: "विद्या ददाति विनयं",
      transliteration: "Vidyā dadāti vinayaṁ",
      meaning: "Knowledge gives humility."
    },
    {
      quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
      transliteration: "Karmaṇyevādhikāraste mā phaleṣu kadācana",
      meaning: "You have the right to perform your actions, but not the fruits of the actions."
    },
    {
      quote: "अहिंसा परमो धर्मः",
      transliteration: "Ahiṁsā paramo dharmaḥ",
      meaning: "Non-violence is the highest duty."
    },
    {
      quote: "सर्वे भवन्तु सुखिनः",
      transliteration: "Sarve bhavantu sukhinaḥ",
      meaning: "May all be happy."
    },
    {
      quote: "धर्मो रक्षति रक्षितः",
      transliteration: "Dharmo rakṣati rakṣitaḥ",
      meaning: "Dharma protects those who protect it."
    },
    {
      quote: "योगः कर्मसु कौशलम्",
      transliteration: "Yogaḥ karmasu kauśalam",
      meaning: "Yoga is skill in action."
    },
    {
      quote: "उद्धरेदात्मनात्मानं",
      transliteration: "Uddharedātmanātmānaṁ",
      meaning: "Elevate yourself by yourself."
    },
    {
      quote: "न त्वं कामये राज्यं",
      transliteration: "Na tvaṁ kāmaye rājyaṁ",
      meaning: "I do not desire kingdom or pleasures."
    },
    {
      quote: "श्रेयो हि ज्ञानमभ्यासाज्ज्ञानाद्ध्यानं विशिष्यते",
      transliteration: "Śreyo hi jñānamabhyāsājjñānāddhyānaṁ viśiṣyate",
      meaning: "Better than practice is knowledge, better than knowledge is meditation."
    },
    {
      quote: "अनित्यमसुखं लोकम्",
      transliteration: "Anityamasukhaṁ lokam",
      meaning: "This world is temporary and full of suffering."
    },
    {
      quote: "शरीरमाद्यं खलु धर्मसाधनम्",
      transliteration: "Śarīramādyaṁ khalu dharmasādhanam",
      meaning: "The body is indeed the foremost instrument for practicing dharma."
    },
    {
      quote: "मातृदेवो भव",
      transliteration: "Mātṛdevo bhava",
      meaning: "Consider your mother as God."
    },
    {
      quote: "परोपकाराय सतां विभूतयः",
      transliteration: "Paropakārāya satāṁ vibhūtayaḥ",
      meaning: "The wealth of the noble is for helping others."
    },
    {
      quote: "ज्ञानं परमं ध्येयम्",
      transliteration: "Jñānaṁ paramaṁ dhyeyam",
      meaning: "Knowledge is the ultimate goal."
    }
  ];

const target = document.querySelector("#target") ;  

function display(index){
  
    const {quote , transliteration , meaning} = sanskritQuotes[index] ;
    target.innerHTML = `<span>${quote}</span ><span class = "meaning" >${meaning}</span>` ;
}  


function getColor(){

    const red = Math.floor(Math.random()*255) + 1 ;
    const green = Math.floor(Math.random()*255) + 1;
    const blue = Math.floor(Math.random()*255) + 1 ;

    const color = `rgb(${red} , ${green} , ${blue})` ;

    return color ;
}

function changeColor(color ){ 
    document.body.style.backgroundColor = color ;
}



// const scriptTag = document.querySelector(".temporary") ;

// scriptTag.remove() ;

// script tag ko tabhi remove kar skte hai jab bo execute nahi ho raha ho 

display(0 ) ;

setInterval(()=>{
    const RandomQuate = 
    Math.floor(Math.random()*sanskritQuotes.length) ;
    display(RandomQuate) ;

    // changeColor(getColor()) ;

    console.log(RandomQuate) ;

},5000) ;



