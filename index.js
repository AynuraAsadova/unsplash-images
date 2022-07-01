const row = document.querySelector(".row");
const btn = document.querySelector(".btn");
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const column4 = document.getElementById("col-4");
const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");


let acces_key = "nY_308CoT1wpFAh5qXBiOlSElCL_e02fAaMiNg5qpdk";
let apiUrl = `https://api.unsplash.com/photos/?client_id=${acces_key}&per_page=100`;
let searchUrl = `https://api.unsplash.com/search/photos/?client_id=${acces_key}&per_page=100&query=`;

imageURLS = [];


window.onload = () => {
  fetchData();
};

const fetchData = async () => {
    const response = await fetch(apiUrl)
    const myJson = await response.json();

    var imageArrays = myJson;
    // console.log(imageArrays)

    imageArrays.forEach(element => {
        imageURLS.push(element.urls.small)
        // console.log(imageURLS)
    });

    displayImages();
}


const displayImages = () => {

    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";
    column4.innerHTML = "";

    imageURLS.forEach((url, index) => {
        // dynamic image tag 
        var container = document.createElement('div');
        container.innerHTML = (`<a href=${url} data-fancybox="gallery"><img src=${url} style='width:100%'/></a>`);
        

        if( (index + 1) % 4 == 0 ) {
            column1.appendChild(container);
        }
        if( (index + 2) % 4 == 0 ) {
            column2.appendChild(container);
        }
        if( (index + 3) % 4 == 0 ) {
            column3.appendChild(container);
        }
        if( (index + 4) % 4 == 0 ) {
            column4.appendChild(container);
        }
    });
}

searchBtn.addEventListener('click', ()=> {
    if(searchKey.value !== ""){
        fetchSearchData(searchKey.value)
    }
});

const fetchSearchData = async (key) => {

    imageURLS = [];

    searchQuery.innerHTML = searchKey.value;

    const response = await fetch(searchUrl+key)
    const myJson = await response.json();
    console.log(myJson)

    var imageArrays = myJson.results;
    console.log(imageArrays)

    imageArrays.forEach(element => {
        imageURLS.push(element.urls.regular)
    });

    displayImages();
    
}


