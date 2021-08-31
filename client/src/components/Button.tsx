import React, { ButtonHTMLAttributes, ReactElement } from 'react';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement<HTMLButtonElement> => (
  <button
    className="outline-none border-0 font-medium text-lg text-blue-700 hover:text-blue-500 disabled:text-gray-600 disabled:cursor-not-allowed"
    {...props}
  />
);
