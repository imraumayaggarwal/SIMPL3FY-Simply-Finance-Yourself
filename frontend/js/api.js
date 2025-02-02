// Function to register a new user
async function registerUser(name, email, password) {
    console.log("Sending registration request..."); // Debugging message
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    console.log('Registration Response:', data); // Debugging message
    return data;
}

// Function to log in an existing user
async function loginUser(email, password) {
    console.log("Sending login request..."); // Debugging message
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('Login Response:', data); // Debugging message
    return data;
}

// Handle the registration form
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const result = await registerUser(name, email, password);

            if (result.message === 'User registered successfully!') {
                alert(result.message);
                window.location.href = 'login.html'; // Redirect after successful registration
            } else {
                alert(result.message); // Show error message
            }
        });
    } 

    // Handle the login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const result = await loginUser(email, password);

            if (result.message === 'Login successful') {
                alert(result.message);
                localStorage.setItem('token', result.token); // Store token in localStorage
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                alert(result.message); // Show error message
            }
        });
    } 
});

// Function to set a new budget for the user
async function setBudget() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found. Please log in again.");
        return;
    }

    // Remove "Bearer " from the token if it exists
    const cleanedToken = token.replace(/^Bearer\s/, '');

    if (!category || !amount || amount <= 0) {
        alert('Please provide a valid category and amount.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/budget/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cleanedToken // Send the token without 'Bearer' prefix
            },
            body: JSON.stringify({
                category,
                amount,
                userId
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Budget set successfully!');
            getBudget();  // Refresh the budget table
        } else {
            alert(data.message || 'Error setting budget');
        }
    } catch (error) {
        console.error('Error setting budget:', error);
        alert('Failed to set budget.');
    }
}

//  function to get a budget
async function getBudget() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found. Please log in again.");
        return;
    }

    const cleanedToken = token.replace(/^Bearer\s/, '');
    try {
        const response = await fetch('http://localhost:5000/api/budget', {
            method: 'GET',
            headers: {
                'Authorization': cleanedToken
            }
        });
        const data = await response.json();
        if (response.ok) {
            if (data.budgets.length === 0) {
                alert("No budgets found for this user.");
            } else {
                populateBudgetTable(data.budgets);
            }
        } else {
            alert(data.message || 'Error fetching budgets');
        }
    } catch (error) {
        console.error('Error fetching budgets:', error);
        alert('Failed to fetch budgets.');
    }
}


// Populate the budget table with fetched data
function populateBudgetTable(budgets) {
    const table = document.getElementById('budget-table');
    table.innerHTML = `
        <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
        </tr>`;

    budgets.forEach(budget => {
        const row = table.insertRow();
        row.setAttribute('id', budget._id);  // Assigning _id to row for reference
        row.setAttribute('data-category', budget.category);  // Store category in data-category

        row.innerHTML = `
            <td>${budget.category}</td>
            <td>${budget.amount}</td>
            <td>
                <button class="delete-btn" onclick="deleteBudget('${budget._id}')">Delete</button>
            </td>
        `;
    });
}

// Function to delete a budget for the user
async function deleteBudget(budgetId) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found. Please log in again.");
        return;
    }

    // Remove "Bearer " from the token if it exists
    const cleanedToken = token.replace(/^Bearer\s/, '');
    try {
        // Instead of passing `category: budgetId`, we need to pass the category (from the table)
        const category = document.getElementById(budgetId).dataset.category;

        const response = await fetch('http://localhost:5000/api/budget/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cleanedToken // Send the token without 'Bearer' prefix
            },
            body: JSON.stringify({ category })  // Send the category in the request body
        });

        const data = await response.json();
        if (response.ok) {
            alert('Budget deleted successfully!');
            getBudget();  // Refresh the budget table after deletion
        } else {
            alert(data.message || 'Error deleting budget');
        }
    } catch (error) {
        console.error('Error deleting budget:', error);
        alert('Failed to delete budget.');
    }
}