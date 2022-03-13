/**
 * Делает фальшивые запросы на сервер.
 * @param {any} response Возвращает обратно то что будет тут
 * @returns Promise<response>
 */
export function fakeRest(response) {
  return new Promise((res) =>
    setTimeout(() => {
      return res(response);
    }, 10)
  );
}
