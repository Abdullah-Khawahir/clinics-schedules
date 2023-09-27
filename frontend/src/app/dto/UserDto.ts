export class UserDto {
  id: number
  username: string
  password: string
  email: string
  roles: string[]
  constructor(user: { id: number, username: string, password: string, email: string, roles: string[] }) {
    this.id = user.id
    this.username = user.username
    this.password = user.password
    this.email = user.email
    this.roles = user.roles
  }

  
}
