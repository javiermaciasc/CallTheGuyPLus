class Client {
    constructor({ id, name, phone, email, address }) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.createdAt = new Date().toISOString();
        this.updatedAt = null;
    }
}

module.exports = Client;
