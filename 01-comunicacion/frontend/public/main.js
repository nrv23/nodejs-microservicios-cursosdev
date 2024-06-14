
const msgBackend1 = document.getElementById("messageBackend1");
const msgBackend2 = document.getElementById("messageBackend2");
msgBackend1.innerHTML = "Waiting for message of backend 1";
msgBackend2.innerHTML = "Waiting for message of backend 2";


async function request(url) {

    const response = await fetch(url)
    return await response.json();
}

async function loadMessages() {

    const { pathBackend1 } = await request("/api/config")
    const response = await request(pathBackend1);

    msgBackend1.innerHTML = response.messageBackend1
    msgBackend2.innerHTML = response.messageBackend2

}

loadMessages()