class Guy {
    constructor({ id, name, phone, skills = [] }) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.skills = skills;
        this.rating = 0;
        this.ratings = [];
        this.createdAt = new Date().toISOString();
        this.updatedAt = null;
    }
}

module.exports = Guy;
