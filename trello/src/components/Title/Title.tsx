import React from "react";

export class Title extends React.PureComponent<{ text: string; }> {
  // shouldComponentUpdate(nextProps: { text: string; }) {
  //   return this.props.text !== nextProps.text;
  // }
  render() {
    console.log('RENDERED TITLE');
    return <div>{this.props.text}</div>;
  }
}

// export const Title = ({ text }: any) => {
//   console.log('RENDERED TITLE');
//   return <div>{text}</div>;
// };