document.addEventListener("DOMContentLoaded", function() {
    const productForm = document.getElementById("productForm");
    const inventoryTable = document.getElementById("inventoryTable");
    const searchBox = document.getElementById("searchBox");
    const exportBtn = document.getElementById("exportBtn");

    let inventory = [];

    // إضافة منتج جديد
    productForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const productName = document.getElementById("productName").value;
        const productQuantity = document.getElementById("productQuantity").value;
        const productLocation = document.getElementById("productLocation").value;

        const product = {
            name: productName,
            quantity: productQuantity,
            location: productLocation
        };

        inventory.push(product);
        updateTable();
        productForm.reset();
    });

    // تحديث جدول المخزون
    function updateTable() {
        inventoryTable.innerHTML = "";
        inventory.forEach((product, index) => {
            const row = `<tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.location}</td>
                <td><button onclick="deleteProduct(${index})"><i class="fas fa-trash"></i> حذف</button></td>
            </tr>`;
            inventoryTable.innerHTML += row;
        });
    }

    // حذف منتج
    window.deleteProduct = function(index) {
        inventory.splice(index, 1);
        updateTable();
    };

    // البحث عن منتج
    searchBox.addEventListener("input", function() {
        const searchText = searchBox.value.toLowerCase();
        const filteredInventory = inventory.filter(product =>
            product.name.toLowerCase().includes(searchText)
        );

        inventoryTable.innerHTML = "";
        filteredInventory.forEach((product, index) => {
            const row = `<tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.location}</td>
                <td><button onclick="deleteProduct(${index})"><i class="fas fa-trash"></i> حذف</button></td>
            </tr>`;
            inventoryTable.innerHTML += row;
        });
    });

    // تصدير البيانات إلى Excel بصيغة CSV
    exportBtn.addEventListener("click", function() {
        let csvContent = "data:text/csv;charset=utf-8,اسم السلعة,الكمية,الموقع\n";
        inventory.forEach(product => {
            csvContent += `${product.name},${product.quantity},${product.location}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "inventory.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
