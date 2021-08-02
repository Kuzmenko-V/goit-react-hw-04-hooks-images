const BASE_URL = "https://pixabay.com/api";
const KEY = "21855327-aca65fff95f12487eb72f2b8c";

const API = async function (searchQuery, nomberPage) {
    const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${nomberPage}&per_page=12&key=${KEY}`);
    if (response.ok) { return response.json(); }
    return await Promise.reject(new Error(`Нет изображений по запросу '${searchQuery}'`));
}
export default API;