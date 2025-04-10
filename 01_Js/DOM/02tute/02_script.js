const timerConatiner = document.getElementById("timer");

setInterval(display , 1000) ;

function display() {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();

  const h = 
  String(currentDate.getHours()).padStart(2, "0");
  const m = 
  String(currentDate.getMinutes()).padStart(2, "0");
  const s = 
  String(currentDate.getSeconds()).padStart(2, "0");

  const meredian = (new Date().getHours() >= 12 ) ? "PM" : "AM" ;

  const time2 = `${h}:${m}:${s} ${meredian}` ;

  timerConatiner.innerText = time2 ;

}
