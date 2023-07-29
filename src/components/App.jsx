import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeCircles } from 'react-loader-spinner';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/PixabayAPI';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

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

  openModal = (url, tags) => {
    this.setState({ showModal: true, modalImageURL: url, tags });
  };
  closeModal = () => {
    this.setState({ showModal: false, modalImageURL: '', tags: '' });
  };

  handleSubmitForm = query => {
    // console.log(query);
    this.setState({ query, page: 1, images: [], endCollection: false });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevState, prevProps) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const data = await fetchImages(query, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
        console.log(data);
        if (!data.totalHits) {
          return toast.success(
            'Sorry, there are no images matching your search query.'
          );
        }

        const totalPages = Math.ceil(data.totalHits / 12);

        if (page === totalPages) {
          this.setState({ endCollection: true });
          toast.success('The end🙄');
        }
      } catch (error) {
        console.error('Error', error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, isLoading, endCollection, showModal, modalImageURL } =
      this.state;
    const showLoadMoreBtn = images.length > 0 && !endCollection;
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
        <Toaster position="top-right" reverseOrder={false} />
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={modalImageURL} alt={this.state.tags} />
          </Modal>
        )}

        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery images={this.state.images} onClick={this.openModal} />
        {showLoadMoreBtn && <Button onClick={() => this.handleLoadMore()} />}
        {isLoading && (
          <Loader>
            <ThreeCircles
              height="100"
              width="100"
              color="#063970"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </Loader>
        )}
      </div>
    );
  }
}
