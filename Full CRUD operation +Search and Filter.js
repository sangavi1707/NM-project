<!DOCTYPE html> 
<html lang="en"> 
<head> 
  <meta charset="utf-8" /> 
  <meta name="viewport" content="width=device-width,initial-scale=1" /> 
  <title>Product Catalog — CRUD</title> 
  <style> 
    :root{--blue:#0984e3;--muted:#636e72} 
    body{font-family:Segoe UI, Tahoma, sans-serif;background:lineargradient(135deg,#74b9ff,#a29bfe);margin:0;min-height:100vh;display:flex;align-items:flexstart;justify-content:center;padding:28px} 
    .wrap{width:100%;max-width:980px;background:#fff;border-radius:14px;padding:20px 
22px;box-shadow:0 10px 30px rgba(0,0,0,0.12)}     h1{margin:0 0 6px} 
    .subtitle{color:var(--muted);margin-top:0;margin-bottom:16px}     form{display:flex;flex-wrap:wrap;gap:10px;align-items:center}     input, select{padding:10px;border:1px solid #dfe6e9;border-radius:8px;font-size:0.95rem}     input[type=number]{width:130px} 
    .btn{padding:10px 14px;border-radius:8px;border:none;color:#fff;font-weight:700;cursor:pointer} 
    .save{background:var(--blue)} 
    .clear{background:#d63031} 
    .filter-row{display:flex;gap:10px;margin:14px 0;flex-wrap:wrap}     .filter-row input,.filter-row select{flex:1;min-width:160px}     table{width:100%;border-collapse:collapse;margin-top:8px}     th,td{padding:10px;border:1px solid #e6eef6;text-align:center}     th{background:var(--blue);color:#fff}     td{background:#fafcff} 
    .action{padding:6px 8px;border-radius:6px;border:none;color:#fff;cursor:pointer} 
    .edit{background:#f1c40f} 
    .del{background:#e74c3c} 
    .msg{text-align:center;margin-top:8px;font-weight:700} 
    @media(max-width:760px){form{flex-direction:column}input[type=number]{width:100%}} 
  </style> 
</head> 
<body> 
  <div class="wrap"> 
    <h1>🛒 Product Catalog</h1> 
    <p class="subtitle">Add, View, Edit, Delete • Search & Filter products</p> 
 
    <form id="productForm"> 
      <input type="hidden" id="productId"> 
      <input id="name" placeholder="Name" required> 
      <input id="description" placeholder="Description"> 
      <input id="price" type="number" step="0.01" placeholder="Price" required> 
      <input id="category" placeholder="Category"> 
      <button class="btn save" type="submit">Save</button> 
      <button class="btn clear" type="reset">Clear</button> 
    </form> 
 
    <div class="filter-row"> 
      <input id="searchInput" placeholder="Search by name..."> 
      <select id="filterCategory"><option value="">All Categories</option></select> 
    </div> 
 
    <p id="message" class="msg"></p> 
 
    <table> 
      <thead> 
        <tr><th>Name</th><th>Description</th><th>Price 
($)</th><th>Category</th><th>Actions</th></tr> 
      </thead> 
      <tbody id="productTable"></tbody> 
    </table> 
  </div> 
 
  <script>     const API = '/api/products';     const productForm = document.getElementById('productForm');     const productTable = document.getElementById('productTable');     const message = document.getElementById('message'); 
    const searchInput = document.getElementById('searchInput');     const filterCategory = document.getElementById('filterCategory');     let allProducts = [];     let editingId = null; 
 
    async function fetchProducts(){ 
      try{         const r = await fetch(API);         allProducts = await r.json();         populateCategoryFilter();         renderTable(allProducts); 
      }catch(e){         console.error(e);         message.textContent = 'Failed loading products';         message.style.color = 'red'; 
      } 
    } 
 
    function populateCategoryFilter(){       const cats = Array.from(new Set(allProducts.map(p=>p.category).filter(Boolean)));       filterCategory.innerHTML = '<option value="">All Categories</option>';       cats.forEach(c=> filterCategory.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`)); 
    } 
 
    function renderTable(products){       productTable.innerHTML = '';       if(!products.length){         productTable.innerHTML = '<tr><td colspan="5">No products found</td></tr>'; 
        return; 
      } 
      products.forEach(p=>{ 
        productTable.insertAdjacentHTML('beforeend', ` 
          <tr> 
            <td>${p.name}</td> 
            <td>${p.description || '-'}</td> 
            <td>${Number(p.price).toFixed(2)}</td> 
            <td>${p.category || '-'}</td> 
            <td> 
              <button class="action edit" onclick="startEdit('${p._id}')">Edit</button> 
              <button class="action del" onclick="removeProduct('${p._id}')">Delete</button> 
            </td> 
          </tr> 
        `); 
      }); 
    } 
 
    productForm.addEventListener('submit', async e=>{ 
      e.preventDefault();       const payload = {         name: document.getElementById('name').value.trim(),         description: document.getElementById('description').value.trim(),         price: parseFloat(document.getElementById('price').value),         category: document.getElementById('category').value.trim() 
      };       try{         let res;         if(editingId){           res = await fetch(`${API}/${editingId}`, {             method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) 
          }); 
          message.textContent = 'Product updated';           editingId = null; 
        } else { 
          res = await fetch(API, {             method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) 
          }); 
          message.textContent = 'Product added'; 
        } 
        message.style.color = 'green';         productForm.reset();         fetchProducts();       }catch(err){         console.error(err);         message.textContent = 'Operation failed';         message.style.color = 'red'; 
      } 
    }); 
 
    function startEdit(id){       const p = allProducts.find(x=>x._id===id);       if(!p) return;       editingId = id;       document.getElementById('name').value = p.name;       document.getElementById('description').value = p.description || '';       document.getElementById('price').value = p.price;       document.getElementById('category').value = p.category || '';       window.scrollTo({top:0,behavior:'smooth'}); 
    } 
 
    async function removeProduct(id){       if(!confirm('Delete this product?')) return; 
      try{ 
        await fetch(`${API}/${id}`, { method:'DELETE' });         message.textContent = 'Product deleted';         message.style.color = 'darkred'; 
        fetchProducts();       }catch(e){         message.textContent = 'Delete failed';         message.style.color = 'red'; 
      } 
    } 
 
    searchInput.addEventListener('input', applyFilters);     filterCategory.addEventListener('change', applyFilters); 
 
    function applyFilters(){       const q = searchInput.value.trim().toLowerCase();       const cat = filterCategory.value;       const filtered = allProducts.filter(p =>  
        p.name.toLowerCase().includes(q) && 
        (cat ? p.category === cat : true) 
      ); 
      renderTable(filtered); 
    } 
 
    // initial load     fetchProducts(); 
  </script> 
</body> 
</html> 
 
 
 
 
 
