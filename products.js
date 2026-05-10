let productform=document.getElementById("productform")
productform.addEventListener("submit", getproductdata)

function getproductdata(){
    event.preventDefault()
    let proname = productform.name.value
    let probrand=productform.brand.value
    let procategary=productform.category.value
    let proprice=productform.price.value
    let proquantity=productform.quantity.value
    let proimage=productform.image.value
    let prodescription=productform.description.value
    let prostatus=productform.status.value

    obj={
        proname,probrand,procategary,proprice,proquantity,proimage,prodescription,prostatus
    }
    product_post(obj)

    productform.reset()
}

async function product_post(data) {

    try{
        await fetch(`http://localhost:3000/products`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })

        getproduct()


    }catch(error){
        console.log("somting is very worng");
        
    }
    
}

// let productContainer=document.getElementById("ProductContainer")


async function getproduct() {

    try{
        let response=await fetch(`http://localhost:3000/products`)
        let res=await response.json()

        displayCards(res)

        // displayteble(res)
    }catch(error){
        console.log("error in the getproduct");
        
    }
    
}

getproduct()


function displayCards(arr){

    let container = document.getElementById("productContainer")

    container.innerHTML = ""

    arr.forEach((el)=>{

        let card = document.createElement("div")

        card.classList.add("card")

        let image = document.createElement("img")

        image.src = el.proimage

        let name = document.createElement("h2")

        name.textContent = `Name: ${el.proname}`

        let brand = document.createElement("h3")

        brand.textContent = `Brand : ${ el.probrand}`


        let category = document.createElement("h3")

        category.textContent = "Category : " + el.procategory


        let price = document.createElement("h4")

        price.textContent = "₹ " + el.proprice


        let quantity = document.createElement("h4")

        quantity.textContent = "Quantity : " + el.proquantity


        let description = document.createElement("p")

        description.textContent = el.prodescription


        let status = document.createElement("h4")

        status.textContent = el.prostatus


        let editBtn = document.createElement("button")
        // editBtn.style.backgroundColor=black;
        editBtn.textContent = "Edit"


        let deleteBtn = document.createElement("button")

        deleteBtn.textContent = "Delete"


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