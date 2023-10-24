let imagen = document.getElementById("imagen");
const modificarImagen = () => {
    imagen.height = 1280;
    imagen.width = 1024;
};

imagen.addEventListener("click", modificarImagen);

document.getElementById("b1").addEventListener("click", clickgoto = () => {
    window.location.href = "/ver-artesanos";
});

document.getElementById("b2").addEventListener("click", clickgoto = () => {
    window.location.href = "/";
});