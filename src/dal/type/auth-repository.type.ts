import { UserEntity } from '../../models/entities/user.entity'

export type CreateUserEntity = Omit<UserEntity, 'id' | 'createdAt'>

export type FindUserEntity = Omit<UserEntity, 'id' | 'name' | 'createdAt'>
