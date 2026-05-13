
let productform = document.getElementById("productform")
productform.addEventListener("submit", getproductdata)

function getproductdata(event) {
    event.preventDefault()
    let name = document.querySelector("#productform #name").value
    let brand = document.querySelector("#productform #brand").value
    let category = document.querySelector("#productform #category").value
    let price = document.querySelector("#productform #price").value
    let quantity = document.querySelector("#productform #quantity").value
    let image = document.querySelector("#productform #image").value
    let description = document.querySelector("#productform #description").value
    let status = document.querySelector("#productform #status").value

    let obj = {
        name,
        brand,
        category,
        price,
        quantity,
        image,
        description,
        status
    }
    product_post(obj)
    productform.reset()
}

async function product_post(data) {
    try {
        await fetch(`http://localhost:3000/products`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        getproduct()

    } catch (error) {
        console.log("Something went wrong")
    }

}

async function getproduct() {

    try {

        let response = await fetch(`http://localhost:3000/products`)

        let res = await response.json()

        displayCards(res)

    } catch (error) {

        console.log("Error in get product")
    }
}
getproduct()


function displayCards(arr) {

    let container = document.getElementById("productContainer")

    container.innerHTML = ""

    arr.forEach((el) => {

        let card = document.createElement("div")
        card.classList.add("card")

        let image = document.createElement("img")
        image.src = el.image

        let cardContent = document.createElement("div")
        cardContent.classList.add("cardContent")

        let name = document.createElement("h2")
        name.textContent = `Name : ${el.name}`

        let brand = document.createElement("h3")
        brand.textContent = `Brand : ${el.brand}`

        let category = document.createElement("h3")
        category.textContent = `Category : ${el.category}`

        let price = document.createElement("h4")
        price.textContent = `Price : ₹${el.price}`

        let quantity = document.createElement("h4")
        quantity.textContent = `Quantity : ${el.quantity}`

        let description = document.createElement("p")
        description.textContent = el.description

        let status = document.createElement("h4")
        status.textContent = el.status

        let buttonBox = document.createElement("div")
        buttonBox.classList.add("buttonBox")

        let editBtn = document.createElement("button")
        editBtn.textContent = "Edit"
        editBtn.classList.add("editBtn")

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("deleteBtn")

        // edit functionalty create is below
         editBtn.addEventListener("click", () => {

            document.getElementById("product_id").value = el.id

            document.getElementById("update_name").value = el.name

            document.getElementById("update_brand").value = el.brand

            document.getElementById("update_category").value = el.category

            document.getElementById("update_price").value = el.price

            document.getElementById("update_quantity").value = el.quantity

            document.getElementById("update_image").value = el.image

            document.getElementById("update_description").value = el.description

            document.getElementById("update_status").value = el.status

        })

        // delete functionalty create is 
        deleteBtn.addEventListener("click", async () => {

            await fetch(`http://localhost:3000/products/${el.id}`, {
                method: "DELETE"
            })

            getproduct()

        })

        buttonBox.append(editBtn, deleteBtn)

        cardContent.append(
            name,
            brand,
            category,
            price,
            quantity,
            description,
            status,
            buttonBox
        )

        card.append(image, cardContent)

        container.append(card)

    })

}

let productupdate = document.getElementById("productupdate")

productupdate.addEventListener("submit", updateproduct)

async function updateproduct(event) {

    event.preventDefault()

    let product_id = document.getElementById("product_id").value

    let name = document.getElementById("update_name").value
    let brand = document.getElementById("update_brand").value
    let category = document.getElementById("update_category").value
    let price = document.getElementById("update_price").value
    let quantity = document.getElementById("update_quantity").value
    let image = document.getElementById("update_image").value
    let description = document.getElementById("update_description").value
    let status = document.getElementById("update_status").value

    let obj = {
        name,
        brand,
        category,
        price,
        quantity,
        image,
        description,
        status
    }

    try {

        await fetch(`http://localhost:3000/products/${product_id}`, {

            method: "PUT",

            body: JSON.stringify(obj),

            headers: {
                "Content-Type": "application/json"
            }

        })

        alert("Product Updated Successfully")

        getproduct()

        productupdate.reset()

    } catch (error) {

        console.log("Something went wrong in update")

    }

}

    //    let del_id=document.getElementById("del_id")
    //     del_id.addEventListener("click", delete_btn)

    //     async function delete_btn() {
    //         let del_product_id=el.id
            
    //         try{
    //             let data=await fetch(`http://localhost:3000/products/${del_product_id}`,{
    //                 method:"delete"
    //             })
    //             let del_product=await data.json()
    //             alert(" product was deleted by employee")
    //         }catch(error){
    //             alert("error in the delete product function")
    //         }
            
            
    //     }

//   final code of searcing the product 

// let select = document.getElementById("type")

// let productsearch = document.getElementById("productsearch")

// let search_Btn = document.getElementById("search_Btn")

// let container = document.getElementById("productContainer")

// // SEARCH BUTTON

// search_Btn.addEventListener("click", dosearch)

// // SEARCH FUNCTION

// async function dosearch() {

//     try {

//         let select_val = select.value.trim()

//         let product_val = productsearch.value.trim().toLowerCase()

//         let response = await fetch("http://localhost:3000/products")
//         let actualData = await response.json()

//         console.log(actualData)

//         let filteredData = actualData.filter((el) => {

//             if(!el[select_val]){

//                 return false
//             }

//             return el[select_val]
//             .toString()
//             .toLowerCase()
//             .includes(product_val)

//         })

//         container.innerHTML = ""
//         if(filteredData.length === 0){
//             container.innerHTML = "<h1>No Product Found</h1>"
//             return
//         }
//         mapdata(filteredData)
//     }
//     catch(error){
//         console.log(error)
//         alert("Search Error")
//     }
// }

// Category 
// let category = document.getElementById("Category");
// category.addEventListener("change", getData);
// async function getData() {
//     try {
//         let sel_val = category.value;
//         let data = await fetch(`http://localhost:3000/products?category=${sel_val}`);
//         let ac_Data = await data.json();
//         displayCards(ac_Data);
//     } 
//     catch(error) {
//         alert("error in category filter");
//     }
// }
// getData();

//    final code of category

/*
let category = document.getElementById("Category");
category.addEventListener("change", getData);
async function getData(arr) { 
    let selectedValue = category.value;
    let url = "http://localhost:3000/products";
    // filter using URL
    if (selectedValue !== "all") {
        url = `http://localhost:3000/products?category=${selectedValue}`;
    }
    let res = await fetch(url);
    let data = await res.json();
    displayCards(data);
}
getData();
*/


// final code for price sort
/*
let pricerange = document.getElementById("price");
pricerange.addEventListener("change", dosort);

async function dosort() {
    try {
        let sort_val = pricerange.value;
        let url = "http://localhost:3000/products";
        // ₹0 - ₹5000
        if (sort_val === "₹0-₹5000") {
            url = `http://localhost:3000/products?price_gte=0&price_lte=5000`;
        }
        // ₹5000 - ₹20000
        else if (sort_val === "₹5000-₹20000") {
            url = `http://localhost:3000/products?price_gte=5000&price_lte=20000`;
        }
        // ₹20000+
        else if (sort_val === "₹20000+") {
            url = `http://localhost:3000/products?price_gte=20000`;
        }
        let data = await fetch(url);
        let actualData = await data.json();
        displayCards(actualData);
    } 
    catch(error) {
        alert("data not sort");
    }
}
dosort();
*/
  
// final code for stock chack  
/*
let stock = document.getElementById("Stock");
stock.addEventListener("change", dofilterstock);

async function dofilterstock() {
    try {
        let stock_val = stock.value;
        let url = "http://localhost:3000/products";
        // filter by status
        if (stock_val !== "all") {
            url = `http://localhost:3000/products?status=${stock_val}`;
        }
        let res = await fetch(url);
        let data = await res.json();
        displayCards(data);
    } 
    catch(error) {
        alert("error in filter data");
    }
}
dofilterstock();
*/


// final code of the brand 
/*
let brand=document.getElementById("brand")
brand.addEventListener("click", dofilterbrand)

async function dofilterbrand(){
    try{
        let brand_val=brand.value

        let url="http://localhost:3000/products";

        if(brand_val !== "all"){
            url=`http://localhost:3000/products?brand=${brand_val}`;
        }
        let res=await fetch(url)

        let data=await res.json()
        displayCards(data)

    }catch(error){
        alert("error in filter data")
    }
}
*/

// final code for sorting but not work
/*
let sorting = document.getElementById("sorting");
sorting.addEventListener("change", dosorting);

async function dosorting() {
    try {
        let sorting_val = sorting.value;
        let url = "http://localhost:3000/products";
        // Price Low to High
        if (sorting_val === "price-asc") {
            url = `http://localhost:3000/products?_sort=price&_order=asc`;
        }
        // Price High to Low
        else if (sorting_val === "price-desc") {
            url = `http://localhost:3000/products?_sort=price&_order=desc`;
        }
        // Name A-Z
        else if (sorting_val === "name-asc") {
            url = `http://localhost:3000/products?_sort=name&_order=asc`;
        }
        // Name Z-A
        else if (sorting_val === "name-desc") {
            url = `http://localhost:3000/products?_sort=name&_order=desc`;
        }
        let res = await fetch(url);
        let data = await res.json();
        displayCards(data);
    } 
   
    catch(error) {
       alert("error in the sorting part");
    }
}
dosorting();

*/

//  final code pagination  

let currentPage = 1;
let limit = 6;
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");

// fetch data
async function getData() {

    try {

        let res = await fetch(
            `http://localhost:3000/products?_page=${currentPage}&_per_page=${limit}`
        );

        let data = await res.json();

        // json-server pagination data
        displayCards(data.data);

    } 
    
    catch(error) {

        alert("error in pagination");
    }
}

getData();

nextBtn.addEventListener("click", () => {

    currentPage++;

    getData();
});

prevBtn.addEventListener("click", () => {

    if(currentPage > 1){

        currentPage--;

        getData();
    }
});

