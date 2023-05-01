let ingresos = [new Ingreso('Salario', 20000), new Ingreso('Venta auto', 50000)];
const egresos = [new Egreso('Renta', 4000), new Egreso('Ropa', 800)];

const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    console.log(formatoMoneda(presupuesto));
    console.log(formatoPorcentaje(porcentajeEgreso));
    console.log(formatoMoneda(totalIngresos()));
    console.log(formatoMoneda(totalEgresos()));
}


const totalIngresos = () => {
    let totalIngreso = 0;
    let ingreso = 0;
    // let ingresos = [9000, 400]

    for (ingreso of ingresos) {
        totalIngreso = totalIngreso + ingreso['_valor'];
    }

    return totalIngreso;
}

const totalEgresos = () => {
    let totalEgreso = 0;
    let egreso = 0;
    // let egresos = [900, 400]

    for (egreso of egresos) {
        totalEgreso += egreso['_valor'];
    }

    return totalEgreso;
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', {style:"currency", currency:"MXN", minimumFractionDigits: 2})
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', {style:"percent", minimumFractionDigits: 2});
}