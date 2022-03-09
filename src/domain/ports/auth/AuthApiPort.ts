import { User } from '../../entity/auth/models/User';

export interface AuthApiPort {
  /**
   * @throws {Error} if credentials have not passed
   */
  loginRequest(user: string, password: string): Promise<User | undefined>;
}
