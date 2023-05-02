class Egreso extends Dato {
    static contadorEgresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = Egreso.incrementarId();
        // console.log(this._id);
    }

    static incrementarId(){
        return this.contadorEgresos++;
    }

    get id() {
        return this._id;
    }
}