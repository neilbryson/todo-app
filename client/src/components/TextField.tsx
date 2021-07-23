import React, { HTMLAttributes, ReactElement } from 'react';

export const TextField = ({ ...other }: HTMLAttributes<HTMLInputElement>): ReactElement<HTMLInputElement> => {
  return <input className="rounded p-1.5" {...other} />;
};
