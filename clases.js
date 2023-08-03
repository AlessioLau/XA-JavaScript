
//Clase 1
    //Definicion de variable 
    let nombre;
    var varGlobal;

    //Asignacion
    nombre = 'Alexis';
    const fechaNac = '25/05/2023';

    console.log(nombre);

    let edad = '18';
    if (edad > 18){
        console.log('Es mayor');
    }else{
        console.log('Es menor');
    }
    
    let cantCuotas = 3;
    let contador = 1;
    while (contador >= cantCuotas){
            console.log(contador + ' coutas');
        }
        contador += 1;

    for (let contador = 1; contador <= cantCuotas; contador++){
        if (contador == 1){
            console.log(contador + ' cuota');
            continue;
        }
        
        console.log(contador + ' cuotas');
    }

// Clase 2

    // Funciones 
    // Definicion por declaracion
    function sumar(num1, num2){
        let resultado = num1 + num2;
        return resultado;
    }

    // Invocacion
    let suma;
    suma = sumar(25, 25);
    console.log(suma);

    concatenar = sumar('Que', 'A');

    function saludar(momentoDia){
        switch(momentoDia){
        case  'mañana': console.log('Buen dia');
        break;
        case  'tarde': console.log('Buenas tardes');
        break;
        case  'noche': console.log('Buenas noches');
        break;
    }}

    saludar('tarde');

    // Definicion por expresion
    // Funcion anonima (toma el nombre de la constante) 
    const resta = function (num1, num2){
        resultado = num1 - num2;
        return resultado;
    }

    // Manejo de errores

    function dividirConExcepcion(num1, num2){
        try{
            if (num2 === 0) {
                throw Error('No se puede dividir por 0');
            }
            return num1/num2;
        }catch (error){
            console.error(error);
        }finally {
            console.log('Se termino la ejecucion de la funcion');
        }
    }

    // Objetos

    const persona = {
        nombre: 'Lau',
        apellido: 'Alessio',
        fechaNac: '25-08-2001',
        wasa: 'wasaaaa',
        direccion: {
            calle: 'Miami',
            numeracion: 222,
        },
        saludar: function() {
            console.log('Que onda');
        }
    }

    persona.pais = 'Argentina';
    delete persona.wasa;

    // Clases

    class Persona {
        nombre;
        apellido;
        fechaNac;

        constructor(nombre, apellido, fechaNac){
            this.nombre = nombre;
            this.apellido = apellido;
            this.fechaNac = fechaNac;
        }
    }

    class Trabajador extends Persona{
        empresa;

        constructor(empresa, nombre, apellido, fechaNac){
            super(nombre, apellido, fechaNac);
            this.empresa = empresa
        }
    }

    const persona1 = new Persona('Lau', 'Alessio', '25-08-2001');
    const trabajador1 = new Trabajador('Fiat', 'Lau', 'Alessio', '25-08-2001' )

    // Array

    let verduras = ['Lechuga','Tomate','Palta'];
    //verduras[0] = 'Lechuga'
    //verduras.length = 3
    //verduras.push('Zanahoria')
    //verduras.unshift('Papa')
    //.pop .shift sacar elementos
 

// Clase 3

    // Arrow functions, Callbacks, Functional programming

    //Arrow Function
    const sumarArrow = (num1, num2) =>  num1 + num2;

    //String templating
    const saludarTemplated = (nombre, apellido) => {
        console.log( `Hola ${nombre} ${apellido}`);
    }

    //Callback functions 
    // Funciones que se pasan como argumento a otras funciones

    function finLlamado() {console.log('Terminó la ejecución');} 

    function saludarCallback(nombre, apellido, functionCallback){
        saludarTemplated(nombre, apellido);
        functionCallback();       
    }

    saludarCallback('Lau', 'Alessio', finLlamado);

    function saludarCallbackInput(functionCallback){
        nombre = prompt('Ingrese un nombre');
        apellido = prompt('Ingrese un apellido');
        saludarTemplated(nombre, apellido);
        functionCallback();       
    }
    saludarCallbackInput(finLlamado);
    
    // Callback Functions
    const numeros = [-1,0,1,2,3];
    const encontrado = numeros.find(n => n===2);

    function findMayorNum(numeros, num){
        for (let i = 0; i < numeros.length; i++){
            if (num > numeros[i]){
                return numeros[i];
            }
        }
    }

    function onlyPositives(element){
        return element > 0;
    }
    
    const onlyPositivesConst = n => n>0;

    console.log(numeros);
    console.log(numeros.filter(n => n > 0));

    // Metodos de arrays
    // push
    // join
    // find
    // includes
    // filter
    // map
    // foreach


