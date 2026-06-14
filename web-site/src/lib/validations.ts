import { z } from 'zod';

export const quoteSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  country: z.string().optional(),
  productId: z.string().optional(),
  productName: z.string().min(1, 'Le produit est requis'),
  quantity: z.number().int().min(1, 'La quantité doit être au moins 1').default(1),
  message: z.string().optional(),
});

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Le sujet est requis'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  brand: z.string().min(1, 'La marque est requise'),
  model: z.string().min(1, 'Le modèle est requis'),
  description: z.string().min(1, 'La description est requise'),
  descriptionEn: z.string().optional(),
  descriptionEs: z.string().optional(),
  descriptionZh: z.string().optional(),
  categoryId: z.string().min(1, 'La catégorie est requise'),
  featured: z.boolean().default(false),
  status: z.enum(['ACTIVE', 'ARCHIVED']).default('ACTIVE'),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  order: z.number().int().default(0),
});

export const invoiceItemSchema = z.object({
  productId: z.string().optional(),
  description: z.string().min(1, 'La description est requise'),
  quantity: z.number().min(0.01),
  unitPrice: z.number().min(0),
  unit: z.string().optional(),
});

export const invoiceSchema = z.object({
  number: z.string().min(1, 'Le numéro est requis'),
  templateId: z.string().optional(),
  clientName: z.string().min(1, 'Le nom du client est requis'),
  clientEmail: z.string().email().optional().or(z.literal('')),
  clientPhone: z.string().optional(),
  clientAddr: z.string().optional(),
  currency: z.string().default('XAF'),
  taxRate: z.number().min(0).max(100).default(0),
  discount: z.number().min(0).max(100).default(0),
  notes: z.string().optional(),
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'CANCELLED']).default('DRAFT'),
  dueAt: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'Au moins un article est requis'),
});

export const transactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1, 'La catégorie est requise'),
  amount: z.number().positive('Le montant doit être positif'),
  currency: z.string().default('XAF'),
  description: z.string().min(1, 'La description est requise'),
  date: z.string(),
  reference: z.string().optional(),
  creditId: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').optional(),
  roleId: z.string().optional(),
  active: z.boolean().default(true),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
