
const tamañoTablero = document.getElementById("tamañoTablero");
const nombre1 = document.getElementById("nombreJugador1")
const nombre2 = document.getElementById("nombreJugador2")
const nombre3 = document.getElementById("nombreJugador3")
const nombre4 = document.getElementById("nombreJugador4")
const form = document.getElementById("form");
const parrafo = document.getElementById("parrafo");


form.addEventListener("submit", e=>{
    e.preventDefault()
    
    if(tamañoTablero.value >5 || tamañoTablero.value <3 ){
        
        parrafo.innerHTML = "La dimension del tablero debe estar entre 3 y 5"
    }else{
        parrafo.innerHTML = "";
        
        sessionStorage.setItem('dimension', tamañoTablero.value);
        sessionStorage.setItem('jugNombre1', nombre1.value)
        sessionStorage.setItem('jugNombre2', nombre2.value)
        sessionStorage.setItem('jugNombre3', nombre3.value)
        sessionStorage.setItem('jugNombre4', nombre4.value)
        location.href = "./tableros.html"
        
    }
})
let cantidad = localStorage.length;

let tablahtml = `<thead><tr><th>Usuario</th><th>Número de Victorias</th></thead>`
for(let  i=0;i<cantidad;i++){
    tablahtml += `<tr><th>${localStorage.key(i)}</th><th>${localStorage.getItem(localStorage.key(i))}</th>`
}

const contenedorTabla = document.getElementById("tabla");
contenedorTabla.innerHTML = tablahtml



