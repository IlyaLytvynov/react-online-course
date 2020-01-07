import { Request } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { getPageTemplate } from './template';

const render = async (req: Request) => {
  const app = renderToString(<h2>Hello world</h2>);
  return getPageTemplate(app);
};

export default render;



