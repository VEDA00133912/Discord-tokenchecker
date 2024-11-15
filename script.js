const submit = (event) => {
    event.preventDefault(); 

    const input = document.getElementById("token").value.split('\n').map(token => token.trim());
    const logDiv = document.getElementById("log");
    const logEntryPlaceholder = document.querySelector(".placeholder");
    
    logEntryPlaceholder.style.display = 'none';

    input.forEach(token => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://discordapp.com/api/v10/users/@me', true);
        xhr.setRequestHeader('Authorization', token);
        
        xhr.onload = () => {
            if (xhr.status === 401) { 
                logDiv.innerHTML += `<div class="log-entry failure">✗ ${token}</div>`;
            } else { 
                logDiv.innerHTML += `<div class="log-entry success">✓ ${token}</div>`;
            }
        };
        
        xhr.onerror = () => {
            logDiv.innerHTML += `<div class="log-entry failure">✗ ${token} (Error connecting)</div>`;
        };

        xhr.send();
    });
};

const downloadValidTokens = () => {
    const validTokens = [];
    const logEntries = document.querySelectorAll(".log-entry.success");

    logEntries.forEach(entry => {
        validTokens.push(entry.textContent.slice(2).trim()); 
    });

    if (validTokens.length === 0) {
        alert("No valid tokens found.");
        return;
    }

    const blob = new Blob([validTokens.join('\n')], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "valid_tokens.txt";
    link.click();
};

document.getElementById("tokenForm").addEventListener("submit", submit);
document.getElementById("downloadBtn").addEventListener("click", downloadValidTokens);
