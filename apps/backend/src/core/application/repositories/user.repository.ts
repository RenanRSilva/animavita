import { User } from '../../domain/user/user';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export default interface UserRepository {
  getByEmail(email: string): Promise<User>;
}
