const API_URL = "/api";

let allEmails = [];


// Load Inbox

async function loadEmails() {

    try {

        const response =
            await fetch(`${API_URL}/emails`);

        allEmails =
            await response.json();

        displayEmails(allEmails);

    } catch (error) {

        console.error(error);

        document.getElementById("emailList").innerHTML =
            "<p>Unable to load emails.</p>";
    }
}


// Display emails

function displayEmails(emails) {

    const emailList =
        document.getElementById("emailList");

    if (emails.length === 0) {

        emailList.innerHTML =
            "<div class='loading'>No emails found.</div>";

        return;
    }

    emailList.innerHTML = emails.map(email => `

        <div class="email">

            <img
                src="https://i.pravatar.cc/100?u=${email.sender}"
                alt="sender">

            <div class="email-info">

                <strong>
                    ${email.sender}
                </strong>

                <span>
                    ${email.subject}
                </span>

                <p>
                    ${email.message}
                </p>

            </div>

            <div class="email-date">

                ${new Date(email.created_at)
                    .toLocaleDateString()}

            </div>

        </div>

    `).join("");
}


// Search

function searchEmails() {

    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered =
        allEmails.filter(email =>

            email.sender
                .toLowerCase()
                .includes(search)

            ||

            email.subject
                .toLowerCase()
                .includes(search)

            ||

            email.message
                .toLowerCase()
                .includes(search)

        );

    displayEmails(filtered);
}


// Show inbox

function showInbox() {

    document
        .getElementById("inboxSection")
        .classList.remove("hidden");

    document
        .getElementById("composeSection")
        .classList.add("hidden");

    document
        .getElementById("pageTitle")
        .innerText = "Inbox";

    loadEmails();
}


// Show sent

async function showSent() {

    document
        .getElementById("inboxSection")
        .classList.remove("hidden");

    document
        .getElementById("composeSection")
        .classList.add("hidden");

    document
        .getElementById("pageTitle")
        .innerText = "Sent";

    try {

        const response =
            await fetch(`${API_URL}/sent`);

        const emails =
            await response.json();

        displayEmails(emails);

    } catch (error) {

        console.error(error);
    }
}


// Show compose

function showCompose() {

    document
        .getElementById("inboxSection")
        .classList.add("hidden");

    document
        .getElementById("composeSection")
        .classList.remove("hidden");

    document
        .getElementById("pageTitle")
        .innerText = "Compose Email";
}


// Send email

async function sendEmail() {

    const receiver =
        document.getElementById("receiver").value;

    const subject =
        document.getElementById("subject").value;

    const message =
        document.getElementById("message").value;


    if (!receiver || !subject || !message) {

        alert("Please fill all fields.");

        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/emails`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    sender: "raj@example.com",

                    receiver,

                    subject,

                    message

                })

            });


        const result =
            await response.json();


        if (response.ok) {

            alert("Email sent successfully!");

            document.getElementById("receiver").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";

            showInbox();

        } else {

            alert(result.message);
        }

    } catch (error) {

        console.error(error);

        alert("Unable to send email.");
    }
}


// Start application

loadEmails();
