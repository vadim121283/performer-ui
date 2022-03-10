import { User } from '../../../common/domain/entity/User';

export interface AuthApiPort {
  /**
   * @throws {Error} if credentials have not passed
   */
  loginRequest(user: string, password: string): Promise<User | undefined>;
}
