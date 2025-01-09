const submit = (event) => {
    event.preventDefault();

    const input = document.getElementById("token").value.split('\n').map(token => token.trim());
    const logDiv = document.getElementById("log");
    const logEntryPlaceholder = document.querySelector(".placeholder");

    logEntryPlaceholder.style.display = 'none';
    logDiv.innerHTML = '';

    fetch('/checkTokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tokens: input.join('\n') })
    })
    .then(response => response.json())
    .then(data => {
        data.validTokens.forEach(token => {
            logDiv.innerHTML += `<div class="log-entry success">✓ ${token}</div>`;
        });
        data.invalidTokens.forEach(token => {
            logDiv.innerHTML += `<div class="log-entry failure">✗ ${token}</div>`;
        });
    })
    .catch(error => {
        logDiv.innerHTML += `<div class="log-entry failure">✗ Error occurred while checking tokens.</div>`;
        console.error('Error:', error); 
    });
};

const downloadValidTokens = () => {
    const link = document.createElement('a');
    link.href = '/downloadValidTokens';
    link.download = 'valid_tokens.txt';
    link.click();
};

document.getElementById("tokenForm").addEventListener("submit", submit);
document.getElementById("downloadBtn").addEventListener("click", downloadValidTokens);