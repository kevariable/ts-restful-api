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

  static readonly SEARCH: ZodType = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    size: z.number().positive(),
    page: z.number().positive()
  })
}
