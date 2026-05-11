// let productform=document.getElementById("productform")
// productform.addEventListener("submit", getproductdata)

// function getproductdata(){
//     event.preventDefault()
//     let proname = productform.name.value
//     let probrand=productform.brand.value
//     let procategary=productform.category.value
//     let proprice=productform.price.value
//     let proquantity=productform.quantity.value
//     let proimage=productform.image.value
//     let prodescription=productform.description.value
//     let prostatus=productform.status.value

//     obj={
//         proname,probrand,procategary,proprice,proquantity,proimage,prodescription,prostatus
//     }
//     product_post(obj)

//     productform.reset()
// }

// async function product_post(data) {

//     try{
//         await fetch(`http://localhost:3000/products`,{
//             method:"POST",
//             body:JSON.stringify(data),
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         })

//         getproduct()


//     }catch(error){
//         console.log("somting is very worng");
        
//     }
    
// }

// // let productContainer=document.getElementById("ProductContainer")


// async function getproduct() {

//     try{
//         let response=await fetch(`http://localhost:3000/products`)
//         let res=await response.json()

//         displayCards(res)

//         // displayteble(res)
//     }catch(error){
//         console.log("error in the getproduct");
        
//     }
    
// }

// getproduct()


// function displayCards(arr){

//     let container = document.getElementById("productContainer")

//     container.innerHTML = ""

//     arr.forEach((el)=>{

//         let card = document.createElement("div")

//         card.classList.add("card")

//         let image = document.createElement("img")

//         image.src = el.proimage
//         image.style.width = "100%"
//         image.style.height = "200px"
//         image.style.objectFit = "cover"

//         let name = document.createElement("h2")

//         name.textContent = `Name: ${el.proname}`

//         let brand = document.createElement("h3")

//         brand.textContent = `Brand : ${ el.probrand}`


//         let category = document.createElement("h3")

//         category.textContent = `Category : ${el.procategory}`


//         let price = document.createElement("h4")

//         price.textContent = `₹   ${el.proprice}`


//         let quantity = document.createElement("h4")

//         quantity.textContent = `Quantity : ${el.proquantity}`


//         let description = document.createElement("p")

//         description.textContent = el.prodescription


//         let status = document.createElement("h4")

//         status.textContent = el.prostatus


//         let editBtn = document.createElement("button")
//         // editBtn.style.backgroundColor=black;
//         editBtn.textContent = "Edit"


//         let deleteBtn = document.createElement("button")

//         deleteBtn.textContent = "Delete"


//         card.append(
//             image,
//             name,
//             brand,
//             category,
//             price,
//             quantity,
//             description,
//             status,
//             editBtn,
//             deleteBtn
//         )

//         container.append(card)

//     })

// }


// async function name() {
//     let product_id=document.getElementById("product_id").value
//     // console.log(product_id);
//     let product_data=await fetch(`http://localhost:3000/products/${product_id}`)
    
//     let real_data=await product_data.json()

//     productupdate.name.value=real_data.name
//     productupdate.brand.value=real_data.brand
//     productupdate.category.value=real_data.category
//     productupdate.price.value=real_data.price
//     productupdate.quantity.value=real_data.quantity
//     productupdate.imageUrl.value=real_data.imageUrl
//     productupdate.description.value=real_data.description
//     productupdate.status.value=real_data.status

//     console.log(real_data);
     
// }

// let productupdate=document.getElementById("productupdate")
// productupdate.addEventListener("submit",updateproduct)

// async function updateproduct(){
//         let product_id=document.getElementById("product_id").value
//         let name=productupdate.name.value
//         let brand=productupdate.name.brand
//         let category=productupdate.name.category
//         let price=productupdate.name.price
//         let quantity=productupdate.name.quantity
//         let imageUrl=productupdate.name.imageUrl
//         let description=productupdate.name.description
//         let status=productupdate.name.status

//         let obj={
//             name, brand, category, price, quantity, imageUrl, description, status
//         }

//         try{
//             await fetch(`http://localhost:3000/products/${product_id}`,{
//                 method:"PUT",
//                 body:JSON.stringify(obj),
//                 headers:{
//                     "Content-Type":"application/json"
//                 }
//             })
//         }catch(error){
//             console.log("sothing went worng in the update product form");
            
//         }
        
        
// }



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
        image.style.width = "100%"
        image.style.height = "200px"
        image.style.objectFit = "cover"

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

        let editBtn = document.createElement("button")
        editBtn.textContent = "Edit"

        editBtn.addEventListener("click", () => {

            document.getElementById("product_id").value = el.id

            document.querySelector("#productupdate #update_name").value = el.name
            document.querySelector("#productupdate #update_brand").value = el.brand
            document.querySelector("#productupdate #update_category").value = el.category
            document.querySelector("#productupdate #update_price").value = el.price
            document.querySelector("#productupdate #update_quantity").value = el.quantity
            document.querySelector("#productupdate #update_image").value = el.image
            document.querySelector("#productupdate #update_description").value = el.description
            document.querySelector("#productupdate #update_status").value = el.status

        })

        let deleteBtn = document.createElement("button")

        deleteBtn.textContent = "Delete"

        deleteBtn.addEventListener("click", async () => {

            await fetch(`http://localhost:3000/products/${el.id}`, {
                method: "DELETE"
            })

            getproduct()

        })

        card.append(
            image,
            name,
            brand,
            category,
            price,
            quantity,
            description,
            status,
            editBtn,
            deleteBtn
        )

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