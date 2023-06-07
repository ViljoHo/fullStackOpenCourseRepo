##0.4

```mermaid

sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST note="jes" to https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server starts handling the data and saves it.
    server-->>browser: Server redirects to the https://studies.cs.helsinki.fi/exampleapp/notes url
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: the HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "jes", "date": "2023-06-07T06:07:38.375Z" }, ... ]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes
```

##0.5

```mermaid

sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes 
```



##0.6

```mermaid

sequenceDiagram
    participant browser
    participant server    

    Note right of browser: The browser does not load the whole page again but only sends one new POST request to the server. That spa.js redraws a new note and sends the data to the server after pressing the save button.

    browser->>server: POST {content: "jes", date: "2023-06-07T06:43:27.769Z"} https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status code: 201 created.
    deactivate server


```