//Clase 4

    //Sincronismo y Asincronismo
    //Promises
    //Async y Await
    //EventLoop

    function loadScript(src, callback){
        //Crear el tag
        let script = document.createElement("script");
        script.src = src;

        //Ejecuto funcion 
        script.onload = () => callback(null, script);

        //Ejecuto funcion y lanzo error
        script.onerror = () => callback(new Error(`No se pudo cargar ${src}`));

        document.head.append(script);
    }

    loadScript("script1.js", function(error, script){
        if (error){
            console.log('Error al cargar el script');
        }else{
            console.log('Se cargó correctamente el script')
        }
    })

    // Promises

    const platos = ["milanesas con ensalada", "milanesas con pure", "pizza"];

    const mozo = {
        platoDelDia: platos[0],
        pedirPlato: function (plato){
            console.log("Se le pidio un " + plato + " al mozo");
            return new Promise((resolve, reject) => {
                if (plato == this.platoDelDia || platos.includes(plato)){
                    console.log("La cocina esta preparando el plato...");
                    setTimeout(() => {
                        resolve(plato);
                    }, 4500);
                } else {
                    setTimeout(() => {
                        reject("Lo siento, no tenemos " + plato);
                    }, 3000);
                }
            });
        },
    };

    const pedido = mozo.platoDelDia;
    console.log(pedido);

    const promesaPlato = mozo.pedirPlato("pizza");
    promesaPlato
    .then((plato) => console.log("Estoy comiendo " + plato))
    .catch((error) => console.log(error))
    .finally(() => console.log("Me como un postre"));


    // Async y Await

    
function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'gastonf' && password === '1234') {
                return resolve({
                    id: 1,
                    username: 'gastonf',
                    name: "Gaston",
                    lastname: "Fernandez"
                });
            } else {
                reject("Usuario o password invalidos");
            }
        }, 1000)
    });
}

function getFriends(userId) {
    return new Promise((resolve, reject) => {
        console.log("Getting " + userId + " Friends...");
        setTimeout(() => {
            resolve([
                { id: 2, username: 'mati_77_' },
                { id: 3, username: 'XFEDEX' },
                { id: 3, username: 'SAN_999' },
            ])
        }, 1000);
    })
}

// Utilizando THEN
function main() {
    login('gastonf', '1234')
        .then(usuario => {
            // Manipulacion del DOM
            const div = document.createElement("div");
            div.classList.add('header');
            div.textContent = `Welcome ${usuario.name} ${usuario.lastname} (${usuario.username})`;
            document.body.appendChild(div);
            return getFriends(usuario.id);
        })
        .then(friends => {
            const ul = document.createElement("ul");
            friends.forEach(friend => {
                const li = document.createElement("li");
                li.textContent = friend.username;
                ul.appendChild(li);
            });
            document.body.appendChild(ul);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            const footer = document.createElement('footer');
            footer.textContent = "All rights reserved | 2023";
            document.body.append(footer);
        });
}

main();

// Utilizando async / await

async function main2() {
    try {
        const usuario = await login('gastonf', '1234');

        // Manipulacion del DOM
        const div = document.createElement("div");
        div.classList.add('header');
        div.textContent = `Welcome ${usuario.name} ${usuario.lastname} (${usuario.username})`;
        document.body.appendChild(div);

        const friends = await getFriends(usuario.id);
        const ul = document.createElement("ul");
        friends.forEach(friend => {
            const li = document.createElement("li");
            li.textContent = friend.username;
            ul.appendChild(li);
        });
        document.body.appendChild(ul);

    } catch (error) {
        console.error(error);
    } finally {
        const footer = document.createElement('footer');
        footer.textContent = "All rights reserved | 2023";
        document.body.append(footer);
    }
}
main2(); 

