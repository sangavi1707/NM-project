1. Clone or create the project folder and put the files exactly as the tree above.


2. Install Node & MongoDB

Node.js v16+ recommended.

For local MongoDB: install MongoDB Community and start the mongod service.

Or create a free MongoDB Atlas cluster and copy the connection string.



3. Create .env

Copy .env.example → .env and edit MONGO_URI if needed.

Example (local):

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/product_catalog



4. Install dependencies

cd product-catalog
npm install


5. Start the app

Development (auto-restart on changes):

npm run dev

Production:

npm start



6. Open the app in browser

Dashboard: http://localhost:5000/

Login: http://localhost:5000/login.html

CRUD page: http://localhost:5000/product-catalog.html



7. Verify

Use the form to add a product and check MongoDB Compass or mongo shell that documents appear in product_catalog.products.

Use edit/delete buttons on the page.
