export function removing(file: any, files: any, setFiles: any) {
  let array = files;
  array = array.filter((e: any) => {
    
    if (typeof e === "string") {
      return e !== file;
    }
    
    else if (typeof e === "object" && e !== null) {
      return e.path !== file.path && e.preview !== file.preview;
    }
    return true;
  });
  setFiles(array);
}
