import { lineWobble } from "ldrs";

lineWobble.register();

export default function Loader() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <l-line-wobble
        size="80"
        stroke="5"
        bg-opacity="0.1"
        speed="1.75"
        color="#242e69"
      ></l-line-wobble>
    </div>
  );
}

export function SmallLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <l-line-wobble
        size="80"
        stroke="5"
        bg-opacity="0.1"
        speed="1.75"
        color="white"
      ></l-line-wobble>
    </div>
  );
}
