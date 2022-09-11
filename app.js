const loadCategory = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

loadCategory();

const displayCategory = categories => {


    for (const category of categories) {

        const makeDiv = document.createElement('div');

        const mainSection = document.getElementById('category');

        const catID = category.category_id
        makeDiv.innerHTML = `

        <p onclick= "loadNews(${catID})" > 
        ${category.category_name}
        </p>

        `;

        mainSection.appendChild(makeDiv);


    }


}



//News From API

const loadNews = (id) => {
    const para = id
    fetch(`https://openapi.programming-hero.com/api/news/category/0${para} `)
        .then(res => res.json())
        .then(data => showNews(data.data))
}


const showNews = (newses) => {
    const newsSection = document.getElementById('mainNews');
    newsSection.innerText = ``;
    for (const news of newses) {


        const makeDiv = document.createElement('div');
        const thumbPic = news.thumbnail_url
        console.log(news._id);
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
                        <img class=" authorImage rounded-circle " src=" ${news.author.img} " alt="">
                        </span>


                        <span>
                        ${news.author.name}
                        </span>

                    </div>

                    <div class="view">
                    <i class="bi bi-eye-fill"></i>  ${news.total_view}
                    </div>

                    <div class="rating">
                    <i class="bi bi-star-fill"></i> ${news.rating.number}
                    </div>

                    <div>
                    <a class=" text-decoration-none fs-5 text-black " data-bs-toggle="modal" data-bs-target="#exampleModal"  href="">Show Details<i class="bi text-primary ms-2 bi-arrow-right-square-fill"></i>
                    </a>

                 
            <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
                    </div>
                    
                </div>

            </div>

        </div>

    </div>
       
       `
        newsSection.appendChild(makeDiv);
    }

}

