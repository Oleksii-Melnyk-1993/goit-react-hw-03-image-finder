import { Component } from 'react';
// import { fetchImages } from 'services/PixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    modalImageURL: '',
    isLoading: false,
    showModal: false,
    endCollection: false,
    tags: '',
  };

  handleSubmitForm = query => {
    this.setState({ query, page: 1, images: [], endCollection: false });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    // const { images, isLoading, endCollection, showModal, modalImageURL } =
    //   this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSubmitForm} />
      </div>
    );
  }
}
