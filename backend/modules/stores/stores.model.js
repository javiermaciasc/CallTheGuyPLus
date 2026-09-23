class Store {
    constructor({ id, name, address, phone, email }) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone || null;
        this.email = email || null;

        this.createdAt = new Date().toISOString();
        this.updatedAt = null;
    }
}

module.exports = Store;
