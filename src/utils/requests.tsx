/**
 *
 * @param linkHeader json-serve API Link response header
 * @returns Pagination object (key is the prev/next attr, and value is the url to the endpoint)
 */
export function parseLinkHeader(linkHeader: string | null) {
  if (!linkHeader) {
    return {};
  }

  const linkHeadersArray = linkHeader.split(', ').map((header) => header.split('; '));
  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, '').replace('rel=', '');
    const thisHeaderQuery = `?${header[0].slice(1, -1).split('?')[1]}`;
    return [thisHeaderRel, thisHeaderQuery];
  });

  return Object.fromEntries(linkHeadersMap);
}
