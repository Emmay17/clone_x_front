interface MenuNavButtonProps {
  icone: string;
  label: string;
  onClick: () => void;
}

export default function MenuNavButton({
  icone,
  label,
  onClick,
}: MenuNavButtonProps) {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center md:gap-3 cursor-pointer rounded-full w-full lg:w-auto hover:bg-gray-200/10 px-4 py-2 md:px-4"
    >
      <img
        src={icone}
        alt={label}
        className="w-[26.25px] h-[26.25px] md:w-7 md:h-7"
      />
      <p className="hidden  lg:block text-lg font-semibold">{label}</p>
    </div>
  );
}
