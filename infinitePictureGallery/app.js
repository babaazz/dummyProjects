const sectionFlex = document.querySelector('.section-flex');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search');


const API_Key = "563492ad6f91700001000001fdf16165533c43ada89059f0878c6ac4";
let baseUrl = "https://api.pexels.com/v1/curated?per_page=30";
let nextUrl;

async function getPhotos(url, element) {
    const res = await fetch(url,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_Key
        }
    });
    const data = await res.json();
    nextUrl = data.next_page;
    const photos = data.photos;
    const heading = element.getElementById('heading');
    if(heading.innerText === ""){
        heading.innerText = "Trending";
    }
    renderPhotos(photos,element);
}


async function renderPhotos(photos, element){
    const [column1, column2, column3] = element.children[1].children;
    let count = 0;
    while(count < photos.length){
        let item1 = createImageItem(photos[count]);
        column1.appendChild(item1);
        count++;
        let item2 = createImageItem(photos[count]);
        column2.appendChild(item2);
        count++;
        let item3 = createImageItem(photos[count]);
        column3.appendChild(item3);
        count++;
    }
}


function createImageItem(photo){
    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<img src = "${photo.src.medium}">
    <h3>${photo.photographer}</h3>
    `
    return item;
}

getPhotos(baseUrl,sectionFlex);


//event debouncing 

function debouncer(func,delay) {
    let timer;
    return function(){
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context,args);
        }, delay)
    }
}

// loadMore

async function loadMore(url,element){
    loader.classList.add('show')
    await getPhotos(url,element);
    loader.classList.remove('show');
}

const debouncedLoading = debouncer(loadMore,500);

window.addEventListener('scroll', () => {
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    if(scrollTop + clientHeight > scrollHeight - 20){
            debouncedLoading(nextUrl,sectionFlex);
    }
})

// Search 

async function searchCall(query, element){
    let searchURL = `https://api.pexels.com/v1/search?query=${query}&per_page=30`;
    const res = await fetch(searchURL,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_Key
        }
    });
    const data = await res.json();
    nextUrl = data.next_page;
    const photos = data.photos;

    renderPhotos(photos,element);
}

const debouncedSearchCall = debouncer(searchCall,500);

searchInput.addEventListener('keyup', (e) => {
    let query = e.target.value;
    if(query === "") {
        getPhotos(baseUrl,sectionFlex);
    } else {
        debouncedSearchCall(query,sectionFlex);
    }
})


function clearElements(...elementList){
    elementList.forEach(element => {
        element.innerHTML = "";
    })
}