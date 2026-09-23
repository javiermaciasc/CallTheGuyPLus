// backend/models/profile.client.model.js

export default class ProfileClient {
  constructor({
    id,
    name,
    email,
    phone,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  /**
   * Convierte un registro de Supabase en un objeto ProfileClient
   */
  static fromSupabase(record) {
    if (!record) return null;

    return new ProfileClient({
      id: record.id,
      name: record.name,
      email: record.email,
      phone: record.phone,
      created_at: record.created_at,
      updated_at: record.updated_at
    });
  }

  /**
   * Convierte el modelo a JSON limpio
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}
