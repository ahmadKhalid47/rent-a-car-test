export function removing(file: any, files: any, setFiles: any) {
  let array = files;
  array = array.filter((e: any) => {
    // If the element is a string, it will be compared to the URL in the `file` object
    if (typeof e === "string") {
      return e !== file;
    }
    // If the element is an object, compare the `path` or `preview` properties
    else if (typeof e === "object" && e !== null) {
      return e.path !== file.path && e.preview !== file.preview;
    }
    return true;
  });
  setFiles(array);
}
