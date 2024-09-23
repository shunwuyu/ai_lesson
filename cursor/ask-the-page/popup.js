document.addEventListener('DOMContentLoaded', function() {
    const urlDiv = document.getElementById('url');
    const queryButton = document.getElementById('queryButton');
    const responseDiv = document.getElementById('response');
    console.log('Popup loaded');

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (chrome.runtime.lastError) {
            console.error('Runtime error:', chrome.runtime.lastError);
            urlDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
            return;
        }

        if (tabs.length === 0) {
            console.error('No active tab found');
            urlDiv.textContent = 'No active tab found';
            return;
        }

        const activeTab = tabs[0];
        const activeTabUrl = activeTab.url;

        if (!activeTabUrl) {
            console.error('Active tab URL is undefined');
            urlDiv.textContent = 'Active tab URL is undefined';
            return;
        }

        console.log('Active tab URL:', activeTabUrl);
        urlDiv.textContent = activeTabUrl;
    });

    queryButton.addEventListener('click', function() {
        responseDiv.textContent = 'Querying...';

        fetch('https://api.dify.ai/v1/workflows/run', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer app-5wBk0w74UwFCNBp19f3lQFf',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "inputs": {},
                "response_mode": "streaming",
                "user": "abc-123"
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data);
            responseDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
            responseDiv.textContent = 'Error: ' + error.message;
        });
    });
});