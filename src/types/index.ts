export type PlanType = "month" | "quarter" | "halfYear";

export type UserRole = "admin" | "manager" | "employee";

export type SubscriptionStatus = "active" | "expiring" | "expired" | "renewed";

export type ClientTier = "vip" | "normal";

export type PaymentMethod = "cash" | "transfer" | "card" | "online";

export type SubscriptionDuration =
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "halfYear"
  | "year"
  | "custom";

export interface Plan {
  id: PlanType;
  title: string;
  price: number;
  durationLabel: string;
  months: number;
  whatsappMessage: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  organizationId: string;
}

export interface Client {
  id: string;
  organizationId: string;
  name: string;
  phone: string;
  email?: string;
  subscriptionType: string;
  customSubscriptionType?: string;
  serviceName: string;
  duration: SubscriptionDuration;
  customDays?: number;
  startDate: string;
  endDate: string;
  price: number;
  paymentMethod: PaymentMethod;
  status: SubscriptionStatus;
  notes?: string;
  internalNotes?: string;
  tier: ClientTier;
  archived?: boolean;
  addedAt: string;
  addedBy: string;
  addedByName: string;
  paymentProofUrl?: string;
  renewedAt?: string;
}

export interface Renewal {
  id: string;
  organizationId?: string;
  clientId: string;
  clientName: string;
  subscriptionType: string;
  serviceName: string;
  duration: SubscriptionDuration;
  startDate: string;
  endDate: string;
  price: number;
  notes?: string;
  renewedBy: string;
  renewedAt: string;
}

export interface Invoice {
  id: string;
  organizationId?: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  subscriptionType: string;
  serviceName: string;
  duration: string;
  startDate: string;
  endDate: string;
  subtotal: number;
  tax?: number;
  total: number;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  createdBy: string;
}

export interface BusinessSettings {
  businessName: string;
  whatsapp: string;
  email: string;
  logoUrl?: string;
  currency: "SAR";
  alertDays: number;
  invoiceTaxEnabled: boolean;
  invoiceTaxRate: number;
  invoiceThanks: string;
  messageTemplate: string;
}

export interface ActivityLog {
  id: string;
  actorName: string;
  actorId: string;
  action: string;
  entityType: "client" | "invoice" | "renewal" | "user" | "settings" | "activation";
  entityId: string;
  createdAt: string;
}
