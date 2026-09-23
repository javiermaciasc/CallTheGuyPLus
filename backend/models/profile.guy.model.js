// backend/models/profile.guy.model.js

export default class ProfileGuy {
  constructor({
    id,
    name,
    phone,
    skills,
    rating,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;

    this.skills = skills || [];
    this.rating = rating || 0;

    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  /**
   * Convierte un registro de Supabase en un objeto ProfileGuy
   */
  static fromSupabase(record) {
    if (!record) return null;

    return new ProfileGuy({
      id: record.id,
      name: record.name,
      phone: record.phone,
      skills: record.skills,
      rating: record.rating,
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
      phone: this.phone,
      skills: this.skills,
      rating: this.rating,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}
