import  { useState , useEffect } from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import API from '../../apiService';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from './Modal';

export default function ImageGallery({searchText}) {
    const [rezultSearch, setRezultSearch] = useState([]);
    const [status,setStatus] = useState('idle');
    const [showModal,setShowModal] = useState(false);
    const [activeImgIndex, setActiveImgIndex] = useState(null);
    const [pageNomber, setPageNomber] = useState(0);
    const [error, setError] = useState(null);

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };
    const loadMore = e => {
        e.preventDefault();   
        API(searchText, pageNomber + 1)
            .then(rez => {
                setRezultSearch(prevState => ([...prevState, ...rez.hits]));
                setPageNomber(prevState => prevState +1);
            });
    };
    const showImage = data => {
        const id = data.target.id;
        const imagesId = rezultSearch.map(e => String(e.id));
        const i = imagesId.indexOf(id);
        setActiveImgIndex(i);
        toggleModal();
    };
    const listImgModal = key => {
        let i = activeImgIndex;
        i += key;
        if (i < 0) { i = rezultSearch.length-1; }
        if (i === rezultSearch.length) { i = 0;}
        setActiveImgIndex(i);
    };
    useEffect(() => {
        if (searchText === '') { return; }

        setStatus('pending');
                
        API(searchText, 1)
                .then(rez => {
                    if (rez.hits.length) {
                        setRezultSearch(rez.hits);
                        setStatus('resolved');
                        setPageNomber(1);
                    }
                    else {
                        setError(`Нет изображений по запросу "${searchText}"`);
                        setStatus('rejected');
                    }
                })
            .catch(error => {
                setError(error.message);
                setStatus('rejected');
            });
    }, [searchText]);
    useEffect(() => {
        if (pageNomber === 1) { return;}
         window.scrollTo({
               top: document.documentElement.scrollHeight,
               behavior: 'smooth',
            });
    }, [pageNomber]);

    if (status === "idle") {
            return <div></div>;
        }
    if (status === "pending") {
            return (
                <div className="conteinGallery">
                    <Loader
                     type="ThreeDots"
                     color="#3f51b5"
                     height={100}
                     width={100}
                    />
                </div>
            );
        }
    if (status === "rejected") {
            return (<div className="conteinGallery">
                      <h1>{error}</h1>;    
                    </div>);
        }
    if (status === "resolved") {
            return (
              <div className="conteinGallery">
                    <ul className="ImageGallery">
                        {rezultSearch.map(({ id, webformatURL }) => { return <ImageGalleryItem key={id} webformatURL={webformatURL} id={id} onClick={showImage}/>})}
                </ul>
                <button className="Button" onClick={loadMore}>Загрузить еще</button>
                    {showModal && <Modal onClose={toggleModal} onList={listImgModal}><img src={ rezultSearch[activeImgIndex].largeImageURL} alt="" /></Modal>}
                </div>
            );
        }
};