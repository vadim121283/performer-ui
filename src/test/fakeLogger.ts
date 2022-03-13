/**
 * Логгер для тестов. ПО умолчанию отключает все выводы в консоль чтобы не мешались.
 * @param component Название компонента.
 * @param consoleOn Включить вывод в консоль.
 * @returns
 */
export function useFakeLogger(component: string, consoleOn?: boolean) {
  function log(message: string, data?: any[]) {
    if (!consoleOn) return;
    if (data) return console.debug(`${component} | ${message}`, data);
    return console.debug(`${component} | ${message}`);
  }

  function debug(message: string, data?: any) {
    log(message, data);
  }

  function info(message: string, data?: any) {
    log(message, data);
  }

  function warn(message: string, data?: any) {
    log(message, data);
  }

  function error(message: string, data?: any) {
    log(message, data);
  }

  return {
    debug,
    info,
    warn,
    error,
  };
}
