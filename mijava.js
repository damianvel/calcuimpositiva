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



// CONSULTA DOLAR

let op1 = document.getElementById("cambio")
op1.addEventListener("click", () => {

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

//BOTON PARTICIPAR CON LOS DATOS

let a = document.getElementById("opciones")
let op2 = document.getElementById("participar")

op2.addEventListener("click", () => {

    let opcion2 = document.createElement("div")


    opcion2.innerHTML =
        `<div class="contactobox mainformulario">  
            <div class="container-fluid">
                <form action="" >
                    <fieldset class="fieldset">
                        <div class="formulario">
                            <div class="formelement">
                                <label for="nombre">NOMBRE</label>
                                <input class="input" type="text" name="nombre" placeholder="" id="razon" required>
                            </div>
                            <div class="formelement">
                                <label for="apellido">DNI</label>
                                <input class="input" type="text" name="apellido" placeholder="" id="dni" required>
                            </div>
                            <div class="formelement">
                                <label for="telefono">VENTAS</label>
                                <input class="input" type="text" id="ventas" placeholder="" required>
                            </div>
                            <div class="formelement">
                                <label for="telefono">COSTO DE VENTAS</label>
                                <input class="input" type="text" id="costo" placeholder="" required>
                            </div>
                            <div class="formelement">
                                <label for="condicion">CONDICION IVA</label>
                                <select class="input" name="condicion" id="condicion">
                                    <option class="formdesplegar" value=""> ...</option>
                                    <option value="si"> responsable incripto</option>
                                    <option value="no"> no inscripto</option>
                                </select>
                            </div> <div class="formelement">
                            <input class="enviar" type="submit" title="cargar datos para futuras consultas" id="enviar">
                        </div>
                            
                        </div>
                    </fieldset>
            </div>
        </div>`
    a.append(opcion2)

    let enviar = document.getElementById("enviar")
    enviar.addEventListener("click", cargaformulario)

})

//CAPTURA DE DATOS DESDE FORMULARIO
function cargaformulario(send) {
    setTimeout(function () {
        a.remove();
    }, 2000);

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


    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Cargando tus datos....'
    })
}


//CONSULTA POR PARTE DEL CONTRIBUYENTE

// INGRESO DEL DNI


let opcion3 = document.createElement("div")

let op0 = document.getElementById("dniinput")
op0.addEventListener("click", (entradadni) => {

    entradadni.preventDefault()
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


        opcion3.innerHTML =


            `<div id="modulo" class="size">
    <div class="card formulario style=" width: 18rem;>
        <div class="card-body">
            <h5 class="card-title">Consultas participantes</h5>
            <p class="card-text">Utilice nuetra herramienta para conocer sus ganancias, impuestos y posibles financiaciones</p>
            <a id="rendimiento" class="separate btn btn-primary">Ver mi rendimiento e impuestos</a>
            <a id="planpago" class="separate btn btn-primary">Acceder a financiación</a>
            <a id="limpiar" class="separate btn btn-primary">Limpiar consulta<nav></nav>                       
                    <nav></nav>
                </a>
    
        </div>
    </div>`

        a.append(opcion3)

        let op4 = document.getElementById("rendimiento")
        let op5 = document.getElementById("planpago")
        let op6 = document.getElementById("limpiar")


        async function esperar() {
        }

        esperar.then
        {   op4.addEventListener("click", rendimiento)
            op5.addEventListener("click", finantiation)
            op6.addEventListener("click", limpieza)

        }

        esperar()

    }
    else {
        alert(`no se encuentra en la base de datos, vuelva a ingrsar al boton de consulta e ingrese un DNI válido `)
    }
}
)


//BOTON RENDIENTO

function rendimiento() {


    console.log("funciona click")
    let resp = document.getElementById("respuestas")
    let opcion4 = document.createElement("div")

    if (encontrado.condicion === "no") {
        opcion4.innerHTML =
            `<div class="card separate" style="width: 100%;">
        <div class="card-body formulario">
        <h5 class="card-title">Estos son tus márgenes</h5>
        <p class="card-text">NO INSCRIPTO:   
        la utilidad bruta es ${encontrado.brutanoInscripto}, no paga IVA, pero recuerde
        pagar ingresos brutos por $ ${encontrado.pagoIbb}, Solamente debes pagar ingresos brutos por $ ${encontrado.pagoIbb}</p>      
        </div>
        </div>`
        resp.append(opcion4)
    }

    else {
        opcion4.innerHTML = ` <div class="card  size separate" style="width: 100%;">
        <div class="card-body formulario">
        <h5 class="card-title">Estos son tus márgenes</h5>
        <p class="card-text"> IVA INSCRIPTO:    
        la utilidad bruta es $${encontrado.brutaInscripto}, pagás IVA y además ingresos brutos por $${encontrado.pagoIbb}, Tienes que pagar ingresos brutos por $${encontrado.pagoIbb}, 
        IVA por $${encontrado.ivaInscripto}, puedes acceder a la financiación por el IVA </p>      
        </div>
        </div>`
        resp.append(opcion4)
    }
}

//BOTON FINANCIACION

function finantiation() {

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


        parsedNuevo = JSON.parse(localStorage.getItem("nuevo"))
        parsedBase.splice(indice, indice)
        parsedBase.push(encontrado)
        localStorage.setItem(`base`, JSON.stringify(parsedBase))


        let resp = document.getElementById("respuestas")

        let opcion5 = document.createElement("div")

        opcion5.innerHTML = ` <div class="card separate size" style="width: 100%;">
            <div class="card-body formulario">
                    <h5 class="card-title">Detalle de la financiación</h5>
                    <p class="card-text">elegiste $${encontrado.cantCuotas} cuotas, pagarás $${encontrado.cantCuotas} cuotas de $${encontrado.valorCuota} con un interes del ${porcentaje}%
    
                    </p>      
                </div>
                </div>`
        resp.append(opcion5)

        Swal.fire(
            'Financiación realizada',
            'A continuación puedes consultar el detalle de las cuotas',
            'success'
        )
    }
}

//BOTON LIMPIAR


function limpieza() {
    window.location.reload()
}
