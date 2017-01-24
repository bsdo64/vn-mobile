export const INPUT_SEARCH_QUERY = 'INPUT_SEARCH_QUERY';

export function inputSearchQuery(query) {
  return {
    type: INPUT_SEARCH_QUERY,
    query
  }
}