//fetching data from data.json sequentially using await
async function getData() {
    const data = await fetch("./data.json");
    const expenses = await data.json();
    const chart = document.getElementById("chart");

    //finding current day and storing it in variable to use in switch statement
    const currentDay = new Date().getDay();

    //finding highest daily expense
    const highest = findHighestNum(expenses);
    function findHighestNum(expenses) {
        let temp = 0;
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].amount > temp) temp = expenses[i].amount;
        }
        return temp;
    }

    //finding total monthly spend
    const monthlyTotal = addTotal(expenses);
    let monthlySpend = document.querySelector(".monthly-spend");
    //inputting total monthly spend into HTML element
    monthlySpend.innerHTML += `$${monthlyTotal}`;

    function addTotal(expenses) {
        let total = 0;
        for (let i = 0; i < expenses.length; i++) {
            total += expenses[i].amount;
        }
        return total.toFixed(2);
    }
    //looping through data array
    expenses.forEach((expense) => {
        //creating parent div and child div's
        let section = document.createElement("div");
        section.classList.add("section");
        let amount = document.createElement("div");
        amount.classList.add("amount");
        //inputting amount into HTML element
        amount.innerHTML += `$${expense.amount}`;
        section.appendChild(amount);
        let bar = document.createElement("div");
        bar.classList.add("bar");
        //setting background color of bar based on day - checking for a match in switch statement
        switch (currentDay) {
            case 0:
                if (expense.day == "sun")
                    bar.style.backgroundColor = "hsl(186, 34%, 60%)";
                break;
            case 1:
                if (expense.day == "mon")
                    bar.style.backgroundColor = "hsl(186, 34%, 60%)";
                break;
            case 2:
                if (expense.day == "tues")
                    bar.style.backgroundColor = "hsl(186, 34%, 60%)";
                break;
            case 3:
                if (expense.day == "wed")
                    bar.style.backgroundColor = "hsl(186, 34%, 60%)";
                break;
            case 4:
                if (expense.day == "thu")
                    bar.style.backgroundColor = "hsl(186, 34%, 60%)";
                break;
            case 5:
                if (expense.day == "fri")
                    bar.style.backgroundColor = "hsl(186, 34%, 60%)";
                break;
            case 6:
                if (expense.day == "sat")
                    bar.style.backgroundColor = "hsl(186, 34%, 60%)";
                break;
        }

        //adding extra height to each bar by dividing every expense by highest expense and multiplying by default css height
        bar.style.maxHeight = `${8.5 * (expense.amount / highest)}rem`;
        section.appendChild(bar);
        let day = document.createElement("span");
        day.classList.add("day");
        //inputting day of the week into HTML element
        day.innerHTML += expense.day;
        section.appendChild(day);
        bar.appendChild(amount);
        //adding section into chart
        chart.appendChild(section);
    });
}

getData();
