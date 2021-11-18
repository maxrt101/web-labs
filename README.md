# Lab 8-9 (React Item Page + REST)
## Task
Continue work on your React App by adding a page for  your Item (see the link to wireframe of Item page above). Also, now, you have to make all your previous pages (Home & Catalog) more interactive.  
Now, you are about to put a final touches on all pages you created - implement interaction with your REST API server.  

## Requirements
Requirements:
 -  All of the requirements for previous React.js works should be kept.
 -  Code style:
     -  Your items should be stored inside the state or context (your choice) of your page https://uk.reactjs.org/docs/hooks-state.html https://uk.reactjs.org/docs/hooks-reference.html#usecontext
     - For your state management use useState() inside Functional Component instead of this.state and Class component
     - If you decided to use context, use useContext() hook instead of Context.Consumer https://www.robinwieruch.de/react-usecontext-hook
     - For any http request - use axios library https://github.com/axios/axios#installing
     - All your API functions should be separated into single file (or folder, if you want) - just like you saw in Live coding for 5 lab with fetch() function
 -  Functionality (IMPORTANT):
     - Home page: “View more” button should display more elements on the same page Tip: Elements can be just random paragraph & heading, use your imagination ;)
     - Catalog page: You should be able to filter your items list, by applying different filters by item's properties (i.e size/color/type)
     - Catalog page: Search by any text property option should also work
     - Catalog & Item pages: “View more” action on every item should refer to corresponding Item page, with correct information about item (get the info from your state/context)
     - On Catalog Page - all items should now be fetched from your backend with GET method (using axios)
     - Search with filters - should also be implemented with GET request (search by text field can be left as it is) Hint: pass filters as url parameter
     - Before response from your GET method is received you have to display a Spinner(Loader component) to the user. Something like this: https://projects.lukehaas.me/css-loaders/

## How to run
 - Clone the repo
 - `cd web_labs && git checkout lab8-9 && git submodule update --init --recursive`
 - `make`
 - `npm install`

Open 2 terminals & run `npm start` & `./build/bin/app -p 5000`

Open [http://localhost:3000](http://localhost:3000) to view the page in the browser.

