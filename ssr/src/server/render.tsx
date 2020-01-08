import { Request } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { getPageTemplate } from './template';

const render = async (req: Request) => {
  const app = renderToString(<>
    <h2>Hello world</h2>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae commodi sunt, veritatis natus distinctio facilis mollitia veniam omnis at id modi itaque accusamus unde nihil voluptatibus cumque eum inventore dolorem!</p>
  </>);
  return getPageTemplate(app);
};

export default render;



