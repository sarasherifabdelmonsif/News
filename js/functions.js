
async function getData(category = "business", search = '', page = 1) {
    let parameters = new URLSearchParams(
        {
            category: category,
            q: search,
            from: "2026-11-07 ",
            sortBy: "publishedAt",
            apiKey: "c1627a07699a4d3da56136cd4d4505c6",
            pageSize: 10,
            page: page
        }
    );

    //    console.log(parameters)
    let response = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);
    let myData = await response.json();
    //    console.log(myData)
    showData(myData, page);
    //    search(myData);
}

function showData(data, currentPage) {
    let numberOfPages = Math.ceil(data.totalResults / 10),
        news = data.articles,
        $dataContainer = $("#Data .row");
    $dataContainer.html("");
    if (news.length == 0) {
        for (let item of news) {
            $dataContainer.append(cardComponents(item));
        }
        $("nav .pagination").html(preparePagination(currentPage, numberOfPages));
    } else {
        $dataContainer.html(
            `
            <p class="position-fixed  bg-warning-subtle p-3 fs-5 w-75 d-flex justify-content-center align-items-center">
            There is
            No
            Data</p>
            `)
    }
    // } else {
    // }
    //console.log(data.articles)

    //    console.log(data.status);
    //  console.log(data.totalRusults);
    //    console.log(numberOfPages);
}

function preparePagination(currentPage, totalPages) {

    let lis = `
    <li class="page-item ${(currentPage == 1) ? 'disabled' : ''} "><a class="page-link paginate" onclick="paginate(${(currentPage > 1) ? currentPage - 1 : 1})">Previous</a></li>
    `;
    for (let i = 1; i <= totalPages; i++) {
        lis += `
        <li class="page-item ${(currentPage == i) ? 'active' : ''}|"><a class="page-link" onclick="paginate(${i})">${i}</a></li>
        `
    }
    lis += `
    <li class="page-item ${(currentPage == totalPages) ? 'disabled' : ''} "><a class="page-link paginate" onclick="paginate(${(currentPage < totalPages) ? currentPage + 1 : 1})">Next</a></li>
    `
    return lis;
}

function cardComponents(item) {
    return `<div class="col-sm-6 col-lg-4  mb-3">
    <div class="item">
        <div class="card m-auto" style="width: 18rem;">
            <img src="${item.urlToImage}" onerror="this.src='1077596-200.png'" class="img-fluid card-img-top">
            <div class="card-body">
                <h5 class="card-title">${item.title?.slice(0, 20)}</h5>
                <p class="card-text">${item.description?.slice(0, 150)}</p>
                <a href="${item.url}" target="_blank" class="btn btn-primary">See More</a>
            </div>
        </div>
    </div>
</div>`
}

function paginate(pageNumber) {
    let category = $("#Category").val(),
        search = $("#Search").val();
    getData(category, search, pageNumber);
}
/*

let myParagraph = $("#Data p");
$(myParagraph).html(`
    <p class="position-fixed bg-success p-3 fs-5 w-75 d-flex justify-content-center align-items-center">
                There is
                No
                Data</p>`)
 */