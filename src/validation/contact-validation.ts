import { ZodType, z } from 'zod'

export class ContactValidation {
  static readonly #default = {
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional()
  }

  static readonly CREATE: ZodType = z.object(this.#default)

  static readonly UPDATE: ZodType = z.object({
    ...this.#default,
    id: z.bigint()
  })
}
