document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';

    let valid = true;

    if (!validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email.';
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters.';
        valid = false;
    }

    if (valid) {
        loginUser(email, password);
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function loginUser(email, password) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            document.getElementById('resultMessage').innerText = 'Login successful!';
        } else {
            document.getElementById('resultMessage').innerText = 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        document.getElementById('resultMessage').innerText = 'Login failed. Please try again.';
        console.error('Error:', error);
    });
}
