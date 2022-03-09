import { InitStoragePort } from '../../domain/ports/init/InitStoragePort';
import { useAppSelector, useAppDispatch } from '../redux/ReduxHooks';
import { setInitialized, selectConfig, selectIsInitialized, selectLocale, setConfig, setLocale } from './initSlice';

export function useInitStorage(): InitStoragePort {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);
  const config = useAppSelector(selectConfig);
  const locale = useAppSelector(selectLocale);

  return {
    isInitialized,
    setInitialized() {
      return dispatch(setInitialized());
    },
    config,
    setConfig(value) {
      return dispatch(setConfig(value));
    },
    locale,
    setLocale(value) {
      return dispatch(setLocale(value));
    },
  };
}
