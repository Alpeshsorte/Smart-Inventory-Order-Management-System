
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


let select = document.getElementById("type")

let productsearch = document.getElementById("productsearch")

let search_Btn = document.getElementById("search_Btn")

let container = document.getElementById("productContainer")

// SEARCH BUTTON

search_Btn.addEventListener("click", dosearch)

// SEARCH FUNCTION

async function dosearch() {

    try {

        let select_val = select.value.trim()

        let product_val = productsearch.value.trim().toLowerCase()

        let response = await fetch("http://localhost:3000/products")
        let actualData = await response.json()

        console.log(actualData)

        let filteredData = actualData.filter((el) => {

            if(!el[select_val]){

                return false
            }

            return el[select_val]
            .toString()
            .toLowerCase()
            .includes(product_val)

        })

        container.innerHTML = ""
        if(filteredData.length === 0){
            container.innerHTML = "<h1>No Product Found</h1>"
            return
        }
        mapdata(filteredData)
    }
    catch(error){
        console.log(error)
        alert("Search Error")
    }
}

// Category 

let Category=document.getElementById("Category")
Category.addEventListener("click", dofilter)

async function dofilter(){
    try{
        let cat_val=document.getElementById("Category").value

        let data=await fetch(
            `http://localhost:3000/products?Category=${cat_val}`
        )
        let actualData=await data.json()

        if(actualData === 0){
            alert("data not filter")
        }
        mapdata(actualData)

    }catch(error){
        alert("error in filter data")
    }
}

// sort thing price

let pricerange=document.getElementById("price_range")
pricerange.addEventListener("change",dosort)

async function dosort() {

    try{

        let sort_val=pricerange.value

        let data=await fetch(
            `http://localhost:3000/products?_sort=${sort_val}`

        )

        let actualData=await data.json()
        mapdata(actualData)
    }
    catch(error){
        alert("data not sort")
    }
}
  
//   stock 
let stock=document.getElementById("Stock")
stock.addEventListener("click", dofilterstock)

async function dofilterstock(){
    try{
        let stock_val=document.getElementById("Stock").value

        let data=await fetch(
            `http://localhost:3000/products?Stock=${stock_val}`
        )
        let actualData=await data.json()

        if(actualData === 0){
            alert("data not filter")
        }
        mapdata(actualData)

    }catch(error){
        alert("error in filter data")
    }
}

// brand 

let brand=document.getElementById("brand")
brand.addEventListener("click", dofilterbrand)

async function dofilterbrand(){
    try{
        let brand_val=document.getElementById("brand").value

        let data=await fetch(
            `http://localhost:3000/products?Category=${brand_val}`
        )
        let actualData=await data.json()

        if(actualData === 0){
            alert("data not filter")
        }
        mapdata(actualData)

    }catch(error){
        alert("error in filter data")
    }
}




function mapdata(arr){

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