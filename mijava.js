baseclientes = []

//variables fijas por entidad
interes = 0.25
let porcentaje = interes * 100
let ali = 5

function contri(razon, dni, ventas, costo, condicion) {

    this.razon = razon
    this.dni = dni
    this.ventas = ventas
    this.costo = costo
    this.condicion = condicion
}

//carga manual para definir una base

let contribuyente1 = new contri(
    "celeste lopa",
    "35646599",
    35200,
    1500,
    "si")

let contribuyente2 = new contri(
    "juan rendon",
    "85646599",
    65200,
    37500,
    "no")

console.log(contribuyente1)
console.log(contribuyente2)


baseclientes.push(contribuyente1)
baseclientes.push(contribuyente2)


//ingreso de datos del contribuyente nuevo

let razon = prompt("Ingrese su razón social o nombre");
let dni = Number(prompt("ingrese su DNI"))
let ventas = Number(prompt("Ingrese el total de ventas"));
let costo = Number(prompt("Ingrese el costo de mercaderia vendida"));
let condicion = prompt("usted es reponsable inscripto? responda si o no")



//funciones contables y fiscales 

function ivabase() {
    return (ventas / (1.21))
}

function iva2() {
    return (ventas - (ventas / (1.21)))
}

function noiscripto() {
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
brutanoincripto = noiscripto()
pagoiibb = iibb()


function impuestos() {
    return pagoiibb + ivainscripto
}

totalimp = impuestos()

//CONSTRUCCION NUEVO CONTRIBUYENTE

const nuevocont = new contri(
    `${razon}`,
    `${dni}`,
    Number(`${ventas}`),
    Number(`${costo}`),
    `${condicion}`
)



//EVALUACION DE LA CONDICION FRENTE AL IVA

if (condicion == "no") {
    console.log("bien hecho")
    console.log(`la utilidad bruta es ${brutanoincripto}`)
    console.log(`el pago de ingresos brutos es de $ ${pagoiibb}`)
    nuevocont.utilidadBruta = (`${brutanoincripto}`)
    nuevocont.iibb = (`${pagoiibb}`)
    nuevocont.pagoiva = (0)
    condicion = false

    //SOLO SE CAPTURAN LOS DATOS, NO SE OFRECE FINANCIACIÓN


}

else {
    nuevocont.utilidadBruta = (`${brutainscripto}`)
    nuevocont.iibb = (`${pagoiibb}`)
    nuevocont.pagoiva = (`${ivainscripto}`)
    alert(`pagarás $${pagoiibb} de ingresos brutos`)
    alert(`pagarás $${ivainscripto} de IVA`)

    //SE CAPTURAN LOS DATOS, NO SE OFRECE FINANCIACIÓN

    let mor = prompt("quiere entrar en moratoria?")


    if (mor === "no") {
        alert(`tendrás que pagar $ ${ivainscripto} en un pago`)
        baseclientes.push(nuevocont)
        false
    }

    //SI NO ACCEDE LA FINANCIACIÓN, SE GUARDAN LOS DATOS EN LA BASE


    else {
        let cuotas = 0
        do {
            let cuotas = prompt("ingrese la cantidad de cuotas, se permiten hasta 12")
            if (cuotas > 12) {
                console.log("son demasiadas cuotas")
                false
            }
            else {
                function financiacion() {
                    return (nuevocont.pagoiva * interes / cuotas)
                }
                mensual = financiacion()
                nuevocont.cantcuotas = (`${cuotas}`)
                nuevocont.valorcuota = (`${mensual}`)

                alert(`elegiste ${cuotas} cuotas`)
                alert(`pagarás ${cuotas} cuotas de $${mensual}, con un interes del ${porcentaje}%, preciona aceptar para acceder a la financiación `)
                i = 1
                alert(`la financiación fué realizada`)


                break
            }
        } while (cuotas < 13)
    }
}

// SE GUARDAN LOS DATOS EN LA BASE, CON INFO DE FINANCIACIÓN


baseclientes.push(nuevocont)
console.log(baseclientes)


//CONSULTA DEL CONTRIBUYENTE CON DNI
do {
    dniinput = prompt(`para iniciar una consulta por favor ingrese su DNI`)
    let busqueda = baseclientes.find((busqueda) => busqueda.dni === dniinput)

    if (busqueda) {

        function consulta() {
        } {
            switch (prompt(`Elija la información que desea obtener:
            1 total de impuestos a pagar
            2 IVA a pagar
            3 conocer todos sus datos
            4 salir `)) {
                case "1":
                    (console.log(`tienes que pagar un total de impuestos de $${totalimp}`))
                    break
                case "2":
                    console.log(`tienes que pagar $${ivainscripto} en concepto de IVA`)
                    consulta()
                    break;
                case "3":
                    console.log

                        (`tu razon social es ${busqueda.razon}
                    tus ingresos brutos son de $${busqueda.ventas}
                    responsable inscrpto si/no:  ${busqueda.condicion}
                    tienes una financiación de ${busqueda.cantcuotas} cuotas de $${busqueda.valorcuota} c/u`)

                    consulta()
                    break;
                case "4":
                    resultado = "ok"
                    break;
            }
        }


        break
    }


    else {
        alert(`no se encuentra enla base de datos, haga click en aceptar, luego, ingrese un DNI válido `)
    }


} while (resultado = "ok")

function newFunction() {
    consulta()
}

