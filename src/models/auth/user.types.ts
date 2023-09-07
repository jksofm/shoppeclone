type UserRole = 'Admin' | 'User'
export interface userInfo {
  _id: string
  roles: UserRole[]
  email: string
  name: string
  date_of_birth: string | Date
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  avatar: string
}
export interface updateBody {
  address?: string
  date_of_birth?: string
  name?: string
  phone?: string
  avatar?: string
  password?: string
  new_password?: string
}
