import * as React from 'react';
import Layout from '../components/Layout/Layout';
import { connect } from 'react-redux';
import { Grid } from '../components/Grid';
import { fetchList, getPhotos } from '../store/photos';
import { Photo } from '../models';

interface StateProps {
  images: Array<Photo>;
}

class IndexPage extends React.Component<StateProps> {
  static async getInitialProps({ store, isServer }: any) {
    await store.dispatch(fetchList());
    console.log(store.getState());
    return { isServer };
  }

  render() {
    const { images } = this.props;
    return (
      <Layout title="Home">
        <Grid images={images || []} />
      </Layout>
    );
  }
}
const mapDispatchToProps = () => {
  return {
  };
};

const mapStateToProps = (state) => {
  return {
    images: getPhotos(state)
  };
};

export default connect<StateProps>(mapStateToProps, mapDispatchToProps)(IndexPage);
