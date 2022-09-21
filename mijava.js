baseclientes = []

//variables fijas por entidad
interes = 0.25
let porcentaje = interes * 100
let ali = 5


//FUNCION CONSTRUCTORA NUEVO CONTRIBUYENTE


function contri(razon, dni, ventas, costo, condicion, pagoiibb, brutanoincripto, brutainscripto, netoiva, ivainscripto, totalimp) {

    this.razon = razon
    this.dni = dni
    this.ventas = ventas
    this.costo = costo
    this.condicion = condicion
    this.pagoiibb = pagoiibb
    this.brutanoincripto = brutanoincripto
    this.brutainscripto = brutainscripto
    this.netoiva = netoiva
    this.ivainscripto = ivainscripto
    this.totalimp = totalimp
}

//CARGA MANUAL PARA DEFINIR UNA BASE DE DATOS

let contribuyente1 = new contri(
    "celeste lopa",
    "35646599",
    35200,
    1500,
    "si",
    50,
    40,
    20,
    10,
    5)

let contribuyente2 = new contri(
    "juan rendon",
    "85646599",
    65200,
    37500,
    "no",
    500,
    400,
    200,
    100,
    50)


baseclientes.push(contribuyente1)
baseclientes.push(contribuyente2)

const baseJson = JSON.stringify(baseclientes)
localStorage.setItem(`base`, baseJson)

//CAPTURA DE DATOS DESDE FORMULARIO
let enviar = document.getElementById("enviar")
enviar.addEventListener("click", agregar)

//LA FUNCIÓN SETEA TODAS LAS VARIABLES, REALIZA TODOS LOS CALCULOS Y LOS CARGA AL STORAGE

function agregar() {

    let razon = document.getElementById("razon").value;
    let dni = Number(document.getElementById("dni").value)
    let ventas = Number(document.getElementById("ventas").value);
    let costo = Number(document.getElementById("costo").value)
    let condicion = document.getElementById("condicion").value


    function ivabase() {
        return (ventas / (1.21))
    }

    function iva2() {
        return (ventas - (ventas / (1.21)))
    }

    function noinscripto() {
        return ventas - costo
    }

    function margen() {
        return (netoiva - (ventas * (ali / 100)) - costo)
    }

    function iibb() {
        return ventas * (ali / 100)
    }

    ivainscripto = iva2()
    netoiva = ivabase()
    brutainscripto = margen()
    brutanoincripto = noinscripto()
    pagoiibb = iibb()

    function impuestos() {
        return pagoiibb + ivainscripto
    }

    totalimp = impuestos()

    const nuevocont = new contri(
        `${razon}`,
        `${dni}`,
        Number(`${ventas}`),
        Number(`${costo}`),
        `${condicion}`,
        Number(`${pagoiibb}`),
        Number(`${brutanoincripto}`),
        Number(`${brutainscripto}`),
        Number(`${netoiva}`),
        Number(`${ivainscripto}`),
        Number(`${totalimp}`)
    )

    const nuevoJson = JSON.stringify(nuevocont)
    localStorage.setItem(`nuevo`, nuevoJson)
}


//CONSULTA POR PARTE DEL CONTRIBUYENTE

//PRIMER BOTON

let op1 = document.getElementById("rendimiento")
op1.addEventListener("click", () => {

    let a = document.getElementById("opciones")
    let opcion1 = document.createElement("div")

    parsedNuevo = JSON.parse(localStorage.getItem("nuevo"))

    if (parsedNuevo.condicion === "no") {
        condicion = false

        opcion1.innerHTML = ` <div class="card separate" style="width: 100%;">
<div class="card-body formulario">
        <h5 class="card-title">Estos son tus márgenes</h5>
        <p class="card-text">NO INSCRIPTO:   
        la utilidad bruta es ${parsedNuevo.brutanoincripto}, no paga IVA, pero recuerde
       pagar ingresos brutos por $ ${parsedNuevo.pagoiibb}</p>      
    </div>
    </div>`
        a.append(opcion1)
    }


    else {
        opcion1.innerHTML = ` <div class="card separate" style="width: 100%;">
<div class="card-body formulario">


        <h5 class="card-title">Estos son tus márgenes</h5>
        <p class="card-text"> IVA INSCRIPTO:    
        la utilidad bruta es $${parsedNuevo.brutainscripto}, pagás IVA y además ingresos brutos por $${parsedNuevo.pagoiibb} </p>      
    </div>
    </div>
    `
        a.append(opcion1)
    }

})

//SEGUNDO BOTON

let op2 = document.getElementById("reporte")
op2.addEventListener("click", () => {

    let a = document.getElementById("opciones")
    let opcion2 = document.createElement("div")

    parsedNuevo = JSON.parse(localStorage.getItem("nuevo"))

    if (parsedNuevo.condicion === "no") {
        condicion = false

        opcion1.innerHTML = ` <div class="card separate" style="width: 100%;">
<div class="card-body formulario">
        <h5 class="card-title">Aquí tienes el detalle de impuestos</h5>
        <p class="card-text">NO INSCRIPTO:   
  Solamente debes pagar ingresos brutos por $ ${parsedNuevo.pagoiibb}</p>      
    </div>
    </div>`
        a.append(opcion2)
    }

    else {
        opcion2.innerHTML = ` <div class="card separate" style="width: 100%;">
<div class="card-body formulario">


        <h5 class="card-title">Aquí tienes el detalle de impuestos</h5>
        <p class="card-text"> IVA INSCRIPTO:  
        Tienes que pagar ingresos brutos por $${parsedNuevo.pagoiibb}, 
        IVA por $${parsedNuevo.ivainscripto}, en total perderás $${parsedNuevo.totalimp}, puedes acceder a la financiación por el IVA </p>      
    </div>
    </div>
    `
        a.append(opcion2)
    }

})


//TERCER BOTON

let op3 = document.getElementById("planpago")
op3.addEventListener("click", () => {

    let cuotas = prompt("ingrese la cantidad de cuotas, se permiten hasta 12")
    if (cuotas > 12) {
        alert("son demasiadas cuotas, vuelve a ingresar a la financiación e ingresa hasta 12")
    }
    else {
        parsedNuevo = JSON.parse(localStorage.getItem("nuevo"))

        function financiacion() {
            return (parsedNuevo.ivainscripto * interes / cuotas)
        }
        mensual = financiacion()


        parsedNuevo.cantcuotas = (`${cuotas}`)
        parsedNuevo.valorcuota = (`${mensual}`)
        const nuevoJson = JSON.stringify(parsedNuevo)
        localStorage.setItem(`nuevo`, nuevoJson)

        let a = document.getElementById("opciones")
        let opcion3 = document.createElement("div")

        parsedNuevo = JSON.parse(localStorage.getItem("nuevo"))

        opcion3.innerHTML = ` <div class="card separate" style="width: 100%;">
            <div class="card-body formulario">
                    <h5 class="card-title">Detalle de la financiación</h5>
                    <p class="card-text">elegiste $${parsedNuevo.cantcuotas} cuotas, pagarás $${parsedNuevo.cantcuotas} cuotas de $${parsedNuevo.valorcuota} con un interes del ${porcentaje}%
    
                    </p>      
                </div>
                </div>`
        a.append(opcion3)
    }

})


