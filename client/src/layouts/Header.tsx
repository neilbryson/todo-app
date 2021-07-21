import React, { ReactElement } from 'react';

import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Header = (): ReactElement<HTMLDivElement> => {
  return (
    <div className="flex justify-between items-center h-8 mt-2.5 mb-8">
      <section className="font-bold text-4xl">Todo</section>
      <Button>Add task</Button>
      <section>
        <LanguageSwitcher />
      </section>
    </div>
  );
};
