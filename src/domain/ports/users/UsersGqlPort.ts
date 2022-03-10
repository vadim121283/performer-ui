import { User } from '../../../common/domain/entity/User';

export interface UsersGqlPort {
  users: User[] | undefined;
  refetchUsers(): void;
}
