/*
const clickgoto = () => {
    window.location.href = "/info-hincha";
  };  
*/

document.getElementById("b1").addEventListener("click", clickgoto = () => {
    window.location.href = "/ver-hinchas?page_size=5&offset=0";
});

document.getElementById("b2").addEventListener("click", clickgoto = () => {
    window.location.href = "/ver-hinchas?page_size=5&offset=5";
});