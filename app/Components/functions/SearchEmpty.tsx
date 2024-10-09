import { LiaTimesSolid } from "react-icons/lia";
import { FaTimes, FaTimesCircle } from "react-icons/fa";

export default function SearchEmpty({ classes, setState }: any) {
  return (
    <LiaTimesSolid
      className={`${classes} border-black h-full flex justify-center items-center absolute cursor-pointer text-black`}
      onClick={() => {
        setState("");
      }}
    />
  );
}
