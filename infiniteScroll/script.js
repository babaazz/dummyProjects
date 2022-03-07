
const postContainer = document.getElementById('post-container');

const loader = document.getElementById('loader');

const filter = document.getElementById('filter');

let page = 1;
let limit = 5;

// loadPosts

async function loadPostData() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

// render posts

async function renderPosts() {
    const data = await loadPostData();
    for(let postData of data){
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `<div class="number">${postData.id}</div>
            <div class="post-info">
                <h2 class="post-title">${postData.title}</h2>
                <p class="post-body">${postData.body}</p>
            </div>`;
        postContainer.appendChild(postEl);
    }
}

//show loading 
async function loadMore(){
    page++;
    loader.classList.add('show');
    await renderPosts();
    loader.classList.remove('show');
}

// filter posts 

function filterPosts(inputElement){
    let searchTerm = inputElement.value.toUpperCase();
    let allPosts = document.querySelectorAll('.post');
    allPosts.forEach((post) => {
        let title = post.querySelector('.post-title').innerText.toUpperCase()
        let body = post.querySelector('.post-body').innerText.toUpperCase();
        if(title.indexOf(searchTerm) === -1 && body.indexOf(searchTerm) === -1){
            post.classList.add('hidden');
        }
    })
}

// event debouncer
function debouncer(func, delay){
    let timer;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(timer);
       timer = setTimeout(() => {
            func.apply(context, args);
        },delay);
    }
}

const debouncedLoader = debouncer(loadMore,500);

renderPosts();

window.addEventListener('scroll', () => {
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    if(scrollTop + clientHeight > scrollHeight - 10){
        debouncedLoader();
    }
})

const debouncedFilterPosts = debouncer(filterPosts, 500);

filter.addEventListener('keyup', () => {
    debouncedFilterPosts(filter);
})