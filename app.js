const toggler = (isTrue) => {
    const spinner = document.getElementById("spinner");
    if (isTrue) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
};
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then((res) => res.json())
        .then((data) => displayCategory(data.data.news_category))
        .catch((error) => console.log(error));
};

loadCategory();

const displayCategory = (categories) => {
    for (const category of categories) {
        const makeDiv = document.createElement("div");

        const mainSection = document.getElementById("category");

        const catID = category.category_id;
        makeDiv.innerHTML = `
  
          <p onclick= "loadNews(${catID})" > 
          ${category.category_name}
          </p>
  
          `;

        mainSection.appendChild(makeDiv);
    }
};

//News From API

const loadNews = async (id) => {
    toggler(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/0${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showNews(data.data);
    } catch (error) {
        console.error(error);
    }
};

const showNews = (newses) => {
    const newsSection = document.getElementById("mainNews");

    let sortedItems = [...newses];

    sortedItems.sort(function (a, b) {
        return b.total_view - a.total_view;
    });
    newsSection.innerText = ``;
    for (const news of sortedItems) {
        const makeDiv = document.createElement("div");
        const thumbPic = news.thumbnail_url;
        // console.log(news._id);
        makeDiv.innerHTML = `
         
          <div class="p-3 rounded shadow mb-4 d-flex ">
          <!-- picture div -->
          <div>
              <img class="thumb" src=${thumbPic}  alt="">
          </div>
          <!-- news author etc part -->
          <div class=" p-4 ">
  
              <div class="title pb-4 fw-bolder ">
                  <!-- Title here -->
              
                  ${news.title}
         
              </div>
              <div class="news">
                  <!-- News Part -->
                  ${news.details.slice(0, 250)}
              </div>
  
              <div class=" author ">
                  <!-- info here -->
                  <div class=" d-flex justify-content-between ">
  
                      <div class=" authorImg ">
                          <!-- author image -->
  
                          <span> 
                          <img class=" authorImage rounded-circle " src=" ${news.author.img
            } " alt="">
                          </span>
  
  
                          <span>
                          ${news.author.name
                ? news.author.name
                : "No Aurhor Found"
            }
                          </span>
  
                      </div>
  
                      <div class="view">
                      <i class="bi bi-eye-fill"></i>  ${news.total_view ? news.total_view : "No views"
            }
                      </div>
  
                      <div class="rating">
                      <i class="bi bi-star-fill"></i> ${news.rating.number}
                      </div>
  
  
         
                      <!-- Button trigger modal -->
  <button type="button" onclick= "loadModal('${news._id
            }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
  
  <!-- Modal -->
  
  
  
         `;
        newsSection.appendChild(makeDiv);
    }
    toggler(false);
};
const loadModal = (newsID) => {
    console.log(newsID);
    fetch(`https://openapi.programming-hero.com/api/news/${newsID}`)
        .then((res) => res.json())
        .then((data) => displayModal(data.data[0]));
};
const displayModal = (data) => {
    console.log(data);

    const title = document.getElementById("exampleModalLabel");
    title.innerHTML = `${data.title}`;
    const modalBody = document.getElementById("body");
    modalBody.innerHTML = `    <img class="modal-img w-100" src=" ${data.image_url} " alt="">
    <p> ${data.details}  </p>
    `;
};
