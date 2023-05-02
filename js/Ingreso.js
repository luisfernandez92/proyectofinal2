class Ingreso extends Dato {
    static contadorIngresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = Ingreso.incrementarId();
    }

    static incrementarId(){
        return this.contadorIngresos++;
    }

    get id() {
        return this._id;
    }
}