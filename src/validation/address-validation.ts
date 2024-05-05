import { ZodType, z } from 'zod'

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: z.bigint(),
    street: z.string().min(0).max(255).optional(),
    city: z.string().min(0).max(255).optional(),
    province: z.string().min(0).max(255).optional(),
    country: z.string().min(0).max(255),
    postal_code: z.string().min(0).max(255)
  })
}
