const form = document.querySelector("#searchForm");
const box = document.querySelector("#box");

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    box.innerHTML = "";
    const searchText = form.elements.query.value;
    const config = { params: { q: searchText } };
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);
    makeImages(res.data);
    console.dir(res.data)
    form.elements.query.value = '';
})

const makeImages = function (shows) {
    for (let res of shows) {
        if (res.show.image) {
            const newDiv = document.createElement("Div");
            const newImg = document.createElement("Img");
            const title = document.createElement("span");
            const lineBreak = document.createElement('br');
            newImg.src = res.show.image.medium;
            title.append(res.show.name);
            title.append("Genres: ");
            for (genre of res.show.genres) {
                title.append(genre);
                title.append("  ");
            }
            title.append("\nLanguage: ");
            title.append(res.show.language);
            newDiv.appendChild(newImg);
            newDiv.append(title);
            newDiv.classList.add("p-2");
            box.appendChild(newDiv);
        }
    }
}
