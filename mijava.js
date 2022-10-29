//setea base clientes
baseclientes = []

//servidor conversor monedas
const host = 'api.frankfurter.app'

//variables fijas por entidad
interes = 0.25
let porcentaje = interes * 100
let ali = 5

//FUNCION CONSTRUCTORA DE NUEVO CONTRIBUYENTE
function Contri(razon, dni, ventas, costo, condicion, pagoIbb, brutaNoInscripto, brutaInscripto, netoIva, ivaInscripto, totalImp) {

    this.razon = razon
    this.dni = dni
    this.ventas = ventas
    this.costo = costo
    this.condicion = condicion
    this.pagoIbb = pagoIbb
    this.brutaNoInscripto = brutaNoInscripto
    this.brutaInscripto = brutaInscripto
    this.netoIva = netoIva
    this.ivaInscripto = ivaInscripto
    this.totalImp = totalImp
}

//CARGA MANUAL PARA DEFINIR UNA BASE DE DATOS

let contribuyente1 = new Contri(
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

let contribuyente2 = new Contri(
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
enviar.addEventListener("click", Agregar)

//LA FUNCIÓN SETEA TODAS LAS VARIABLES, REALIZA TODOS LOS CALCULOS Y LOS CARGA AL STORAGE
function Agregar(send) {

    send.preventDefault()

    let razon = document.getElementById("razon").value;
    let dni = Number(document.getElementById("dni").value)
    let ventas = Number(document.getElementById("ventas").value);
    let costo = Number(document.getElementById("costo").value)
    let condicion = document.getElementById("condicion").value

    function IvaBase() {
        return (ventas / (1.21))
    }

    function Iva2() {
        return (ventas - (ventas / (1.21)))
    }

    function NoInscripto() {
        return ventas - costo
    }

    function Margen() {
        return (netoIva - (ventas * (ali / 100)) - costo)
    }

    function Ibb() {
        return ventas * (ali / 100)
    }

    ivaInscripto = Iva2()
    netoIva = IvaBase()
    brutaInscripto = Margen()
    brutanoInscripto = NoInscripto()
    pagoIbb = Ibb()

    function Impuestos() {
        return pagoIbb + ivaInscripto
    }

    totalImp = Impuestos()

    const nuevocont = new Contri(
        `${razon}`,
        `${dni}`,
        Number(`${ventas}`),
        Number(`${costo}`),
        `${condicion}`,
        Number(`${pagoIbb}`),
        Number(`${brutanoInscripto}`),
        Number(`${brutaInscripto}`),
        Number(`${netoIva}`),
        Number(`${ivaInscripto}`),
        Number(`${totalImp}`)
    )

    baseclientes.push(nuevocont)
    baseJson = JSON.stringify(baseclientes)
    localStorage.setItem(`base`, baseJson)


}



// CONSULTA DOLAR

let op4 = document.getElementById("cambio")
op4.addEventListener("click", () => {

    fetch(`https://${host}/latest?amount=100&from=MXN&to=USD`)
        .then(resp => resp.json())
        .then((data) => {

            //la api consumida es muy buena pero no tiene moneda ARG, se hardcodea ajustando con el peso MEXICANO
            let ajuste = data.rates.USD * 58


            let timerInterval
            Swal.fire({
                title: `1 dolar = ${ajuste} pesos`,
                html: 'Tómate un momento para pensar...',
                timer: 5000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })

        });

}
)

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
        capital = encontrado.ivaInscripto


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
        la utilidad bruta es ${encontrado.brutanoInscripto}, no paga IVA, pero recuerde
        pagar ingresos brutos por $ ${encontrado.pagoIbb}, Solamente debes pagar ingresos brutos por $ ${encontrado.pagoIbb}</p>      
        </div>
        </div>`
        a.append(opcion1)
    }

    else {
        opcion1.innerHTML = ` <div class="card  size separate" style="width: 100%;">
        <div class="card-body formulario">
        <h5 class="card-title">Estos son tus márgenes</h5>
        <p class="card-text"> IVA INSCRIPTO:    
        la utilidad bruta es $${encontrado.brutaInscripto}, pagás IVA y además ingresos brutos por $${encontrado.pagoIbb}, Tienes que pagar ingresos brutos por $${encontrado.pagoIbb}, 
        IVA por $${encontrado.ivaInscripto}, puedes acceder a la financiación por el IVA </p>      
        </div>
        </div>`
        a.append(opcion1)
    }
})



// OPCION FINANCIACION


let op2 = document.getElementById("planpago")
op2.addEventListener("click", () => {

    let cuotas = prompt("ingrese la cantidad de cuotas, se permiten hasta 12")
    if (cuotas > 12) {
        alert("son demasiadas cuotas, vuelve a ingresar a la financiación e ingresa hasta 12")
    }
    else {
        function Financiacion() {
            return (capital * interes / cuotas)
        }

        mensual = Financiacion()
        encontrado.cantCuotas = (`${cuotas}`)
        encontrado.valorCuota = (`${mensual}`)
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
                    <p class="card-text">elegiste $${encontrado.cantCuotas} cuotas, pagarás $${encontrado.cantCuotas} cuotas de $${encontrado.valorCuota} con un interes del ${porcentaje}%
    
                    </p>      
                </div>
                </div>`
        a.append(opcion2)


        parsedBase.splice(indice, indice)
        parsedBase.push(encontrado)
        localStorage.setItem(`base`, JSON.stringify(parsedBase))

    }
})


// LIMPIAR

let op3 = document.getElementById("limpiar")
op3.addEventListener("click", () => {
    a.remove()
}
)
