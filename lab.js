// Constantes IVA
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada Productos
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

var container = document.getElementById("product-list-container");

showDescrip = (item, div) => {
    var description = document.createElement("span");
    description.setAttribute("class", "description-unit");
    description.innerText = item.description + " - " + item.price + " €/ud.";
    div.appendChild(description);
};

showItemNumber = (item, div) => {
    var itemNumber = document.createElement("input");
    itemNumber.setAttribute("type", "number");
    itemNumber.setAttribute("class", "inp-quantity");
    itemNumber.setAttribute("id", item.description.split(" ").join("-"));
    itemNumber.setAttribute("value", 0);
    itemNumber.setAttribute("max", item.stock);
    itemNumber.setAttribute("min", 0);
    itemNumber.addEventListener("change", event => item.units = event.target.valueAsNumber);
    div.appendChild(itemNumber);
};

var listingProducts = productList => {
    for (var item of productList) {
        var itemDiv = document.createElement("div");
        itemDiv.setAttribute("class", "item-div");

        showDescrip(item, itemDiv);
        showItemNumber(item, itemDiv);

        container.appendChild(itemDiv);
    };
};

listingProducts(products);


var calculate = document.getElementById("calc-btn");
var subtotal = 0;
var IVA = 0;
var total = 0;


var subtotalFunction = (price, units) => {
    var itemSubtotal = price * units;
    subtotal = subtotal + itemSubtotal;
};

var IVAFunction = (price, itemTax, units) => {
    var itemIVA = price * (itemTax / 100) * units;
    IVA = IVA + itemIVA;
};

var errorFunction = (units, stock, description) => {
    var error = document.getElementById(description.split(" ").join("-"));
    if (stock < units) {
        alert("No tenemos tanto stock de: " + description +
            ". --[ Stock actual: " + stock + " ]--");
        error.classList.add("error");
    } else {
        error.classList.remove("error");
    };
};

var calculateFunction = () => {
    subtotal = 0;
    IVA = 0;
    total = 0;

    for (var item of products) {
        errorFunction(item.units, item.stock, item.description);
        subtotalFunction(item.price, item.units);
        IVAFunction(item.price, item.tax, item.units);
    };

    total = subtotal + IVA;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2) + " €";
    document.getElementById("iva").innerText = IVA.toFixed(2) + " €";
    document.getElementById("total").innerText = total.toFixed(2) + " €";
};

calculate.addEventListener("click", calculateFunction);