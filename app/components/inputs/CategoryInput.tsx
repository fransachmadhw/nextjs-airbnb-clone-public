'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex gap-3 hover:border-rose-500 transition cursor-pointer justify-start items-center hover:text-rose-500
    ${selected ? 'border-rose-500' : 'border-neutral-200'}
    ${selected && 'text-rose-500'}
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
