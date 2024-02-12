const nombre1 = sessionStorage.getItem("jugNombre1");
const nombre2 = sessionStorage.getItem("jugNombre2");
const nombre3 = sessionStorage.getItem("jugNombre3");
const nombre4 = sessionStorage.getItem("jugNombre4");
const tamañoCarton = sessionStorage.getItem("dimension");
const cartonesContainer = document.getElementById('cartonesContainer');
let puntajes = [0, 0, 0, 0];
let jugadores = [nombre1, nombre2, nombre3, nombre4];

//Jugador 1
const carton1 = generarCartonBingo(tamañoCarton);
const cartonHTML1 = generarCartonHTML(carton1, nombre1, '1');
cartonesContainer.appendChild(cartonHTML1);

//Jugador 2

const carton2 = generarCartonBingo(tamañoCarton);
const cartonHTML2 = generarCartonHTML(carton2, nombre2,'2');
cartonesContainer.appendChild(cartonHTML2);

//Jugador 3

const carton3 = generarCartonBingo(tamañoCarton);
const cartonHTML3 = generarCartonHTML(carton3, nombre3,'3');
cartonesContainer.appendChild(cartonHTML3);

//Jugador 4

const carton4 = generarCartonBingo(tamañoCarton);
const cartonHTML4 = generarCartonHTML(carton4, nombre4,'4');
cartonesContainer.appendChild(cartonHTML4);

let numerosDisponibles = Array.from({length: 50}, (_, i) => i + 1);

const generarNumero = document.getElementById( "btnGenerarNum" );

generarNumero.addEventListener( "click", () => {
    if (numerosDisponibles.length === 25) {
        const btnGenerarNum = document.getElementById("btnGenerarNum");
        btnGenerarNum.disabled = true;
        revisarFilaCompleta(cartonHTML1);
        revisarFilaCompleta(cartonHTML2);
        revisarFilaCompleta(cartonHTML3);
        revisarFilaCompleta(cartonHTML4);
        revisarColumnaCompleta(cartonHTML1);
        revisarColumnaCompleta(cartonHTML2);
        revisarColumnaCompleta(cartonHTML3);
        revisarColumnaCompleta(cartonHTML4);
        let indexganador= selecGanador(puntajes);
        let empate = false;
        for(let  i=0; i<puntajes.length; i++){
            if(puntajes[i]===puntajes[indexganador] && i!==indexganador){
                empate = true;
                console.log(empate);
        }
        }
        let indiceEmpates = [];
        if(empate===false){
            let tarjetaGanador =  document.querySelector(".tarjetaGanador")
            tarjetaGanador.textContent = `El ganador es ${jugadores[indexganador]}`;
            let victorias = localStorage.getItem(jugadores[indexganador]);
            if(victorias !== null) {
                localStorage.setItem(jugadores[indexganador],parseInt(victorias)+1);
            }else{
                localStorage.setItem(jugadores[indexganador],1);
            }
            
        }else if(puntajes[indexganador]!==0){
            for(let i =0; i < 4 ; i++) {
                if(puntajes[i]===puntajes[indexganador] ){
                indiceEmpates.push(i);
                let tarjetaGanador =  document.querySelector(".tarjetaGanador")
                tarjetaGanador.textContent = `Los ganadores son ${jugadores[indiceEmpates[0]]} ${jugadores[indiceEmpates[1]]} .`
                let victorias1 = localStorage.getItem(jugadores[indiceEmpates[0]]);
            if(victorias1 !== null) {
                localStorage.setItem(jugadores[indiceEmpates[0]],parseInt(victorias1)+1);
            }else{
                localStorage.setItem(jugadores[indiceEmpates[0]],1);
            }
            let victorias2 = localStorage.getItem(jugadores[indiceEmpates[1]]);
            if(victorias2 !== null) {
                localStorage.setItem(jugadores[indiceEmpates[1]],parseInt(victorias2)+1);
            }else{
                localStorage.setItem(jugadores[indiceEmpates[1]],1);
            }
            }

            }
            
        }else{
            let tarjetaGanador =  document.querySelector(".tarjetaGanador")
            tarjetaGanador.textContent = `No hay ganador.`
        }
        
        
        return;
    }else{
        const numeroAleatorioIndex = Math.floor(Math.random() * numerosDisponibles.length);
        const numeroAleatorio = numerosDisponibles.splice(numeroAleatorioIndex, 1)[0];
        let tarjetaGanador =  document.querySelector(".tarjetaGanador")
        tarjetaGanador.textContent = "Turnos restantes:" +`${numerosDisponibles.length -25} `;;
        document.getElementById("numeroGenerado").innerHTML = numeroAleatorio;
        buscarNumeroEnCartones(numeroAleatorio, cartonesContainer );
        revisarCartonCompleto(cartonHTML1);
        revisarCartonCompleto(cartonHTML2);
        revisarCartonCompleto(cartonHTML3);
        revisarCartonCompleto(cartonHTML4);
    }

    



});

