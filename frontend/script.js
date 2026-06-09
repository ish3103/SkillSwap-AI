function explore(){
    window.location.href = "signup.html";
}

async function signup(){

    let name =
        document.getElementById("signupName").value;

    let email =
        document.getElementById("signupEmail").value;

    let password =
        document.getElementById("signupPassword").value;

    if(name === "" || email === "" || password === ""){

        alert("Please fill all fields");

        return;
    }

    try{

        const response = await fetch(
            "http://localhost:5000/api/users/signup",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            }
        );

        const data = await response.json();

        alert(data.message);

        if(response.ok){

            window.location.href = "login.html";

        }

    }
    catch(error){

        console.log(error);

        alert("Something went wrong");

    }

}
async function login(){

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;

    try{

        const response = await fetch(
            "http://localhost:5000/api/users/login",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            }
        );

        const data = await response.json();

        alert(data.message);

        if(response.ok){

            localStorage.setItem(
                "loggedInUser",
                data.user.email
            );

            window.location.href =
                "dashboard.html";
        }

    }
    catch(error){

        console.log(error);

        alert("Something went wrong");

    }

}
if(window.location.pathname.includes("dashboard.html")){

    let userEmail = localStorage.getItem("loggedInUser");

    document.getElementById("welcomeText").innerText =
        "Welcome, " + userEmail;

}

function addOfferSkill(){

    let skill = document.getElementById("offerSkill").value;

    if(skill === ""){
        alert("Enter a skill");
        return;
    }

    let li = document.createElement("li");

    li.innerText = skill;

    document.getElementById("offerList").appendChild(li);

    document.getElementById("offerSkill").value = "";
}

function addWantSkill(){

    let skill = document.getElementById("wantSkill").value;

    if(skill === ""){
        alert("Enter a skill");
        return;
    }

    let li = document.createElement("li");

    li.innerText = skill;

    document.getElementById("wantList").appendChild(li);

    document.getElementById("wantSkill").value = "";
}

function logout(){

    window.location.href = "index.html";
}
let users = [];

async function loadSkills(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/skills"
        );

        const data = await response.json();

        users = data.map(skill => ({

            name: skill.name,

            skill: skill.offering_skill,

            wanted: skill.wanted_skill

        }));

        displaySkills(users);

    }
    catch(error){

        console.log(error);

    }

}
function displaySkills(data){

    let cards = document.getElementById("skillCards");

    if(!cards) return;

    cards.innerHTML = "";

    data.forEach(user => {

        let div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Offers:</strong> ${user.skill}</p>
            <p><strong>Wants:</strong> ${user.wanted}</p>
            <button onclick="requestSkill('${user.name}')">
                Request Exchange
            </button>
        `;

        cards.appendChild(div);
    });
}

if(window.location.pathname.includes("browse.html")){
    loadSkills();
}

function searchSkills(){

    let input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let filtered = users.filter(user =>
        user.skill.toLowerCase().includes(input)
    );

    displaySkills(filtered);
}

async function requestSkill(receiverName){

    try{

        const response = await fetch(
            "http://localhost:5000/api/requests",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    sender_name: "Current User",

                    receiver_name: receiverName

                })

            }
        );

        const data = await response.json();

        alert(data.message);

    }
    catch(error){

        console.log(error);

        alert("Failed to send request");

    }

}

const requests = [

    {
        name: "Rahul",
        skill: "Java",
        status: "Pending"
    },

    {
        name: "Priya",
        skill: "Photoshop",
        status: "Pending"
    }

];

function displayRequests(){

    let requestList =
        document.getElementById("requestList");

    if(!requestList) return;

    requestList.innerHTML = "";

    requests.forEach((request, index) => {

        let div = document.createElement("div");

        div.classList.add("request-card");

        div.innerHTML = `
            <h3>${request.name}</h3>

            <p>
                Wants to exchange:
                <strong>${request.skill}</strong>
            </p>

            <p>
                Status:
                <strong id="status-${index}">
                    ${request.status}
                </strong>
            </p>

            <button
                class="accept-btn"
                onclick="acceptRequest(${index})"
            >
                Accept
            </button>

            <button
                class="reject-btn"
                onclick="rejectRequest(${index})"
            >
                Reject
            </button>
        `;

        requestList.appendChild(div);

    });
}

if(window.location.pathname.includes("requests.html")){
    displayRequests();
}

function acceptRequest(index){

    requests[index].status = "Accepted";

    displayRequests();
}

function rejectRequest(index){

    requests[index].status = "Rejected";

    displayRequests();
}

/* CHATBOT */

function toggleChatbot(){

    const chatbot =
        document.getElementById("chatbotBox");

    if(chatbot.style.display === "flex"){

        chatbot.style.display = "none";

    }
    else{

        chatbot.style.display = "flex";

    }
}

async function sendMessage(){

    const input =
        document.getElementById("userInput");

    const message = input.value;

    if(message === "") return;

    const chatMessages =
        document.getElementById("chatMessages");

    /* USER MESSAGE */

    const userDiv =
        document.createElement("div");

    userDiv.classList.add("user-message");

    userDiv.innerText = message;

    chatMessages.appendChild(userDiv);

    input.value = "";

    /* BOT TYPING */

    const botDiv =
        document.createElement("div");

    botDiv.classList.add("bot-message");

    botDiv.innerText = "Typing...";

    chatMessages.appendChild(botDiv);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    try{

        const response =
            await fetch(
                "http://localhost:5000/api/ai/chat",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body: JSON.stringify({
                        message
                    })

                }
            );

        const data = await response.json();

        botDiv.innerText = data.reply;

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }
    catch(error){

        console.log(error);

        botDiv.innerText =
            "AI is currently unavailable.";
    }
}

/* PARTICLES */

particlesJS("particles-js", {

    particles: {

        number: {
            value: 80
        },

        color: {
            value: "#38bdf8"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.5
        },

        size: {
            value: 3
        },

        line_linked: {

            enable: true,

            distance: 150,

            color: "#38bdf8",

            opacity: 0.4,

            width: 1
        },

        move: {

            enable: true,

            speed: 2
        }
    },

    interactivity: {

        events: {

            onhover: {
                enable: true,
                mode: "repulse"
            }
        }
    },

    retina_detect: true
});
async function loadRequests(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/requests"
        );

        const requests = await response.json();

        const requestList =
            document.getElementById("requestList");

        if(!requestList) return;

        requestList.innerHTML = "";

        requests.forEach(request => {

            const div =
                document.createElement("div");

            div.classList.add("card");

            div.innerHTML = `
                <h3>${request.sender_name}</h3>

                <p>
                    <strong>Receiver:</strong>
                    ${request.receiver_name}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${request.status}
                </p>
            `;

            requestList.appendChild(div);

        });

    }
    catch(error){

        console.log(error);

    }

}

if(
    window.location.pathname.includes(
        "requests.html"
    )
){
    loadRequests();
}

async function saveSkills(){

    const offeringSkill =
        document.getElementById("offerSkill").value;

    const wantedSkill =
        document.getElementById("wantSkill").value;

    const userEmail =
        localStorage.getItem("loggedInUser");

    if(!offeringSkill || !wantedSkill){

        alert("Please enter both skills");
        return;

    }

    try{

        const response = await fetch(
            "http://localhost:5000/api/skills",
            {
                method: "POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({

                    name: userEmail,

                    offering_skill: offeringSkill,

                    wanted_skill: wantedSkill

                })

            }
        );

        const data = await response.json();

        alert(data.message);

    }
    catch(error){

        console.log(error);

        alert("Failed to save skills");

    }

}