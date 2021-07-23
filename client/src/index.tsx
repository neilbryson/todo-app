import './styles/index.css';
import 'dayjs/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';

import dateFR from 'date-fns/locale/fr';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { registerLocale } from 'react-datepicker';
import ReactDOM from 'react-dom';

import { App } from './App';

dayjs.extend(relativeTime);
registerLocale('fr', dateFR);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
