// COMPONENT PROPS
export type PaginationComponentProps = {
  
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  onLimitChange?: (limit: number) => void
}