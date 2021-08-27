import React, { useState } from 'react';

import { TailwindComponent } from '../types/Misc';

interface Props {
  checked?: boolean;
  onClick?: (isChecked: boolean) => void;
}

export const Check: TailwindComponent<Props, HTMLDivElement, 'className' | 'onClick'> = ({
  checked = false,
  onClick,
  ...other
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  function onClickCb(e: React.MouseEvent<HTMLInputElement>): void {
    e.stopPropagation();
    const nextChecked = !isChecked;
    setIsChecked(nextChecked);
    if (onClick) onClick(nextChecked);
  }

  return (
    <div
      className="rounded-full border-2 border-gray-400 h-6 w-6 flex items-center justify-center p-1 box-border"
      onClick={onClickCb}
      {...other}
    >
      {isChecked && <span className="select-none text-blue-900">✔</span>}
      <input className="hidden" type="checkbox" defaultChecked={isChecked} />
    </div>
  );
};
