// backend/repository/guyplus.repository.js

import { Vendor, VendorOrder, VendorBenefit, VendorPayment } from '../models/guyplus.model.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * ============================================
 *   BASES DE DATOS EN MEMORIA (SIMULACIÓN)
 * ============================================
 */
const vendorsDB = [];
const vendorOrdersDB = [];
const vendorBenefitsDB = [];
const vendorPaymentsDB = [];

/**
 * ============================================
 *   REPOSITORY: VENDORS
 * ============================================
 */
export const vendorRepository = {
  create: (payload) => {
    const vendor = new Vendor({
      id: uuidv4(),
      ...payload
    });

    vendorsDB.push(vendor);
    return vendor;
  },

  findById: (id) => vendorsDB.find((v) => v.id === id),

  update: (id, payload) => {
    const index = vendorsDB.findIndex((v) => v.id === id);
    if (index === -1) return null;

    vendorsDB[index] = {
      ...vendorsDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return vendorsDB[index];
  },

  delete: (id) => {
    const index = vendorsDB.findIndex((v) => v.id === id);
    if (index === -1) return null;

    return vendorsDB.splice(index, 1)[0];
  },

  list: () => vendorsDB
};

/**
 * ============================================
 *   REPOSITORY: ORDENES DE VENDORS
 * ============================================
 */
export const vendorOrdersRepository = {
  create: (payload) => {
    const order = new VendorOrder({
      id: uuidv4(),
      ...payload
    });

    vendorOrdersDB.push(order);
    return order;
  },

  findById: (id) => vendorOrdersDB.find((o) => o.id === id),

  update: (id, payload) => {
    const index = vendorOrdersDB.findIndex((o) => o.id === id);
    if (index === -1) return null;

    vendorOrdersDB[index] = {
      ...vendorOrdersDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return vendorOrdersDB[index];
  },

  delete: (id) => {
    const index = vendorOrdersDB.findIndex((o) => o.id === id);
    if (index === -1) return null;

    return vendorOrdersDB.splice(index, 1)[0];
  },

  list: () => vendorOrdersDB
};

/**
 * ============================================
 *   REPOSITORY: BENEFICIOS DE VENDORS
 * ============================================
 */
export const vendorBenefitsRepository = {
  create: (payload) => {
    const benefit = new VendorBenefit({
      id: uuidv4(),
      ...payload
    });

    vendorBenefitsDB.push(benefit);
    return benefit;
  },

  findById: (id) => vendorBenefitsDB.find((b) => b.id === id),

  update: (id, payload) => {
    const index = vendorBenefitsDB.findIndex((b) => b.id === id);
    if (index === -1) return null;

    vendorBenefitsDB[index] = {
      ...vendorBenefitsDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return vendorBenefitsDB[index];
  },

  delete: (id) => {
    const index = vendorBenefitsDB.findIndex((b) => b.id === id);
    if (index === -1) return null;

    return vendorBenefitsDB.splice(index, 1)[0];
  },

  list: () => vendorBenefitsDB
};

/**
 * ============================================
 *   REPOSITORY: PAGOS DE VENDORS
 * ============================================
 */
export const vendorPaymentsRepository = {
  create: (payload) => {
    const payment = new VendorPayment({
      id: uuidv4(),
      ...payload
    });

    vendorPaymentsDB.push(payment);
    return payment;
  },

  findById: (id) => vendorPaymentsDB.find((p) => p.id === id),

  update: (id, payload) => {
    const index = vendorPaymentsDB.findIndex((p) => p.id === id);
    if (index === -1) return null;

    vendorPaymentsDB[index] = {
      ...vendorPaymentsDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return vendorPaymentsDB[index];
  },

  delete: (id) => {
    const index = vendorPaymentsDB.findIndex((p) => p.id === id);
    if (index === -1) return null;

    return vendorPaymentsDB.splice(index, 1)[0];
  },

  list: () => vendorPaymentsDB
};
