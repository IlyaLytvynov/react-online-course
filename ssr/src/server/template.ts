export const getPageTemplate = (app: string) => {
  // const scripts = `
  //     <script>
  //        window.__STATE__ = ${JSON.stringify()}
  //     </script>
  //   `;

  return `<!DOCTYPE html>
      <html>
      <head>
        <meta charset='utf-8'>
        <title>Server-side rendering with rehydration</title>
        <style type='text/css' id='server-side-styles'>
        </style>
      </head>
      <body>
        <div id='app'>${app}</div>
        <script src='./bundle.js'></script>
      </body>
    </html>
  `;
};
