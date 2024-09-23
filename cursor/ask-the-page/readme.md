https://www.bilibili.com/video/BV1Nw47eSEav/?spm_id_from=333.788&vd_source=3d50341f547faf8df242a214b04f2d86

- 打开 composer command +i

- this is a chrome extension project. Build a basic version. Just display "Hello Wrold!".That's it.

- Nice, Please change it a bit.Display the URL of the current tab.

- difi
    API key: app-5wBk0w74UwFCNBp19f3lQFf
    curl -X POST 'https://api.dify.ai/v1/workflows/run' \
     -H 'Authorization: Bearer your_api_key_here' \
     -H 'Content-Type: application/json' \
     --data-raw '{
       "inputs": {},
       "response_mode": "streaming",
       "user": "abc-123"
     }'

    Don't display the url and more.

    Add a "Query" button to the extension. When user clicks, make the api call and display the response.