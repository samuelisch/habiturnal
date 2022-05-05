import { format, parseISO } from 'date-fns';

export const calcReadTime = (num: number) => {
  return Math.ceil(num / 500);
};

export const formatDate = (date: string) => {
  const dateISO = parseISO(date);
  return format(dateISO, 'MMMM d, R');
};
