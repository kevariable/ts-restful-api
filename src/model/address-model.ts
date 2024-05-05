import { Address } from '@prisma/client'
import { Response } from './model'
import { Pagination, isPagination } from './page-model'

export type CreateAddressRequest = {
  contact_id: bigint
  street?: string | null
  city?: string | null
  province?: string | null
  country: string
  postal_code: string
}

export type UpdateAddressRequest = CreateAddressRequest & {
  id: bigint
}

export type AddressResponse = {
  id: bigint
  street: string | null
  city: string | null
  province: string | null
  country: string
  postal_code: string
}

export function toAddressResponse(
  address: Address | Pagination<Address[]>
): Response<AddressResponse> | Pagination<AddressResponse[]> {
  const callback = (address: Address) => ({
    id: address.id,

    street: address.street,
    city: address.city,
    province: address.province,
    country: address.country,
    postal_code: address.postal_code
  })

  if (isPagination<Address | Address[]>(address)) {
    return {
      data: address.data.map(callback),
      page: address.page
    }
  }

  return {
    data: callback(address)
  }
}
