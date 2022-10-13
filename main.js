const url = "http://127.0.0.1:3000/";

window.addEventListener("load", async () => {
    let data = await getData();
    console.log(data);

    data.forEach((contact) => showDestinations(contact));
});

const form = document.querySelector("#theForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const contact = {
        title: document.querySelector("#title").value,
        dateFrom: document.querySelector("#dateFrom").value,
        dateTo: document.querySelector("#dateTo").value,
        description: document.querySelector("#description").value,
        location: document.querySelector("#location").value,
        country: document.querySelector("#country").value,
        picture: document.querySelector("#picture").value,
    };

    postData(contact);
});

async function postData(contact) {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    document.querySelector("#submitMessage").textContent =
        "Destination successfully posted!";

    document.querySelector("#destinationList").innerHTML = "";
    let newData = await getData();
    newData.forEach((contact) => showDestinations(contact));
}

function displayDate(dbDate) {
    const nth = function (d) {
        if (d > 3 && d < 21) return '<sup>th</sup>';
        switch (d % 10) {
            case 1:
                return '<sup>st</sup>';
            case 2:
                return '<sup>nd</sup>';
            case 3:
                return '<sup>rd</sup>';
            default:
                return '<sup>th</sup>';
        }
    };

    const dateObj = new Date(dbDate);

    const date = dateObj.getDate();
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ][dateObj.getMonth()];
    const year = dateObj.getFullYear();

    dateString = month + " " + date + nth(date) + " " + year;
    return dateString;
}

function showDestinations(contact) {
    const template = document.querySelector("#theList").content;
    const copy = template.cloneNode(true);

    // Info for list card
    copy.querySelector(".post-wrapper").setAttribute("id", contact._id);
    copy.querySelector("h2").textContent = contact.title;
    copy.querySelectorAll(".dates").forEach((date) => {
        date.innerHTML =
            displayDate(contact.dateFrom) + " - " + displayDate(contact.dateTo);
    });
    copy.querySelector(".description-short").textContent =
        contact.description.substr(0, 99);
    if (contact.description.length > 100)
        copy.querySelector(".description-short").textContent += " ...";

    // Read more button functionality
	copy.querySelector("#open-modal").setAttribute(
        "href",
        "#" + contact._id + "-modal"
    );

    // Extra info for full info box
    copy.querySelector(".post-modal").setAttribute(
        "id",
        contact._id + "-modal"
    );
    // copy.querySelector("img").src = contact.picture;
    copy.querySelector("h1").textContent = contact.title;
    copy.querySelector(".location").textContent =
        contact.location + ", " + contact.country;
    copy.querySelector(".description-full").textContent = contact.description;

	// Edit button functionality
    copy.querySelector("#edit-button").addEventListener("click", () => {
        window.location.replace(
            "http://127.0.0.1:5500/update.html?id=" + contact._id
        );
    });

    // Delete button functionality
    copy.querySelector("#delete-button").addEventListener("click", () => {
        //console.log(contact._id);
        deleteData(contact._id);
    });
    const parent = document.querySelector("#destinationList");
    parent.appendChild(copy);
}

async function getData() {
    const response = await fetch(url);
    const body = await response.json();
    console.log(body);
    return body;
}

async function deleteData(id) {
    fetch(url + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    // return document.querySelector(`#${id}`).remove();
}
