class Payment {
    constructor({ id, orderId, clientId, guyId, amount, method }) {
        this.id = id;
        this.orderId = orderId;
        this.clientId = clientId;
        this.guyId = guyId;
        this.amount = amount;
        this.method = method || 'unknown';

        this.createdAt = new Date().toISOString();
        this.updatedAt = null;
    }
}

module.exports = Payment;
