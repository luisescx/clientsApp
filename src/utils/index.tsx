export function formatDateToString(date: Date) {
  return new Intl.DateTimeFormat('br-PT').format(new Date(date));
}

export function parseStringDateFormat(stringDate: string) {
  const day = stringDate.split('/')[0];
  const month = stringDate.split('/')[1];
  const year = stringDate.split('/')[2];

  return `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`;
}

export function parseStringToDate(stringDate: string) {
  return new Date(parseStringDateFormat(stringDate));
}
