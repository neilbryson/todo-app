import React, { useState } from 'react';

export const Check = () => {
  const [checked, setChecked] = useState(false);

  function onClick(e: React.MouseEvent<HTMLInputElement>): void {
    setChecked(!checked);
    e.stopPropagation();
  }

  return (
    <div
      className="rounded-full border-2 border-gray-400 h-6 w-6 flex items-center justify-center p-1 box-border"
      onClick={onClick}
    >
      {checked && <span className="select-none text-blue-900">✔</span>}
      <input className="hidden" type="checkbox" defaultChecked={checked} />
    </div>
  );
};
