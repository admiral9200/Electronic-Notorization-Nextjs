import { InstitutionType, Role } from '@prisma/client'
import { string, z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const accountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable().transform((val) => val || undefined),
  access_token: z.string().nullable().transform((val) => val || undefined),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable().transform((val) => val || undefined),
  scope: z.string().nullable().transform((val) => val || undefined),
  id_token: z.string().nullable().transform((val) => val || undefined),
  session_state: z.string().nullable().transform((val) => val || undefined),
});

// Session schema
const sessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
});

const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  surname: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
  emailVerificationToken: z.string().optional(),
  passwordHash: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  wallet: z.string().optional(),
  resetPasswordToken: z.string().optional(),
  resetPasswordTokenExpiry: z.date().optional(),
  image: z.string().optional(),
  createdAt: z.date().default(new Date()),
  role: z.nativeEnum(Role).default(Role.STUDENT),
  accounts: z.array(accountSchema).optional(),
  sessions: z.array(sessionSchema).optional(),
});


export const institutionSchema = z.object({
  id: z.number().min(1),
  logo: string(),
  name: z.string(),
  location: z.string(),
  genre: z.nativeEnum(InstitutionType),
})

export type Institution = z.infer<typeof institutionSchema>
