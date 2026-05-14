
async function dashboardData(){
    let productRes = await fetch("http://localhost:3000/products")
    let products = await productRes.json()

    let orderRes = await fetch("http://localhost:3000/orders")
    let orders = await orderRes.json()

    // let categoryRes = await fetch("http://localhost:3000/category")
    // let category = await categoryRes.json()

    let t_product=document.getElementById("totalProducts")
    t_product.innerText=products.length

    let t_orders=document.getElementById("totalOrders")
    t_orders.innerText=orders.length

    let revenue = 0
    orders.forEach((el)=>{
        revenue=revenue+Number(el.totalAmount)

    })
    let show=document.getElementById("totalRevenue")
    show.innerText= "₹ " + revenue

    let stock = 0
    products.forEach((el)=>{
       stock =stock + Number(el.quantity)

    })
    let show_stock=document.getElementById("availableStock")
    show_stock.innerText=stock

    let outStock = 0
    products.forEach((el)=>{
        if(el.quantity == 0){
            outStock++
        }
    })
    let out_stock=document.getElementById("outOfStock")
    out_stock.innerText=outStock

    let pending = 0
    orders.forEach((el)=>{
        if(el.orderStatus == "Pending" || el.orderStatus == "Processing" || el.orderStatus == "Shipped"){
            pending++
        }
    })
    let show_pending=document.getElementById("pendingDeliveries")
    show_pending.innerText=pending

    let cancel = 0
    orders.forEach((el)=>{
        if(el.orderStatus == "Cancelled"){
            cancel++
        }
    })
    document.getElementById("cancelledOrders").innerText = cancel
}
dashboardData()