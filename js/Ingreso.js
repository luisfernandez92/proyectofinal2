class Ingreso extends Dato {
    static contadorIngresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++this.contadorIngresos;
    }

    get id() {
        return this._id;
    }
}