import { Response } from './model'

export type Pagination<T> = Response<T> & {
  page: {
    current_page: number
    total_page: number
    size: number
  }
}

export type PageRequest = {
  page: number
  size: number
}

export const isPagination = <T>(
  data: T | Pagination<T>
): data is Pagination<T> => (data as Pagination<T>).page !== undefined
