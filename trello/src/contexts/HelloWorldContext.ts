import React from 'react';

interface HelloWorldContextProps {
  title: string;
  changeTitle: (title: string) => void;
}

const HelloWorldContext = React.createContext<HelloWorldContextProps>({
  title: 'Hello world',
  changeTitle: () => {}
});
console.log(HelloWorldContext);
export { HelloWorldContext };
