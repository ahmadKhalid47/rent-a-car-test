export const sort = (
  key: string,
  currentSortKey: any,
  sortOrder: any,
  sortedData: any,
  setSortedData: any,
  setSortOrder: any,
  setCurrentSortKey: any
) => {
  const newSortOrder =
    currentSortKey === key
      ? sortOrder[key] === "asc"
        ? "desc"
        : "asc"
      : "asc";

  const sorted = [...sortedData].sort((a: any, b: any) => {
    let fieldA =
      key === "vehicleId" ? JSON.parse(a?.data?.[key]) : a?.data?.[key];
    let fieldB = b?.data?.[key];

    if (typeof fieldA === "string") {
      fieldA = fieldA?.toLowerCase();
    }
    if (typeof fieldB === "string") {
      fieldB = fieldB?.toLowerCase();
    }

    if (newSortOrder === "asc") {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  setSortedData(sorted);
  setSortOrder((prev: any) => ({ ...prev, [key]: newSortOrder }));
  setCurrentSortKey(key);
};








  export const sort2 = (
    key: string,
    currentSortKey: any,
    sortOrder: any,
    sortedData: any,
    setSortedData: any,
    setSortOrder: any,
    setCurrentSortKey: any
  ) => {
    const newSortOrder =
      currentSortKey === key
        ? sortOrder[key] === "asc"
          ? "desc"
          : "asc"
        : "asc";

    const sorted = [...sortedData].sort((a: any, b: any) => {
      let fieldA = a?.[key];
      let fieldB = b?.[key];

      if (typeof fieldA === "string") {
        fieldA = fieldA?.toLowerCase();
      }
      if (typeof fieldB === "string") {
        fieldB = fieldB?.toLowerCase();
      }

      if (newSortOrder === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    setSortedData(sorted);
    setSortOrder((prev:any) => ({ ...prev, [key]: newSortOrder }));
    setCurrentSortKey(key);
  };
