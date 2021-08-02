import  { useState } from 'react';
import { toast } from 'react-toastify';

export default function Searchbar({onSubmit}) {
    const [searchText, setSearchText] = useState('');
   const inputChange = e => {
       const { value } = e.currentTarget;
        setSearchText(value);  
    };
    const formSabmit = e => {
        e.preventDefault();
        if (searchText.trim() === '') {
            toast.info('Введите цель поиска!');
            return;
        }
        onSubmit(searchText.trim());
        setSearchText('');
  }
    return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={ formSabmit }>
                <button type="submit" className="SearchForm-button">
                  <span className="SearchForm-button-label">Search</span>
                </button>
                 <input
                  name="searchText"
                  className="SearchForm-input"
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Поиск изображений и фотографий"
                  value={searchText}
                  onChange={inputChange}  
                />
             </form>
            </header>
        );
};
