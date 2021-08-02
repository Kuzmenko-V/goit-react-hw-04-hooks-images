export default function ImageGalleryItem({ id, webformatURL, onClick }) {
   return (
            <li  className="ImageGalleryItem">
               <img src={webformatURL} id={id} alt="" className="ImageGalleryItem-image" onClick={onClick}/>
            </li>
   )
};