const reiniciarPartida = document.getElementById("reiniciar");
reiniciarPartida.addEventListener("click", ()=>{
    sessionStorage.clear();
    location.href=  'index.html';
});


function generarCartonBingo(N) {
    if (N < 3 || N > 5) {
        console.error("El valor de N debe estar entre 3 y 5.");
        return null;
    }

    let carton = [];

    // Llenar el cartón con números aleatorios
    let numerosDisponibles = Array.from({length: 50}, (_, i) => i + 1);
    for (let i = 0; i < N; i++) {
        carton[i] = [];
        
        for (let j = 0; j < N; j++) {
            const numeroAleatorioIndex = Math.floor(Math.random() * numerosDisponibles.length);
            const numeroAleatorio = numerosDisponibles.splice(numeroAleatorioIndex, 1)[0]; 
            carton[i][j] = numeroAleatorio;
        }
    }

    return carton;
}


function generarCartonHTML(carton, titulo, id) {
    const cartonHTML = document.createElement('div');
    cartonHTML.classList.add('carton');
    cartonHTML.id=id;
    

    const tituloHTML = document.createElement('h1');
    tituloHTML.textContent = titulo;
    cartonHTML.appendChild(tituloHTML);

    const puntos = document.createElement('h2');
    puntos.textContent = "Puntaje:"+`${puntajes[id-1]}` ;
    cartonHTML.appendChild(puntos);

    carton.forEach(fila => {
        const filaHTML = document.createElement('div');
        filaHTML.classList.add('fila');
        fila.forEach(numero => {
            const numeroHTML = document.createElement('div');
            numeroHTML.classList.add('numero');
            numeroHTML.textContent = numero;
            filaHTML.appendChild(numeroHTML);
        });
        cartonHTML.appendChild(filaHTML);
    });

    return cartonHTML;
}


function buscarNumeroEnCartones(numero, cartonesContainer) {
    const cartones = cartonesContainer.querySelectorAll('.carton'); 
    cartones.forEach(carton => {
        
        const filas = carton.querySelectorAll('.fila');

        filas.forEach((fila, indiceFila) => {
            const numeros = fila.querySelectorAll('.numero');

            numeros.forEach((numeroElemento, indiceColumna) => {
                const numeroCarton = parseInt(numeroElemento.textContent);

                if (numeroCarton === numero) {
                    numeroElemento.classList.add('encontrado');
                }
            });
        });
    });
}

function revisarFilaCompleta(carton) {
    console.log(puntajes)
    const filas = carton.querySelectorAll('.fila');
    filas.forEach(fila => {
        if (fila.querySelectorAll('.encontrado').length === fila.children.length) {
            puntajes[carton.id-1]=1+puntajes[carton.id-1];
            let puntos = document.getElementById(`${carton.id}`);
            puntos = puntos.querySelector('h2');
            puntos.textContent = "Puntaje:"+`${puntajes[carton.id-1]}` ;
        }
    });
}
function revisarColumnaCompleta(carton) {
    const filas = carton.querySelectorAll('.fila');
    const columnas = [];

    for (let i = 0; i < filas.length; i++) {
        const numeros = filas[i].querySelectorAll('.numero');
        for (let j = 0; j < numeros.length; j++) {
            if (!columnas[j]) {
                columnas[j] = [];
            }
            columnas[j].push(numeros[j]);
        }
    }

    columnas.forEach(columna => {
        if (columna.every(celda => celda.classList.contains('encontrado'))) {
            puntajes[carton.id-1]= 1+puntajes[carton.id-1];
            let puntos = document.getElementById(`${carton.id}`);
            puntos = puntos.querySelector('h2');
            puntos.textContent = "Puntaje:"+`${puntajes[carton.id-1]}` ;
            
        }
    });
}

function revisarCartonCompleto(carton) {
    const celdas = carton.querySelectorAll('.numero');
    let todosEncontrados = true;

    celdas.forEach(celda => {
        if (!celda.classList.contains('encontrado')) {
            todosEncontrados = false;
            return; 
        }
    });

    if (todosEncontrados) {
            puntajes[carton.id-1]= 1+puntajes[carton.id-1];
            let puntos = document.getElementById(`${carton.id}`);
            puntos = puntos.querySelector('h2');
            puntos.textContent = "Puntaje:"+`${puntajes[carton.id-1]}` ;
    }
}

function selecGanador(puntaje) {
    let indiceMax = 0;
    for (let i = 1; i < puntaje.length; i++) {
        if (puntaje[i] > puntaje[indiceMax]) {
            indiceMax = i;
        }
    }
    return indiceMax;
}



