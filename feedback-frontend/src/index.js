import _ from 'lodash';
import ReactDOM from 'react-dom';
import Feedback from './feedback.js'
import { createRoot } from 'react-dom/client';
import React from 'react'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Feedback />);
