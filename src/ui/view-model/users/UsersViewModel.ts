import { useInjection } from '../../../di/inject';
import { useInitialize } from '../../../domain/use-cases/init/initialize';

export interface UsersViewModel {
  initialize(): Promise<boolean>;
}

export function useUsersViewModel(): UsersViewModel {
  const { initialize } = useInitialize(useInjection);
  return {
    initialize,
  };
}
