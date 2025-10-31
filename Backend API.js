<!DOCTYPE html>  
<html lang="en">  
<head>  
  <meta charset="UTF-8" />  
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
  <title>Product Catalog</title>  
  <style>     body {       font-family: 'Poppins', sans-serif;       background: linear-gradient(to right, #89f7fe, #66a6ff);       margin: 0;       padding: 0;  
    }  
  
    header {       backgroundcolor: #2c3e50; color: #fff; textalign: center; padding: 20px 0;  
      font-size: 24px;       font-weight: bold;       letter-spacing: 1px;       box-shadow: 0 2px 
10px rgba(0, 0, 0, 0.3);  
    }  
  
    .container {       max-width: 1200px;       margin: 40px auto;       display: grid;       grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));       gap: 25px;       padding: 0 20px;  
    }  
  
    .card {       background-color: #fff;       border-radius: 15px;       overflow: hidden;       box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);       transition: transform 0.3s ease, boxshadow 0.3s ease;  
    }  
  
    .card:hover {       transform: translateY(5px);       box-shadow: 0 8px 20px rgba(0, 0, 
0, 0.3);  
    }  
  
    .card img {  
width: 100%; height: 220px; object-fit: cover;     }  
  
    .card-content {       
padding: 15px 20px;  
    }  
  
    .card-content h3 {       margin: 0;       color: 
#333;       font-size: 20px;       marginbottom: 8px;  
    }  
  
    .card-content p {       color: #555;       font-size: 14px;       line-height: 1.4;       
margin-bottom: 10px;  
    }  
  
    .price {       fontsize: 18px;       fontweight: bold;       color: #27ae60;  
    }  
  
    footer {       text-align: center;       padding: 
15px; background: 
#2c3e50;  color: #fff; font-size: 
14px;     }  
  </style>  
</head>  
<body>  
  <header>🛍️ Product Catalog</header>  
  
  <div class="container" id="productContainer">  
    <!-- Products will appear here -->  
  </div>  
  
  <footer>© 2025 Product Catalog | Built with Node.js + MongoDB</footer>  
  
  <script>  
    // Fetch and display products     async function loadProducts() {  
      try {  
        const response = await fetch('http://localhost:5000/api/products');         const products = await response.json();  
  
        const container = document.getElementById('productContainer');         container.innerHTML = '';  
  
        if (products.length === 0) {           container.innerHTML = '<p style="textalign:center;color:#333;">No products found.</p>';  
          return;  
        }  
  
        products.forEach(product => {           const card = document.createElement('div');           card.classList.add('card');           card.innerHTML 
= `  
            <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" alt="${product.name}">             <div class="card-content">  
              <h3>${product.name}</h3>  
              <p>${product.description || 'No description available.'}</p>  
              <div class="price">₹${product.price}</div>  
            </div>  
          `;  
          container.appendChild(card);  
        });  
      } catch (error) {         console.error('Error loading products:', error);  
      }  
    }  
  
    loadProducts();  
  </script>  
</body>  
</html> 
