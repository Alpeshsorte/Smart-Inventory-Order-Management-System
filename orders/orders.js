let orderform=document.getElementById("orderForm")
orderform.addEventListener("submit", getorderdata)

function getorderdata(){
    event.preventDefault()
    let customerName=document.querySelector("#customerName").value
    let mobile=document.querySelector("#mobileNumber").value
    let product=document.querySelector("#productPurchased").value
    let quantity=document.querySelector("#quantityOrdered").value
    let totalAmount=document.querySelector("#totalAmount").value
    let paymentStatus=document.querySelector("#paymentStatus").value
    let orderStatus=document.querySelector("#orderStatus").value
    let address=document.querySelector("#deliveryAddress").value

    let obj = {
    customerName,
    mobile,
    product,
    quantity,
    totalAmount, 
    paymentStatus, 
    orderStatus,
    address, 
    createdAt : new Date().toLocaleDateString()
}
    order_post(obj)
    orderform.reset()
}

async function order_post(data) {
    try {
        await fetch(`http://localhost:3000/orders`, {
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

let tbody = document.getElementById("orderTableBody");
// fetch order data
async function getOrders() {
    try {
        let res = await fetch("http://localhost:3000/orders");
        let data = await res.json();
        displayOrders(data);
    }   
    catch(error) {
        alert("error in fetching orders");
    }
}
getOrders();

// display data in table
function displayOrders(data) {
    tbody.innerHTML = "";
    data.forEach((el) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `

            <td>${el.id}</td>
            <td>${el.customerName}</td>
            <td>${el.mobile}</td>
            <td>${el.product}</td>
            <td>${el.quantity}</td>
            <td>₹ ${el.totalAmount}</td>
            <td>${el.address}</td>
            <td>${el.paymentStatus}</td>
            <td>${el.orderStatus}</td>
            <td>${el.createdAt}</td>
            <td>${el.status}</td>

            <td>
                <button onclick="editOrder('${el.id}')" class="editBtn">Edit</button>
                <button onclick="deleteOrder('${el.id}')" class="deleteBtn">Delete</button>
            </td>
        `;

        tbody.append(tr);
    });
}

async function deleteOrder(id){
    try{
        await fetch(`http://localhost:3000/orders/${id}`,{
            method : "DELETE"
        })
        getOrders()
    }
    catch(error){
        console.log("Delete Error")
    }
}

// EDIT ORDER
async function editOrder(id){
    editId = id
    let res = await fetch(`http://localhost:3000/orders/${id}`)
    let data = await res.json()
    document.querySelector("#updateCustomerName").value = data.customerName
    document.querySelector("#updateMobileNumber").value = data.mobile
    document.querySelector("#updateProductPurchased").value = data.product
    document.querySelector("#updateQuantityOrdered").value = data.quantity
    document.querySelector("#updateTotalAmount").value = data.totalAmount
    document.querySelector("#updatePaymentStatus").value = data.paymentStatus
    document.querySelector("#updateOrderStatus").value = data.orderStatus
    document.querySelector("#updateDeliveryAddress").value = data.address
}



// UPDATE FORM
let updateForm=document.getElementById("updateForm")
updateForm.addEventListener("submit", updateOrder)

async function updateOrder(event){
    event.preventDefault()
    let updatedObj = {
        customerName : document.querySelector("#updateCustomerName").value,
        mobile : document.querySelector("#updateMobileNumber").value,
        product : document.querySelector("#updateProductPurchased").value,
        quantity : document.querySelector("#updateQuantityOrdered").value,
        totalAmount : document.querySelector("#updateTotalAmount").value,
        paymentStatus : document.querySelector("#updatePaymentStatus").value,
        orderStatus : document.querySelector("#updateOrderStatus").value,
        address : document.querySelector("#updateDeliveryAddress").value,
        createdAt : new Date().toLocaleDateString()
    }
    try{
        await fetch(`http://localhost:3000/orders/${editId}`,{
            method : "PUT",
            body : JSON.stringify(updatedObj),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        getOrders()
        updateForm.reset()
    }
    catch(error){
        console.log("Update Error")

    }

}

// SEARCH BUTTON
let searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener("click", searchOrders)
//SEARCH FUNCTION
async function searchOrders(){
    let searchType = document.getElementById("search").value
    let searchValue = document.getElementById("order_search").value.toLowerCase()
    try{
        let res = await fetch("http://localhost:3000/orders")
        let data = await res.json()
        let filteredData = []

        if(searchType === "customer name"){
            filteredData = data.filter((el)=>{
                return el.customerName.toLowerCase().includes(searchValue)
            })
        }

        else if(searchType === "order id"){
            filteredData = data.filter((el)=>{
                return el.id.toString().includes(searchValue)
            })
        }

        else if(searchType === "payment status"){
            filteredData = data.filter((el)=>{
                return el.paymentStatus.toLowerCase().includes(searchValue)
            })
        }

        else{
            filteredData = data
        }

        displayOrders(filteredData)
    }
    catch(error){
        console.log("Search Error")
    }

}
 
//  this is my code or order filter 
/*
let order_filter=document.getElementById("order_filter")
order_filter.addEventListener("change", dofilter)

async function dofilter() {
    try{
        let order_val=document.getElementById("order_filter").value

        let url=`http://localhost:3000/orders`

        if(order_val !== "all"){
            url=url=`http://localhost:3000/orders?orderStatus=${order_val}`;
        }
        let res=await fetch(url)

        let data=await res.json();

        displayOrders(data)
    }catch(error){
        alert("error in the order status ")
    }
    
}

*/

//  final code for check payment status 

let order_filter = document.getElementById("order_filter")
order_filter.addEventListener("change", dofilter)
async function dofilter() {
    try{
        let order_val = document.getElementById("order_filter").value
        let url = `http://localhost:3000/orders`      
        // FILTER
        if(order_val !== "all"){

            if(order_val === "Pending" || order_val === "Delivered" || order_val === "Cancelled"){
                url = `http://localhost:3000/orders?orderStatus=${order_val}`
            }
            
            else if(order_val === "Paid"){
                url = `http://localhost:3000/orders?paymentStatus=${order_val}`
            }
        }
        let res = await fetch(url)
        let data = await res.json()
        displayOrders(data)
    }
    catch(error){
        alert("error in the order status")
    }
}

// SORTING
let order_sorting = document.getElementById("order_sorting")
order_sorting.addEventListener("change", sortOrders)

async function sortOrders(){
    try{
        let sortValue = document.getElementById("order_sorting").value
        let res = await fetch("http://localhost:3000/orders")
        let data = await res.json()

        if(sortValue === "all"){
            displayOrders(data)
        }

        else if(sortValue === "latest"){
            data.sort((a,b)=>{
                let date1 = new Date(a.createdAt.split("/").reverse().join("-"))
                let date2 = new Date(b.createdAt.split("/").reverse().join("-"))
                return date2 - date1
            })
            displayOrders(data)
        }

        else if(sortValue === "oldest"){
            data.sort((a,b)=>{
                return new Date(a.createdAt) - new Date(b.createdAt)
            })
            displayOrders(data)
        }

        else if(sortValue === "highest"){
            data.sort((a,b)=>{
                return b.totalAmount - a.totalAmount
            })
            displayOrders(data)
        }
        else if(sortValue === "order"){
            data.sort((a,b)=>{
                return a.orderStatus.localeCompare(b.orderStatus)
            })
            displayOrders(data)
        }
    }
    catch(error){
        console.log("Sorting Error")
    }
}

// PAGINATION VARIABLES
let currentPage = 1
let itemsPerPage = 5
let allOrders = []

let prevBtn = document.getElementById("orderPrevBtn")
let nextBtn = document.getElementById("orderNextBtn")
let pageNumbers = document.getElementById("orderPageNumbers")

async function getOrders(){
    let res = await fetch("http://localhost:3000/orders")
    let data = await res.json()
    allOrders = data
    showPaginationData()
}
getOrders()

function showPaginationData(){
    let start = (currentPage - 1) * itemsPerPage 
    let end = start + itemsPerPage
    let paginatedData = allOrders.slice(start,end)
    displayOrders(paginatedData)
    createPageButtons()
}
function createPageButtons(){
    pageNumbers.innerHTML = ""
    let totalPages = Math.ceil(allOrders.length / itemsPerPage)
    for(let i=1; i<=totalPages; i++){
        let btn = document.createElement("button")
        btn.innerText = i
        if(i === currentPage){
            btn.style.backgroundColor = "black"
            btn.style.color = "white"
        }
        btn.addEventListener("click", ()=>{
            currentPage = i
            showPaginationData()
        })
        pageNumbers.append(btn)
    }
}
// PREVIOUS BUTTON
prevBtn.addEventListener("click", ()=>{
    if(currentPage > 1){
        currentPage--
        showPaginationData()
    }
})
// NEXT BUTTON
nextBtn.addEventListener("click", ()=>{
    let totalPages = Math.ceil(allOrders.length / itemsPerPage)
    if(currentPage < totalPages){
        currentPage++
        showPaginationData()
    }
})