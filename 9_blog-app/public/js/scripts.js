// Simple Blog App JavaScript

// Storage helpers
const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const getUser = () => JSON.parse(localStorage.getItem('user') || 'null');
const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

// Clear user data
function logout() {
    localStorage.clear();
    alert('Logged out!');
    window.location.href = '/';
}

// API calls
async function apiCall(url, data = null) {
    const token = getToken();
    const options = {
        method: data ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    if (token) options.headers.Authorization = `Bearer ${token}`;
    if (data) options.body = JSON.stringify(data);

    const response = await fetch('/api' + url, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message);
    return result;
}

// Update navigation
function updateNav() {
    const user = getUser();
    const isLoggedIn = !!user;

    document.getElementById('login-nav').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('register-nav').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('dashboard-nav').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('logout-nav').style.display = isLoggedIn ? 'block' : 'none';

    const userDisplay = document.getElementById('username-display');
    if (userDisplay && user) userDisplay.textContent = user.username;
}

// Handle forms
async function handleAuth(isLogin = true) {
    const form = document.getElementById(isLogin ? 'login-form' : 'register-form');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        try {
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            if (!isLogin) data.username = formData.get('username');

            const response = await apiCall(`/users/${isLogin ? 'login' : 'register'}`, data);

            setToken(response.token);
            setUser(response.user);
            updateNav();
            alert(`${isLogin ? 'Login' : 'Registration'} successful!`);
            window.location.href = '/dashboard';
        } catch (error) {
            alert(error.message);
        }
    };
}

// Load posts
async function loadPosts(container, url, template) {
    const element = document.getElementById(container);
    if (!element) return;

    try {
        const response = await apiCall(url);
        const posts = response.posts || response;

        element.innerHTML = posts.length === 0 ? '<p>No posts found.</p>' :
            posts.map(post => template(post)).join('');
    } catch (error) {
        element.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
}

// Post templates
const postCard = (post) => `
    <div class="card mb-3">
        <div class="card-body">
            <h5>${post.title}</h5>
            <p>${post.content.slice(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
            <small class="text-muted">By ${post.author.username} • ${new Date(post.createdAt).toLocaleDateString()}</small><br>
            <a href="/post/${post._id}" class="btn btn-primary btn-sm mt-2">Read More</a>
        </div>
    </div>
`;

const userPostCard = (post) => `
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5>${post.title}</h5>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="editPost('${post._id}')">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deletePost('${post._id}')">Delete</button>
                </div>
            </div>
            <p>${post.content.slice(0, 100)}...</p>
            <small class="text-muted">${new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
    </div>
`;

// Dashboard functions
async function createPost() {
    const form = document.getElementById('new-post-form');
    const formData = new FormData(form);

    try {
        await apiCall('/posts', {
            title: formData.get('title'),
            content: formData.get('content')
        });

        bootstrap.Modal.getInstance(document.getElementById('newPostModal')).hide();
        form.reset();
        loadPosts('user-posts', '/posts/user/posts', userPostCard);
        alert('Post created!');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function editPost(id) {
    try {
        const post = await apiCall('/posts/' + id);
        document.getElementById('edit-post-id').value = post._id;
        document.getElementById('edit-post-title').value = post.title;
        document.getElementById('edit-post-content').value = post.content;
        new bootstrap.Modal(document.getElementById('editPostModal')).show();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function updatePost() {
    const id = document.getElementById('edit-post-id').value;
    const form = document.getElementById('edit-post-form');
    const formData = new FormData(form);

    try {
        await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
            body: JSON.stringify({
                title: formData.get('title'),
                content: formData.get('content')
            })
        });

        bootstrap.Modal.getInstance(document.getElementById('editPostModal')).hide();
        loadPosts('user-posts', '/posts/user/posts', userPostCard);
        alert('Post updated!');
    } catch (error) {
        alert('Error updating post');
    }
}

async function deletePost(id) {
    if (!confirm('Delete this post?')) return;

    try {
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        loadPosts('user-posts', '/posts/user/posts', userPostCard);
        alert('Post deleted!');
    } catch (error) {
        alert('Error deleting post');
    }
}

// Load single post
async function loadSinglePost(id) {
    const container = document.getElementById('post-content');
    if (!container) return;

    try {
        const post = await apiCall('/posts/' + id);
        container.innerHTML = `
            <h1>${post.title}</h1>
            <small class="text-muted">By ${post.author.username} • ${new Date(post.createdAt).toLocaleDateString()}</small>
            <div class="mt-4">${post.content.replace(/\n/g, '<br>')}</div>
        `;
    } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
}

// Load user profile
async function loadProfile() {
    const container = document.getElementById('user-profile');
    if (!container) return;

    try {
        const user = await apiCall('/users/profile');
        container.innerHTML = `
            <h6>${user.username}</h6>
            <p class="text-muted">${user.email}</p>
            <small>Member since ${new Date(user.createdAt).toLocaleDateString()}</small>
        `;
    } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Error loading profile</div>`;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    // Setup authentication
    handleAuth(true);  // login
    handleAuth(false); // register

    // Setup logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.onclick = logout;

    // Setup dashboard buttons
    const saveBtn = document.getElementById('save-post');
    const updateBtn = document.getElementById('update-post');
    if (saveBtn) saveBtn.onclick = createPost;
    if (updateBtn) updateBtn.onclick = updatePost;

    // Load page content
    if (path === '/' || path === '/index') {
        loadPosts('latest-posts', '/posts?limit=5', postCard);
    } else if (path === '/posts') {
        loadPosts('all-posts', '/posts?limit=20', postCard);
    } else if (path === '/dashboard') {
        loadProfile();
        loadPosts('user-posts', '/posts/user/posts', userPostCard);
    } else if (path.startsWith('/post/')) {
        loadSinglePost(path.split('/')[2]);
    }

    // Update navigation
    updateNav();
});
