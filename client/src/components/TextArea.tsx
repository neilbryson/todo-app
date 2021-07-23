import React, { HTMLAttributes, ReactElement } from 'react';

export const TextArea = ({ ...other }: HTMLAttributes<HTMLTextAreaElement>): ReactElement<HTMLTextAreaElement> => {
  return <textarea className="rounded p-1.5" {...other} />;
};
