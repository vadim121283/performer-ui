import { useInjection } from '../../../di/inject';
import { useInitialize } from '../../../domain/use-cases/init/initialize';

export interface InitViewModel {
  initialize(): Promise<boolean>;
}

export function useInitViewModel(): InitViewModel {
  const { initialize } = useInitialize(useInjection);
  return {
    initialize,
  };
}
