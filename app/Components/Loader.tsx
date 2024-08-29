export default function Loader() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center absolute top-0">
      <div className="loader"></div>
    </div>
  );
}

export function MediumLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}

export function SmallLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="loader2">
        <div className="dot" />
      </div>
    </div>
  );
}
