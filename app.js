// Login Authentication
const correctUsername = 'kay@tendaonline.co.za';
const correctPassword = 'K@y5clients';

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        localStorage.setItem('loggedIn', true); 

// Store login status in localStorage
        window.location.href = "index.html"; // Redirect to the main page
    } else {
        alert("Incorrect login details!");
    }
});

// Logout functionality
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = "login.html"; // Redirect back to the login page
}

// Hamburger menu toggle
document.getElementById('hamburger-icon').addEventListener('click', function() {
    const menu = document.getElementById('dropdown-menu');

    menu.classList.toggle('show'); // Toggle visibility of the dropdown menu
});

// Close the menu when clicking anywhere outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdown-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (!menu.contains(event.target) && !hamburgerIcon.contains(event.target)) {
        menu.classList.remove('show'); // Hide the menu if clicked outside
    }
});


// Save client details
document.getElementById('save-button').addEventListener('click', function() {
    const name = document.getElementById('client-name').value;
    const surname = document.getElementById('client-surname').value;
    const contact = document.getElementById('client-contact').value;
    const email = document.getElementById('client-email').value;
    const membershipNumber = document.getElementById('client-membership').value;
    const medicalAid = 

document.getElementById('client-medical').value;
    const comments = document.getElementById('client-comments').value;
    const leadStatus = document.getElementById('lead-status').value;
    const leadType = document.getElementById('lead-type').value;

    const clientData = {
        name: name,
        surname: surname,
        contact: contact,
        email: email,
        membershipNumber: membershipNumber,
        medicalAid: medicalAid,
        comments: comments,

        leadStatus: leadStatus,
        leadType: leadType,
        timestamp: new Date().toLocaleString() // Add time and date
    };

    let clients = JSON.parse(localStorage.getItem('clients')) || []; // Get stored clients or initialize an empty array
    clients.push(clientData); // Add the new client to the array

    localStorage.setItem('clients', JSON.stringify(clients)); // Save to local storage

    alert("Client details saved successfully!");
});

// Display saved client leads in "My Leads"
function loadMyLeads() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const leadsList = document.getElementById('my-leads-list');
    leadsList.innerHTML = ''; // Clear the current list

    clients.forEach(client => {
        const clientElement = document.createElement('div');
        clientElement.classList.add('client-item');
        clientElement.innerHTML = `
            <h3>${client.name} ${client.surname}</h3>
            <p>Email: ${client.email}</p>
            <p>Contact: ${client.contact}</p>
            <p>Lead Status: ${client.leadStatus}

</p>
            <p>Lead Type: ${client.leadType}</p>
            <p>Timestamp: ${client.timestamp}</p>
            <button onclick="editClient(${clients.indexOf(client)})">Edit</button>
        `;
        leadsList.appendChild(clientElement);
    });
}

// Edit client details
function editClient(index) {
    const clients = JSON.parse(localStorage.getItem('clients'));
    const client = clients[index];

    document.getElementById('client-name').value = client.name;

    document.getElementById('client-surname').value = client.surname;
    document.getElementById('client-contact').value = client.contact;
    document.getElementById('client-email').value = client.email;
    document.getElementById('client-membership').value = client.membershipNumber;
    document.getElementById('client-medical').value = client.medicalAid;
    document.getElementById('client-comments').value = client.comments;
    document.getElementById('lead-status').value = client.leadStatus;
    document.getElementById('lead-type').value = client.leadType;

    // Change save button text to "Update" when editing
    const saveButton = 

document.getElementById('save-button');
    saveButton.textContent = "Update";
    saveButton.setAttribute('onclick', `updateClient(${index})`);
}

// Update client details
function updateClient(index) {
    const clients = JSON.parse(localStorage.getItem('clients'));
    const client = clients[index];

    client.name = document.getElementById('client-name').value;
    client.surname = document.getElementById('client-surname').value;
    client.contact = document.getElementById('client-

contact').value;
    client.email = document.getElementById('client-email').value;
    client.membershipNumber = document.getElementById('client-membership').value;
    client.medicalAid = document.getElementById('client-medical').value;
    client.comments = document.getElementById('client-comments').value;
    client.leadStatus = document.getElementById('lead-status').value;
    client.leadType = document.getElementById('lead-type').value;

    clients[index] = client; // Update the client

    localStorage.setItem('clients', JSON.stringify(clients)); // Save to local storage

    alert("Client details updated successfully!");
    loadMyLeads(); // Refresh the list
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = "login.html"; // Redirect to login page if not logged in
    } else {
        loadMyLeads(); // Load the list of saved leads
    }
});
