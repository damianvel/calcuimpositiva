baseclientes = []


let contribuyente = {
    "razon": "JUAN CAVALLO",
    "dni": "33731345",
    "ventas": "10000",
    "condicion": "SI",
    "utilidadBruta": "2764.462809917355",
    "iibb": "500",
    "pagoiva": "1735"
}

baseclientes.push(contribuyente)

let contribuyente2 = {
    "razon": "CARLOS LOPEZ",
    "dni": "33731348",
    "ventas": "100000",
    "condicion": "SI",
    "utilidadBruta": "4000",
    "iibb": "3500",
    "pagoiva": "900"
}

baseclientes.push(contribuyente2)


//variables fijas por entidad


interes = 0.25
let porcentaje = interes * 100
let ali = 5


//funciones contables y fiscales

function ivabase() {
    return (ventas / (1.21))
}

function iva2() {
    return ventas - (ventas / (1.21))
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

//ingreso de datos del contribuyente

razon = prompt("Ingrese su razón social o nombre");
dni = prompt("ingrese su DNI")
ventas = prompt("Ingrese el total de ventas");
costo = prompt("Ingrese el costo de mercaderia vendida");
condicion = prompt("usted es reponsable inscripto? responda si o no")



//toma nombre del contribuyente

function nuevo() {

    this.razon = razon
    this.dni = dni
    this.ventas = ventas
    this.condicion = condicion
}
const nuevocont = new nuevo(`${razon}, ${dni}, ${ventas}, ${condicion}`)


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

    //SE CAPTURAN LOS DATOS, NO SE OFRECE FINANCIACIÓN

    let mor = prompt("quiere entrar en moratoria?")


    if (mor == "no") {
        console.log(`tendrás que pagar $ ${ivainscripto} en un pago`)
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


                break
            }
        } while (cuotas < 13)
    }
}

// SE GUARDAN LOS DATOS EN LA BASE, CON INFO DE FINANCIACIÓN


baseclientes.push(nuevocont)


//CONSULTA DEL CONTRIBUYENTE CON DNI
do {
    dniinput = prompt(`ingrese su DNI`)
    const busqueda = baseclientes.find((busqueda) => busqueda.dni === dniinput)

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
                    consulta()
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
                    tienes una financiación de ${busqueda.cantcuotas} de $${busqueda.valorcuota} c/u`)

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
        console.log(`no se encuentra enla base de datos `)
    }


} while (resultado = "ok")

