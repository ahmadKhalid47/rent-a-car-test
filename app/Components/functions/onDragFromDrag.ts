import { useCallback } from "react";
let allowedTypes = ["image/jpeg", "image/png"];

export const useFileDrop = (setFilesCallback: (files: any[]) => void) => {
  return useCallback(
    (acceptedFiles: any) => {
      const filteredFiles = acceptedFiles.filter((file: any) => {
        if (!allowedTypes.includes(file.type)) {
          alert(
            `File ${
              file.name
            } is not a supported format. Please upload ${allowedTypes.join(
              " or "
            )} files.`
          );
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 5 MB.`);
          return false;
        }
        return true;
      });

      setFilesCallback(
        filteredFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFilesCallback]
  );
};
