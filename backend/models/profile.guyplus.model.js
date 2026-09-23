// backend/models/profile.guyplus.model.js

export default class ProfileGuyPlus {
  constructor({
    id,
    name,
    phone,
    skills,
    rating,
    certifications,
    experience_years,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;

    this.skills = skills || [];
    this.rating = rating || 0;

    this.certifications = certifications || [];
    this.experience_years = experience_years || 0;

    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  /**
   * Convierte un registro de Supabase en un objeto ProfileGuyPlus
   */
  static fromSupabase(record) {
    if (!record) return null;

    return new ProfileGuyPlus({
      id: record.id,
      name: record.name,
      phone: record.phone,
      skills: record.skills,
      rating: record.rating,
      certifications: record.certifications,
      experience_years: record.experience_years,
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
      certifications: this.certifications,
      experience_years: this.experience_years,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}
