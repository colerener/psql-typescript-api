interface Document {
  [key: string]: any
}

export const prepareQueryFieldsFromMap = (document: Document, queryString: string, params: any[]): string  => {
  let paramCount: number = 0;
  let paramsEntries: any[] = Object.entries(document);
  for (let i: number = 0; i < paramsEntries.length; i++) {
    queryString += `${paramsEntries[i][0]}=$${++paramCount}`;
    params.push(paramsEntries[i][1]);
  }
  return queryString;
};
