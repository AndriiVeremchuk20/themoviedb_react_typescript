export const checkPage = (page: string): boolean => {
  return !isNaN(Number(page)) && page[0] !== "-";
};
