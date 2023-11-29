/*
const clickgoto = (offset) => {
    if (offset == 0){
      window.location.href = "/ver-artesanos?page_size=5&offset=0";  
    }
    else if (offset == 5){
        window.location.href = "/ver-artesanos?page_size=5&offset=5";  
    }
};
  
let button1 = document.getElementById("b1");
button1.addEventListener("click", clickgoto(0));

let button2 = document.getElementById("b2");
button2.addEventListener("click", clickgoto(5));
*/

document.getElementById("b1").addEventListener("click", clickgoto = () => {
    window.location.href = "/ver-artesanos?page_size=5&offset=0";
});

document.getElementById("b2").addEventListener("click", clickgoto = () => {
    window.location.href = "/ver-artesanos?page_size=5&offset=5";
});