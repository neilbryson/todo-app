import React, { ButtonHTMLAttributes, ReactElement } from 'react';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement<HTMLButtonElement> => (
  <button
    className="outline-none border-0 p-2.5 font-medium text-lg bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:text-gray-200 disabled:cursor-not-allowed"
    {...props}
  />
);
