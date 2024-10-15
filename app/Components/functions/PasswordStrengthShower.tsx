export default function PasswordStrengthShower({ score, message }: any) {
  return (
    <div className="w-full h-fit flex flex-col justify-start items-center">
      <div className="w-full h-fit flex justify-start items-center gap-[1.25%]">
        {Array.from({ length: score }, (_, i) => (
          <div
            className={`w-[19%] h-[5px] rounded-[5px] ${
              score <= 1
                ? "bg-red-500"
                : score === 2
                ? "bg-orange-500"
                : score === 3
                ? "bg-yellow-500"
                : score === 4
                ? "bg-blue-500"
                : score === 5
                ? "bg-green-500"
                : ""
            }`}
          />
        ))}
      </div>
      <span
        className={`flex justify-start items-center font-[600] text-[14px] leading-[17px] w-full mt-1 ${
          score <= 1
            ? "text-red-500"
            : score === 2
            ? "text-orange-500"
            : score === 3
            ? "text-yellow-500"
            : score === 4
            ? "text-blue-500"
            : score === 5
            ? "text-green-500"
            : ""
        }`}
      >
        {message}
      </span>
    </div>
  );
}
