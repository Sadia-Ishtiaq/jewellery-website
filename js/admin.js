/* ============================================================
   SADIA'S COLLECTION — Admin Dashboard Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    setupAdminEventListeners();
});

let allAdminProducts = [];
let allAdminOrders = [];

// 1. Check Authentication Status
async function checkAdminAuth() {
    const user = API.getUser();
    const loginSection = document.getElementById('adminLoginSection');
    const dashboardSection = document.getElementById('adminDashboardSection');
    const adminUserNav = document.getElementById('adminUserNav');
    const adminNameLabel = document.getElementById('adminNameLabel');

    if (user && user.role === 'admin') {
        if (loginSection) loginSection.style.display = 'none';
        if (dashboardSection) dashboardSection.style.display = 'block';
        if (adminUserNav) adminUserNav.style.display = 'flex';
        if (adminNameLabel) adminNameLabel.textContent = user.name || 'Admin';

        // Load Dashboard Data
        loadAdminProducts();
        loadAdminOrders();
    } else {
        if (loginSection) loginSection.style.display = 'block';
        if (dashboardSection) dashboardSection.style.display = 'none';
        if (adminUserNav) adminUserNav.style.display = 'none';
    }
}

// 2. Setup Event Listeners
function setupAdminEventListeners() {
    // Login Form Submit
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmailInput').value;
            const password = document.getElementById('adminPasswordInput').value;

            try {
                const res = await API.login(email, password);
                if (res.user && res.user.role === 'admin') {
                    showAdminToast('Welcome Admin! Access granted.');
                    checkAdminAuth();
                } else {
                    alert('Access denied: You must be logged in as an administrator.');
                }
            } catch (err) {
                alert('Login failed: ' + (err.message || 'Invalid credentials'));
            }
        });
    }

    // Logout Button
    document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
        API.logout();
        checkAdminAuth();
    });

    // Tab Switching
    document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.admin-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

            this.classList.add('active');
            const targetTab = document.getElementById(this.dataset.tab);
            if (targetTab) targetTab.style.display = 'block';
        });
    });

    // Product Search Filter
    document.getElementById('productSearchAdmin')?.addEventListener('input', function (e) {
        const val = e.target.value.toLowerCase();
        const filtered = allAdminProducts.filter(p => p.name.toLowerCase().includes(val) || (p.sku && p.sku.toLowerCase().includes(val)));
        renderAdminProductsTable(filtered);
    });

    // Order Status Filter
    document.getElementById('orderStatusFilterAdmin')?.addEventListener('change', function (e) {
        const val = e.target.value;
        if (val === 'All') {
            renderAdminOrdersTable(allAdminOrders);
        } else {
            renderAdminOrdersTable(allAdminOrders.filter(o => o.status === val));
        }
    });

    // Add Product Modal Triggers
    document.getElementById('openAddProductModalBtn')?.addEventListener('click', () => openProductModal());
    document.getElementById('closeProductModalBtn')?.addEventListener('click', () => closeProductModal());
    document.getElementById('cancelProductModalBtn')?.addEventListener('click', () => closeProductModal());

    // Product Form Save
    document.getElementById('productSaveForm')?.addEventListener('submit', handleSaveProduct);
}

// 3. Load & Render Products
async function loadAdminProducts() {
    try {
        const res = await API.getProducts({ limit: 500 });
        if (res.products) {
            allAdminProducts = res.products;
            renderAdminProductsTable(allAdminProducts);
            updateStats();
        }
    } catch (err) {
        console.error('Failed to load admin products:', err);
    }
}

function renderAdminProductsTable(products) {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 30px; color: var(--gray);">No jewellery products found.</td></tr>`;
        return;
    }

    tbody.innerHTML = products.map(p => {
        let imgUrl = p.image || 'images/logo.jpg';
        if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('data:') && !imgUrl.startsWith('images/')) {
            imgUrl = 'images/' + imgUrl.replace(/^\/+/, '');
        }

        const stockBadge = p.countInStock > 10 
            ? `<span style="background:#D1FAE5; color:#065F46; padding:4px 10px; border-radius:12px; font-weight:600; font-size:12px;">${p.countInStock} (In Stock)</span>`
            : p.countInStock > 0
            ? `<span style="background:#FEF3C7; color:#92400E; padding:4px 10px; border-radius:12px; font-weight:600; font-size:12px;">${p.countInStock} (Low Stock)</span>`
            : `<span style="background:#FEE2E2; color:#991B1B; padding:4px 10px; border-radius:12px; font-weight:600; font-size:12px;">Out of Stock</span>`;

        return `
            <tr>
                <td><img src="${imgUrl}" class="product-thumb" onerror="this.onerror=null; this.src='images/logo.jpg';" /></td>
                <td><strong>${p.name}</strong></td>
                <td><span style="text-transform:capitalize; color:var(--gray); font-size:13px;">${p.category}</span></td>
                <td><strong style="color:var(--gold);">PKR ${p.price.toLocaleString()}</strong></td>
                <td><span style="text-decoration:line-through; color:var(--gray); font-size:12.5px;">PKR ${(p.originalPrice || 0).toLocaleString()}</span></td>
                <td>${stockBadge}</td>
                <td><code style="background:#eee; padding:2px 6px; border-radius:4px; font-size:12px;">${p.sku || 'N/A'}</code></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="editProduct('${p._id}')" style="margin-right:4px;"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-sm" onclick="deleteProduct('${p._id}')" style="background:#FEE2E2; color:#991B1B; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

// 4. Open Product Modal for Add / Edit
function openProductModal(productId = null) {
    const modal = document.getElementById('productFormModal');
    const title = document.getElementById('modalProductTitle');
    const form = document.getElementById('productSaveForm');

    form.reset();
    document.getElementById('editProductId').value = '';

    if (productId) {
        title.textContent = 'Edit Jewellery Product';
        const product = allAdminProducts.find(p => p._id === productId);
        if (product) {
            document.getElementById('editProductId').value = product._id;
            document.getElementById('prodNameInput').value = product.name;
            document.getElementById('prodCategoryInput').value = product.category;
            document.getElementById('prodPriceInput').value = product.price;
            document.getElementById('prodOriginalPriceInput').value = product.originalPrice || '';
            document.getElementById('prodStockInput').value = product.countInStock;
            document.getElementById('prodImageUrlInput').value = product.image;
            document.getElementById('prodSkuInput').value = product.sku || '';
            document.getElementById('prodDescInput').value = product.description || '';
        }
    } else {
        title.textContent = 'Add New Jewellery Item';
    }

    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productFormModal')?.classList.remove('active');
}

window.editProduct = function (id) {
    openProductModal(id);
};

window.deleteProduct = async function (id) {
    if (confirm('Are you sure you want to delete this jewellery item?')) {
        try {
            await API.deleteProduct(id);
            showAdminToast('Product deleted successfully');
            loadAdminProducts();
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    }
};

async function handleSaveProduct(e) {
    e.preventDefault();
    const editId = document.getElementById('editProductId').value;
    const formData = new FormData();

    formData.append('name', document.getElementById('prodNameInput').value);
    formData.append('category', document.getElementById('prodCategoryInput').value);
    formData.append('price', document.getElementById('prodPriceInput').value);
    formData.append('originalPrice', document.getElementById('prodOriginalPriceInput').value);
    formData.append('countInStock', document.getElementById('prodStockInput').value);
    formData.append('sku', document.getElementById('prodSkuInput').value);
    formData.append('description', document.getElementById('prodDescInput').value);

    const fileInput = document.getElementById('prodImageFileInput');
    if (fileInput.files && fileInput.files[0]) {
        formData.append('imageFile', fileInput.files[0]);
    } else {
        formData.append('image', document.getElementById('prodImageUrlInput').value || 'images/logo.jpg');
    }

    try {
        await API.saveProduct(formData, editId || null);
        showAdminToast(editId ? 'Product updated!' : 'New product added!');
        closeProductModal();
        loadAdminProducts();
    } catch (err) {
        alert('Save product failed: ' + err.message);
    }
}

// 5. Load & Render Orders
async function loadAdminOrders() {
    try {
        const res = await API.getAdminOrders();
        if (res.orders) {
            allAdminOrders = res.orders;
            renderAdminOrdersTable(allAdminOrders);
            updateStats();
        }
    } catch (err) {
        console.error('Failed to load admin orders:', err);
    }
}

function renderAdminOrdersTable(orders) {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: var(--gray);">No customer orders placed yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(o => {
        const dateStr = new Date(o.createdAt).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });
        const itemsSummary = o.orderItems.map(i => `${i.name} (x${i.quantity})`).join(', ');
        const isCardPay = o.paymentMethod && (o.paymentMethod.includes('Card') || o.paymentMethod.includes('CARD') || o.paymentMethod.includes('Online'));
        const payBadge = isCardPay
            ? `<small style="color:#2563EB; font-weight:700;"><i class="fas fa-credit-card"></i> Card (Online Paid)</small>${o.cardDetails && o.cardDetails.cardNumberMasked ? `<br/><small style="color:var(--gray); font-size:11px;">${o.cardDetails.cardNumberMasked}</small>` : ''}`
            : `<small style="color:#10B981; font-weight:600;"><i class="fas fa-money-bill-wave"></i> Cash on Delivery</small>`;
        const cust = o.customerDetails || {};

        return `
            <tr>
                <td><code style="background:#eee; padding:3px 6px; border-radius:6px; font-weight:700; font-size:12px;">#${o._id ? o._id.substring(o._id.length - 6).toUpperCase() : 'ORDER'}</code></td>
                <td>
                    <strong>${cust.name || 'Guest'}</strong><br />
                    <span style="font-size:12.5px; color:var(--gray);"><i class="fas fa-phone"></i> ${cust.phone || 'N/A'}</span><br />
                    <span style="font-size:12px; color:var(--gray);"><i class="fas fa-envelope"></i> ${cust.email || 'N/A'}</span>
                </td>
                <td>
                    <span style="font-size:13px; font-weight:500;">${cust.address || 'N/A'}</span><br />
                    <strong style="font-size:12.5px; color:var(--gold);">${cust.city || ''}</strong>
                </td>
                <td><span style="font-size:12.5px; max-width:200px; display:block; line-height:1.4;">${itemsSummary}</span></td>
                <td><strong style="color:var(--dark); font-size:15px;">PKR ${(o.totalAmount || 0).toLocaleString()}</strong><br />${payBadge}</td>
                <td>
                    <select class="status-select status-${o.status}" onchange="changeOrderStatus('${o._id}', this.value)">
                        <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td><span style="font-size:12px; color:var(--gray);">${dateStr}</span></td>
            </tr>
        `;
    }).join('');
}

window.changeOrderStatus = async function (orderId, newStatus) {
    try {
        await API.updateOrderStatus(orderId, newStatus);
        showAdminToast(`Order status updated to ${newStatus}`);
        loadAdminOrders();
    } catch (err) {
        alert('Failed to update status: ' + err.message);
    }
};

// 6. Update Stats Counters
function updateStats() {
    const totalSales = allAdminOrders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
    const lowStockCount = allAdminProducts.filter(p => p.countInStock <= 5).length;

    document.getElementById('statSales').textContent = `PKR ${totalSales.toLocaleString()}`;
    document.getElementById('statOrders').textContent = allAdminOrders.length;
    document.getElementById('statProducts').textContent = allAdminProducts.length;
    document.getElementById('statLowStock').textContent = lowStockCount;
}

function showAdminToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: '#1E1718',
        color: '#fff',
        padding: '14px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        zIndex: '9999',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
