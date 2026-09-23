class User {
    constructor({ id, name, email, role }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role || 'client';

        this.createdAt = new Date().toISOString();
        this.updatedAt = null;
    }
}

module.exports = User;
