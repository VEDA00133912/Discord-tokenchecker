function submit() {
    var input = document.getElementById("tokenInput").value.split('\n');
    var validResponseDiv = document.getElementById("validResponse");
    var invalidResponseDiv = document.getElementById("invalidResponse");
    validResponseDiv.innerHTML = "";
    invalidResponseDiv.innerHTML = "";

    input.forEach(token => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://discordapp.com/api/v9/users/@me/guilds', true);
        xhr.setRequestHeader('Authorization', `${token.trim()}`);
        xhr.onload = function() {
            var responseText = xhr.response;
            if (responseText.includes("401: Unauthorized")) {
                invalidResponseDiv.innerHTML += "<br />" + token.trim();
            } else {
                validResponseDiv.innerHTML += "<br />" + token.trim();
            }
        }
        xhr.send();
    });
}
