import dayjs from 'dayjs';
import React, { HTMLAttributes, ReactElement } from 'react';

interface Props {
  date: string;
}

export const DateDisplay = ({
  date,
  ...other
}: Props & HTMLAttributes<HTMLSpanElement>): ReactElement<HTMLSpanElement> => {
  const dateObj = dayjs(date);

  return (
    <span title={dateObj.format('D MMMM YYYY HH:mm:ss')} {...other}>
      {dateObj.fromNow()}
    </span>
  );
};
