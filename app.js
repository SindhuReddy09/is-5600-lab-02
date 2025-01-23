/* add your code here */
document.addEventListener("DOMContentLoaded", () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    console.log("User Data:", userData);
    console.log("Stocks Data:", stocksData);

    generateUserList(userData, stocksData);

    const deleteButton = document.querySelector("#btnDelete");
    const saveButton = document.querySelector("#btnSave");

    // Register the event listener on the delete button
    deleteButton.addEventListener("click", (event) => {
        event.preventDefault();

        const userId = document.querySelector("#userID").value;
        const userIndex = userData.findIndex((user) => user.id == userId);

        if (userIndex !== -1) {
            userData.splice(userIndex, 1);
            console.log("User deleted:", userId);
            generateUserList(userData, stocksData);
        } else {
            console.error("User not found for ID:", userId);
        }
    });

    // Register the event listener on the save button
    saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Save button clicked");

        const id = document.querySelector("#userID").value;

        for (let i = 0; i < userData.length; i++) {
            if (userData[i].id == id) {
                userData[i].user.firstname = document.querySelector("#firstname").value;
                userData[i].user.lastname = document.querySelector("#lastname").value;
                userData[i].user.address = document.querySelector("#address").value;
                userData[i].user.city = document.querySelector("#city").value;
                userData[i].user.email = document.querySelector("#email").value;

                console.log("User data updated:", userData[i]);
                generateUserList(userData, stocksData);
                break;
            }
        }
    });
});

/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {*} users
 * @param {*} stocks
 */
function generateUserList(users, stocks) {
    const userList = document.querySelector(".user-list");
    userList.innerHTML = "";

    users.map(({ user, id }) => {
        const listItem = document.createElement("li");
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute("id", id);
        userList.appendChild(listItem);
    });

    userList.addEventListener("click", (event) =>
        handleUserListClick(event, users, stocks),
    );
}

/**
 * Handles the click event on the user list
 * @param {*} event
 */
function handleUserListClick(event, users, stocks) {
    console.log("User list clicked");
    
    const userId = event.target.id;
    const user = users.find((item) => item.id == userId);
    
    if (user) {
        populateForm(user);
        renderPortfolio(user, stocks);
    } else {
        console.error("User not found with ID:", userId);
    }
}

/**
 * Populates the form with the user's data
 * @param {*} data
 */
function populateForm(data) {
    const { user, id } = data;

    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#address").value = user.address;
    document.querySelector("#city").value = user.city;
    document.querySelector("#email").value = user.email;

    console.log("Form populated with user data:", user);
}

/**
 * Renders the portfolio items for the user
 * @param {*} user
 * @param {*} stocks
 */
function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector(".portfolio-list");

    portfolioDetails.innerHTML = "";

    console.log("Rendering portfolio for user:", user.firstname, user.lastname);

    portfolio.forEach(({ symbol, owned }) => {
        const symbolEl = document.createElement("p");
        const sharesEl = document.createElement("p");
        const actionEl = document.createElement("button");

        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = "View";
        actionEl.setAttribute("id", symbol);

        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
    });

    portfolioDetails.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            viewStock(event.target.id, stocks);
        }
    });
}

/**
 * Renders the stock information for the symbol
 * @param {*} symbol
 * @param {*} stocks
 */
function viewStock(symbol, stocks) {
    const stockArea = document.querySelector(".stock-form");

    if (stockArea) {
        const stock = stocks.find((s) => s.symbol == symbol);
        
        if (stock) {
            console.log("Viewing stock:", stock);
            document.querySelector("#stockName").textContent = stock.name;
            document.querySelector("#stockSector").textContent = stock.sector;
            document.querySelector("#stockIndustry").textContent = stock.subIndustry;
            document.querySelector("#stockAddress").textContent = stock.address;
            document.querySelector("#logo").src = `logos/${symbol}.svg`;
        } else {
            console.error("Stock not found with symbol:", symbol);
        }
    } else {
        console.error("Stock area not found.");
    }
}