const cargarDatos = async() =>{
    try{
        const url = '';
        const res = await fetch(url);
        const datos = await res.json();
        console.log(datos);
    } catch(err){
        console.log(err);
    }
};
//cargarDatos();

/*Event loop

    A traves de una cola de tareas y una pila de llamadas
    el event loop se encargada de ejecutar las funciones de devolucion
    de llamada en el orden en que fueron agregadas a la cola
    De esta forma el programa continua ejecutando tareas mientras espera
    la finalizacion de una operacion asincrona    
*/


//Destructuring Object y arrays

const numerosA = [5, -3, 1];

const primerElementoNumA = numerosA[0];

const [primerElemento, segundo, c] = numerosA;

console.log(primerElementoNumA);
console.log(primerElemento);
console.log(segundo);
console.log(c);

const libro = {
    id: 1,
    nombre: 'El señor de los anillos',
    autor: 'Tolkien'
}

const {nombre: nombreLibro, id} = libro;

console.log(nombreLibro, id);

function imprimirLibro({nombre, autor}){
    console.log(nombre);
    console.log(autor);
}

imprimirLibro(libro);

//Falsy y Truthy => Interpretar un dato no boleeano como bool

// Falsy = false, 0, Nan, null, undefined, '', "", `` 
// Truthy = Cualquier otra cosa

let dato = 0;
if(dato){
    console.log('El dato es verdadero');
}else{
    console.log('El dato es falso');
}

// Valor / Referencia

// Para datos primitivos (integer, string, null, boolean)
// Al usarlos en funciones se envian como valor

// Para datos no primitivos (objects, arrays, functions)
// Se envian como punteros por lo que si se modifica dentro de la funcion se modifica el dato no primitivo

function duplicarYAgregar(array, nuevoValor){
    let nuevoArray = array;
    nuevoArray.push(nuevoValor);
    return nuevoArray;
}

const numeros1 = [1,5,-3];
const nuevoNumero1 = duplicarYAgregar(numeros1, 100);
nuevoNumero1.push(3);
numeros1.push(-1);
console.log(numeros1);
console.log(nuevoNumero1);

// Promesas

// Manejan operaciones asincronas sin bloquear el hilo principal

// Tienen 3 estados: Pending, Fulfilled, Rejected

// Consumo: Then, Catch, Finally

// Creacion

// function puedeVotar(edad){
//     if(edad > 18){
//         return "puede votar";
//     }else{
//         throw "no puede votar";
//     }
// }

function puedeVotar(edad){
    return new Promise((resolve, reject) =>{  
        setTimeout(() => {
            if(edad > 18){
                resolve("puede votar");
            } else {
                reject("no puede votar");
            }
        }, 100);
    });
}
const puedeVotarPromesa = puedeVotar(10);
console.log(puedeVotarPromesa)

puedeVotarPromesa.then((mensaje) => {
    console.log(mensaje);
}) .catch((mensaje) => {
    console.log(mensaje);
})


function sayHi (parameter){
    console.log(parameter);
}
argument = 'Hi';
sayHi(argument);


// Async / Await

// Await bloquea el hilo de ejecucion para esperar a terminar de ejecutar una operacion asincrona es necesario el uso de funciones Async y el uso de try catch 
// Dado que si la operacion asincrona no se resuelve o devuelve un error debe ser atrapado por el catch

function getCountriesFromAPI(error){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(error) reject("Api down, try again later...");
            resolve(['Argentina', 'Bolivia', 'Brasil']);
        }, 0);
    });
}

// function main(){
//     const countries = getCountriesFromAPI(false);
//     console.log(countries); 
// }

async function main(){
    try{
        const countries = await getCountriesFromAPI(false)
        console.log(countries);
    } catch(err) {
        console.log(err);
    } finally { console.log('xd'); }
}
main();