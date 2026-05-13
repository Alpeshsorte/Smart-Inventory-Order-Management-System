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
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        `;

        tbody.append(tr);
    });
}