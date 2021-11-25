# Lab 10 (React Cart Page Using redux)
## Task
You are on your way to finishing this insane project… Create the first of three cart pages - Shopping cart page.  
Also, here you meet one of the most popular React library - Redux.  

## Requirements
All of the requirements for previous React.js works should be kept.
 - Functionality:
   - Item page: “Add to cart” action should be implemented using Redux flow: when you add an item to cart, it should be added to your redux store. On Cart page you take all of the items from the store
   - Cart page: “add/remove” actions should be implemented through redux actions & reducers as well.
 - Code style:
   - Redux: All Redux parts (actions / reducers / store) should be kept in separate and specific files (actions.js / reducers.js / store.js etc.)
   - Use useSelector hook for getting the data from redux store (instead of connect() function) https://react-redux.js.org/api/hooks#useselector-examples
   - Use useDispatch hook for dispatching your actions (instead of connect() function) https://react-redux.js.org/api/hooks#usedispatch

## How to run
 - Clone the repo
 - `cd web_labs && git checkout lab8-9 && git submodule update --init --recursive`
 - `make`
 - `npm install`

Open 2 terminals & run `npm start` & `./build/bin/app -p 5000`

Open [http://localhost:3000](http://localhost:3000) to view the page in the browser.

