const submit = () => {
    const input = document.getElementById("tokenInput").value.split('\n').map(token => token.trim());
    const validResponseDiv = document.getElementById("validResponse");
    const invalidResponseDiv = document.getElementById("invalidResponse");
    validResponseDiv.innerHTML = "";
    invalidResponseDiv.innerHTML = "";

    input.forEach(token => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://discordapp.com/api/v10/users/@me', true);
        xhr.setRequestHeader('Authorization', token);
        xhr.onload = () => {
            const responseText = xhr.response;
            if (xhr.status === 401) { // ステータスコードでエラーチェック
                invalidResponseDiv.innerHTML += `<br />${token}`;
            } else {
                validResponseDiv.innerHTML += `<br />${token}`;
            }
        };
        xhr.send();
    });
};
