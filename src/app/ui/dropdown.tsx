import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { SortOrder } from '../dashboard/profile/types';

interface DropdownProps {
  options: SortOrder[];
  currentOption: SortOrder;
  handleOption: (selectedOption: SortOrder) => void;
}

export const Dropdown = ({ options, currentOption, handleOption }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: SortOrder) => {
    handleOption(item);
    setIsOpen(false);
  };

  return (
    <div className="relative z-10 mb-5 flex cursor-pointer justify-self-end rounded-lg bg-customBackground p-2 text-sm shadow-lg">
      <h2 className="flex items-center justify-center">
        <ChevronDown size={13} />
        <span onClick={toggleDropdown} className="flex items-center">
          {currentOption}
        </span>
      </h2>
      {isOpen && (
        <ul className="absolute left-0 right-0 top-full flex flex-col rounded-lg bg-customBackground">
          {options.map((option) => (
            <li
              className="rounded-lg p-2 transition-all duration-300 hover:bg-customButton"
              key={option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
