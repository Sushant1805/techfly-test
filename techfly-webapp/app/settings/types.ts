export interface Address {
  line1: string
  line2?: string
  city: string
  state: string
  pinCode: string
  country: string
}

export interface CompanyProfile {
  name: string
  legalEntityType: string
  cin: string | null
  incorporationDate: string | null
  website: string
  tagline: string
  primaryEmail: string
  salesEmail: string
  billingEmail: string
  primaryPhone: string
  secondaryPhone: string | null
  address: Address
  gstNumber: string
  panNumber: string
  tanNumber: string | null
  msmeNumber: string | null
}

export interface TeamMember {
  id: string
  name: string
  avatar: string
  initials: string
  email: string
  phone: string | null
  role: "Super Admin" | "Admin" | "Sales Executive" | "Support"
  status: "Active" | "Inactive"
  lastActive: string
  twoFactorEnabled: boolean
  joinedAt: string
  assignedLeads?: number
  assignedCustomers?: number
}

export interface Permission {
  feature: string
  category: string
  superAdmin: boolean
  admin: boolean
  salesExecutive: boolean
  support: boolean
  locked?: boolean
}

export interface FeatureFlag {
  id: string
  name: string
  key: string
  status: boolean
  availableFor: "All Plans" | "Free+" | "Basic+" | "Pro Plan only" | "Beta" | "Coming Soon"
  betaCustomerIds: string[]
  description: string
  lastChangedAt: string | null
  lastChangedBy: string | null
}

export interface ApiKey {
  id: string
  label: string
  key: string
  permissions: ("read" | "write" | "delete")[]
  expiresAt: string | null
  lastUsedAt: string | null
  createdAt: string
  createdBy: string
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  secret: string
  active: boolean
  createdAt: string
  lastTriggeredAt: string | null
  failureCount: number
}

export interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  action: "View" | "Create" | "Update" | "Delete" | "Login" | "Logout" | "Export" | "Settings" | "Completed" | "Converted" | "Lost" | "Resolved" | "Auto-renewed" | "Logged" | "Generated"
  resource: string
  resourceId: string | null
  details: string
  ipAddress: string
  userAgent: string
  sessionId: string
}

export interface NotificationRule {
  id: string
  event: string
  category: "Sales" | "Customer" | "System"
  enabled: boolean
  notifyRoles: string[]
  channels: ("inApp" | "email" | "whatsapp" | "slack")[]
}

export interface MessageTemplate {
  id: string
  name: string
  channel: "Email" | "WhatsApp" | "SMS" | "Both"
  subject: string | null
  body: string
  variables: string[]
  status: "Active" | "Draft" | "Inactive"
  lastEditedAt: string
  lastEditedBy: string
}
