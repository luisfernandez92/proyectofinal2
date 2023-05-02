let ingresos = [];
let egresos = [];

document.body.onload = ()=>{
    cargarApp();
};

const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    // Validar si el porcentaje es infinity o NaN
    if (porcentajeEgreso == Infinity) porcentajeEgreso = 0;
    else if (isNaN(porcentajeEgreso)) porcentajeEgreso = 0;

    document.querySelector('#presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.querySelector('#porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.querySelector('#ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.querySelector('#egresos').innerHTML = formatoMoneda(totalEgresos());

    // console.log(formatoMoneda(presupuesto));
    // console.log(formatoPorcentaje(porcentajeEgreso));
    // console.log(formatoMoneda(totalIngresos()));
    // console.log(formatoMoneda(totalEgresos()));
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

const cargarIngresos = () => {
    let ingresosHTML = '';
    let ingreso = 0;
    
    for (ingreso of ingresos) {
        ingresosHTML = ingresosHTML + crearIngresoHTML(ingreso);
    }

    document.querySelector('#lista-ingresos').innerHTML = ingresosHTML;
}

const cargarEgresos = () => {
    let egresosHTML = '';
    let egreso = 0;

    for (egreso of egresos) {
        egresosHTML = egresosHTML + crearEgresosHTML(egreso);
    }

    document.querySelector('#lista-egresos').innerHTML = egresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)} MXN</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick='eliminarIngreso(${ingreso.id});'><ion-icon name="close-circle-outline"></ion-icon></button>
            </div>
        </div>
    </div>
    `;  
    
    return ingresoHTML;
}

const crearEgresosHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)} MXN</div>
            <div class="elemento_porcentaje">${formatoPorcentaje((egreso.valor * 100 / totalEgresos()) / 100)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick='eliminarEgreso(${egreso._id});'><ion-icon name="close-circle-outline"></ion-icon></button>
            </div>
        </div>
    </div>
    `;

    return egresoHTML;
}

const eliminarEgreso = (id_egreso) => {
    let indiceEliminar = egresos.findIndex((egreso) => {
        return egreso._id == id_egreso;
    });

    console.log(indiceEliminar);

    egresos.splice(indiceEliminar, 1);
    cargarEgresos();
    cargarCabecero();
}

const eliminarIngreso = (id_ingreso) => {
    let indiceEliminar = ingresos.findIndex((ingreso) => {
        return ingreso._id == id_ingreso;
    });
    
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const agregarDato = () => {
    
    let forma = document.getElementById('forma');    
    let tipo = forma['tipo'].value;
    let descripcion = forma['descripcion'].value;
    let valor = forma['valor'].value;
    let primeraVez = false;
    let presupuesto = totalIngresos() - totalEgresos();

    if (descripcion != '' && (valor != '' && valor != 0)) {
        if (tipo == 'ingreso') {
            ingresos.push(new Ingreso(descripcion, parseFloat(valor)));
            cargarCabecero();
            cargarIngresos();
            LimpiarCampos();
        }else {
            egresos.push(new Ingreso(descripcion, parseFloat(valor)))
            cargarCabecero();
            cargarEgresos();
            LimpiarCampos();
        }  
    }
}


function LimpiarCampos(){
    let forma = document.getElementById('forma');  
    
    forma['descripcion'].value = '';
    forma['valor'].value = 0;
}
