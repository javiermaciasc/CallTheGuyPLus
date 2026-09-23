class Order {
    constructor({ id, clientId, guyId, amount, description }) {
        this.id = id;                     // número correlativo compartido con factura
        this.clientId = clientId;
        this.guyId = guyId;
        this.amount = amount;
        this.description = description;

        this.status = 'pending';          // pendiente de pago
        this.invoiceReleased = false;     // factura aún no liberada

        this.createdAt = new Date().toISOString();
        this.updatedAt = null;
    }
}

module.exports = Order;
