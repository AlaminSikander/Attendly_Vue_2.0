// middleware.js

export function checkTokenExists(to, from, next) {
    const token = localStorage.getItem('token'); // Replace 'your_token_key_here' with the actual key you use to store the token

    if (!token) {
        // Redirect to a login page or any other route if the token doesn't exist
        next('/auth/login'); // Change '/login' to your actual login route
    } else {
        // Token exists, proceed to the requested route
        next();
    }
}
