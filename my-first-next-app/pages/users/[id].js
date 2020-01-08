class Users extends React.Component {
  static async getInitialProps({ query }) {
    console.log(query);
    return {
      id: query?.id
    };
  }

  render() {
    return <div>USer {this.props.id}</div>;
  }
}

export default Users;
