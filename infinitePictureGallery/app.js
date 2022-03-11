const API_Key = "563492ad6f91700001000001fdf16165533c43ada89059f0878c6ac4";

async function getPhotos() {
    const res = await fetch("https://api.pexels.com/v1/curated?per_page=20",{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_Key
        }
    });
    const data = await res.json();
    console.log(data);
}

getPhotos();