import {useState} from 'react';
import './App.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [searchText, setSearchText] = useState('');
  
     return (
      <div className="App">
         <Searchbar onSubmit={setSearchText} />
         <ToastContainer
           autoClose={3000}
           position="top-center"
          />
         <ImageGallery searchText={searchText} />
      </div>
  );
}
