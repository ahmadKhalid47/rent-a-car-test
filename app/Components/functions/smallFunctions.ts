import { useState } from "react";

function useItemToDelete() {
  const [itemToDeleteMany, setItemToDeleteMany] = useState<any>([]);

  const handlePushItem = (_id: any) => {
    setItemToDeleteMany((prevArray: any) => {
      const isPresent = prevArray?.includes(_id);

      if (isPresent) {
        return prevArray.filter((item: any) => item !== _id);
      } else {
        return [...prevArray, _id];
      }
    });
  };

  return [itemToDeleteMany, setItemToDeleteMany, handlePushItem];
}

export default useItemToDelete;
