export type Role = 'ADMIN' | 'USER' |'DEV'
export class UserDto {
  id: number
  username: string
  password: string
  email: string
  roles: Role[]
  constructor(user: { id: number, username: string, password: string, email: string, roles: Role[] }) {
    this.id = user.id
    this.username = user.username
    this.password = user.password
    this.email = user.email
    this.roles = user.roles
  }

  
}
