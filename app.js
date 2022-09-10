const loadCategory = () => {

    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

loadCategory();

const displayCategory = categories => {
    // console.log(categories);
    const mainSection = document.getElementById('category')

    for (const category of categories) {


        const makeDiv = document.createElement('div');

        const id = category.category_id
        makeDiv.innerHTML = `

        

        <p onclick=" loadNews(id) "> 
        ${category.category_name}
        </p>
        `;

        mainSection.appendChild(makeDiv);


    }


}



//News From API

const loadNews = (id) => {



    fetch(`https://openapi.programming-hero.com/api/news/category/${id} `)
        .then(res => res.json())
        .then(data => console.log(data))
}

// loadNews();

