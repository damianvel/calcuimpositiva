baseclientes = []

//variables fijas por entidad
interes = 0.25
let porcentaje = interes * 100
let ali = 5


//FUNCION CONSTRUCTORA NUEVO CONTRIBUYENTE


function contri(razon, dni, ventas, costo, condicion, pagoiibb, brutanoinscripto, brutainscripto, netoiva, ivainscripto, totalimp) {

    this.razon = razon
    this.dni = dni
    this.ventas = ventas
    this.costo = costo
    this.condicion = condicion
    this.pagoiibb = pagoiibb
    this.brutanoinscripto = brutanoinscripto
    this.brutainscripto = brutainscripto
    this.netoiva = netoiva
    this.ivainscripto = ivainscripto
    this.totalimp = totalimp
}

//CARGA MANUAL PARA DEFINIR UNA BASE DE DATOS

let contribuyente1 = new contri(
    "celeste lopa",
    "1",
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

baseJson = JSON.stringify(baseclientes)
localStorage.setItem(`base`, baseJson)

//CAPTURA DE DATOS DESDE FORMULARIO
let enviar = document.getElementById("enviar")
enviar.addEventListener("click", agregar)

//LA FUNCIÓN SETEA TODAS LAS VARIABLES, REALIZA TODOS LOS CALCULOS Y LOS CARGA AL STORAGE
function agregar(send) {

    send.preventDefault()

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
    brutanoinscripto = noinscripto()
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
        Number(`${brutanoinscripto}`),
        Number(`${brutainscripto}`),
        Number(`${netoiva}`),
        Number(`${ivainscripto}`),
        Number(`${totalimp}`)
    )

    baseclientes.push(nuevocont)
    baseJson = JSON.stringify(baseclientes)
    localStorage.setItem(`base`, baseJson)
}


//CONSULTA POR PARTE DEL CONTRIBUYENTE

// INGRESO DEL DNI

let op0 = document.getElementById("dniinput")
op0.addEventListener("click", () => {
    dniinput = prompt(`para iniciar una consulta por favor ingrese su DNI`)
    parsedBase = JSON.parse(localStorage.getItem("base"))
    busqueda = parsedBase.find((busqueda) => busqueda.dni === dniinput)
    indice = parsedBase.findIndex(parsedBase => parsedBase.dni === dniinput)
    parsedBase.find((busqueda) => busqueda.dni === dniinput)
    if (busqueda) {


        encontrado = Object(parsedBase.filter((encontrado) => encontrado.dni === dniinput))[0]
        capital = encontrado.ivainscripto
        console.log(encontrado)
        console.log(indice)
        console.log(capital)

        Swal.fire(
            'El dni fue encontrado',
            'Está habilitado el módulo de consultas',
            'success'
        )
    }

    else {
        alert(`no se encuentra enla base de datos, vuelva a ingrsar al boton de consulta e ingrese un DNI válido `)
    }
}
)


let a = document.getElementById("opciones")

//PRIMER BOTON

let op1 = document.getElementById("rendimiento")

op1.addEventListener("click", () => {

    let a = document.getElementById("opciones")
    let opcion1 = document.createElement("div")


    if (encontrado.condicion === "no") {
        opcion1.innerHTML =
            `<div class="card separate" style="width: 100%;">
        <div class="card-body formulario">
        <h5 class="card-title">Estos son tus márgenes</h5>
        <p class="card-text">NO INSCRIPTO:   
        la utilidad bruta es ${encontrado.brutanoinscripto}, no paga IVA, pero recuerde
        pagar ingresos brutos por $ ${encontrado.pagoiibb}, Solamente debes pagar ingresos brutos por $ ${encontrado.pagoiibb}</p>      
        </div>
        </div>`
        a.append(opcion1)
    }

    else {
        opcion1.innerHTML = ` <div class="card  size separate" style="width: 100%;">
        <div class="card-body formulario">
        <h5 class="card-title">Estos son tus márgenes</h5>
        <p class="card-text"> IVA INSCRIPTO:    
        la utilidad bruta es $${encontrado.brutainscripto}, pagás IVA y además ingresos brutos por $${encontrado.pagoiibb}, Tienes que pagar ingresos brutos por $${encontrado.pagoiibb}, 
        IVA por $${encontrado.ivainscripto}, en total perderás $${encontrado.totalimp}, puedes acceder a la financiación por el IVA </p>      
        </div>
        </div>`
        a.append(opcion1)
    }
})

let op2 = document.getElementById("planpago")
op2.addEventListener("click", () => {

    let cuotas = prompt("ingrese la cantidad de cuotas, se permiten hasta 12")
    if (cuotas > 12) {
        alert("son demasiadas cuotas, vuelve a ingresar a la financiación e ingresa hasta 12")
    }
    else {
        function financiacion() {
            return (capital * interes / cuotas)
        }

        mensual = financiacion()
        encontrado.cantcuotas = (`${cuotas}`)
        encontrado.valorcuota = (`${mensual}`)
        let a = document.getElementById("opciones")
        let opcion2 = document.createElement("div")
        parsedNuevo = JSON.parse(localStorage.getItem("nuevo"))

        Swal.fire(
            'Financiación realizada',
            'A continuación puedes consultar el detalle de las cuotas',
            'success'
        )

        opcion2.innerHTML = ` <div class="card separate size" style="width: 100%;">
            <div class="card-body formulario">
                    <h5 class="card-title">Detalle de la financiación</h5>
                    <p class="card-text">elegiste $${encontrado.cantcuotas} cuotas, pagarás $${encontrado.cantcuotas} cuotas de $${encontrado.valorcuota} con un interes del ${porcentaje}%
    
                    </p>      
                </div>
                </div>`
        a.append(opcion2)


        parsedBase.splice(indice, indice)
        parsedBase.push(encontrado)
        localStorage.setItem(`base`, JSON.stringify(parsedBase))

    }
})

let op3 = document.getElementById("limpiar")
op3.addEventListener("click", () => {
    a.remove()
}
)

