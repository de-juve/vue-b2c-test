export default function parseAxiosErrorResponseBody(error) {
  return error.response.data ? error.response.data : { error: true, view: true, message: 'Неизвестная ошибка' };
}
