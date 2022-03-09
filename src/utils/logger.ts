export function useLogger(component: string) {
  function log(type: 'debug' | 'info' | 'warn' | 'error', message: string, data?: any[]) {
    if (data) return console[type](`${component} | ${message}`, data);
    return console[type](`${component} | ${message}`);
  }

  function debug(message: string, data?: any) {
    log('debug', message, data);
  }

  function info(message: string, data?: any) {
    log('info', message, data);
  }

  function warn(message: string, data?: any) {
    log('warn', message, data);
  }

  function error(message: string, data?: any) {
    log('error', message, data);
  }

  return {
    debug,
    info,
    warn,
    error,
  };
}
