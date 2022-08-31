
interes = 0.25
let porcentaje = interes * 100
let ventas = prompt("Ingrese el total de ventas")
let costo = prompt("Ingrese el total de costo")
let ali = prompt("Ingrese alicuota IIBB")


function ivabase() {
    return ventas / (1, 21)
}

function iva2() {
    return ventas - (ventas / (1.21))
}

function noiscripto() {
    return ventas - costo
}

function margen() {
    return netoiva - costo
}

function iibb() {
    return ventas * (ali / 100)
}


pagoiva = iva2()
netoiva = ivabase()
ubrutaiva = margen()
ubruta = noiscripto()
pagoiibb = iibb()



let responsable = prompt("usted es reponsable inscripto? responda si o no")

if (responsable == "no") {
    console.log("bien hecho")
    console.log(`la utilidad bruta es ${ubruta}`)
    console.log(`el pago de ingresos brutos es de $ ${pagoiibb}`)
    responsable = false
}

else {
    console.log(`la utilidad bruta es ${ubrutaiva}`)
    console.log(`el pago de ingresos brutos es de $ ${pagoiibb}`)
    console.log(`el monto por iva es de $ ${pagoiva}`)
    let mor = prompt("quiere entrar en moratoria?")


    if (mor == "no") {
        console.log(`tendrás que pagar $ ${pagoiva} en un pago`)
        false
    }

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
                    return (pagoiva * interes / cuotas)
                }
                mensual = financiacion()
                console.log(`elegiste ${cuotas} cuotas`)
                console.log(`pagarás ${cuotas} cuotas de $${mensual}, con un interes del ${porcentaje}% `)
                i = 1
                
                for (i; i <= (12-(12-cuotas)); i = i + 1) {
                    console.log((`la cuota numero ${i} es de ${mensual}`))
                }
                break
            }
        } while (cuotas < 13)
    }
}
