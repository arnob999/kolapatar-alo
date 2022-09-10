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


        <p onclick= " loadNews(${catID}) " > 
        ${category.category_name}
        </p>
        `;

        mainSection.appendChild(makeDiv);


    }


}



//News From API

const loadNews = (id) => {
    const para = id
    console.log(para);
    fetch(`https://openapi.programming-hero.com/api/news/category/0${para} `)
        .then(res => res.json())
        .then(data => console.log(data.data))
}


