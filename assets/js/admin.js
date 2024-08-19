document.addEventListener('DOMContentLoaded', function() {
    const catalogDisplay = document.getElementById('catalog-display');
    const viewCatalogBtn = document.getElementById('viewCatalogBtn');
    const addEntryForm = document.getElementById('add-entry-form');
    const editEntryForm = document.getElementById('edit-entry-form');
    const searchEntryBtn = document.getElementById('searchEntry');
    let catalogData = [];

    // Load existing catalog entries
    fetch('../catalog.json')
        .then(response => response.json())
        .then(data => {
            catalogData = data;
        });

    // Function to display catalog items
    function displayCatalog() {
        catalogDisplay.innerHTML = ''; // Clear previous content
        if (catalogData.length === 0) {
            catalogDisplay.innerHTML = '<p>No catalog entries found.</p>';
        } else {
            catalogData.forEach((entry) => {
                const listItem = document.createElement('div');
                listItem.className = 'catalog-item';
                listItem.innerHTML = `
                    <strong>ID:</strong> ${entry.id}<br>
                    <strong>Name:</strong> ${entry.name}<br>
                    <strong>Content:</strong> ${entry.content}<br>
                    <strong>Tags:</strong> ${entry.tags.join(', ')}<br>
                    <strong>References:</strong> ${entry.reference.join(', ')}<br>
                    <hr>
                `;
                catalogDisplay.appendChild(listItem);
            });
        }
    }

    // Trigger displayCatalog when button is clicked
    viewCatalogBtn.addEventListener('click', displayCatalog);

    // Trigger displayCatalog when Enter key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.target.matches('input, textarea')) {
            displayCatalog();
            event.preventDefault(); // Prevent form submission if inside a form
        }
    });

    // Search for an entry by ID and populate the form
    searchEntryBtn.addEventListener('click', function() {
        const searchId = document.getElementById('editEntryId').value.trim();
        const entry = catalogData.find(item => item.id === searchId);

        if (entry) {
            document.getElementById('editEntryId').value = entry.id;
            document.getElementById('editEntryName').value = entry.name;
            document.getElementById('editEntryContent').value = entry.content;
            document.getElementById('editEntryTags').value = entry.tags.join(', ');
            document.getElementById('editEntryReferences').value = entry.reference.join(', ');

            // Lock the ID field and change its color to red
            document.getElementById('editEntryId').setAttribute('readonly', true);
            document.getElementById('editEntryId').style.color = 'red';
        } else {
            alert('No entry found with the provided ID.');
        }
    });

    // Add a new catalog entry
    addEntryForm.onsubmit = function(e) {
        e.preventDefault();
        const newEntry = {
            id: document.getElementById('entryId').value,
            name: document.getElementById('entryName').value,
            content: document.getElementById('entryContent').value,
            tags: document.getElementById('entryTags').value.split(',').map(tag => tag.trim()),
            reference: document.getElementById('entryReferences').value.split(',').map(ref => ref.trim())
        };
        catalogData.push(newEntry);
        updateCatalogFile();
    };

    // Save changes to an existing entry
    editEntryForm.onsubmit = function(e) {
        e.preventDefault();
        const searchId = document.getElementById('editEntryId').value;
        const index = catalogData.findIndex(item => item.id === searchId);

        if (index !== -1) {
            catalogData[index] = {
                id: searchId, // ID remains unchanged
                name: document.getElementById('editEntryName').value,
                content: document.getElementById('editEntryContent').value,
                tags: document.getElementById('editEntryTags').value.split(',').map(tag => tag.trim()),
                reference: document.getElementById('editEntryReferences').value.split(',').map(ref => ref.trim())
            };
            updateCatalogFile();
        } else {
            alert('No entry found with the provided ID.');
        }
    };

    // Delete a catalog entry
    document.getElementById('deleteEntry').onclick = function() {
        const searchId = document.getElementById('editEntryId').value;
        const index = catalogData.findIndex(item => item.id === searchId);

        if (index !== -1) {
            catalogData.splice(index, 1);
            updateCatalogFile();
            clearEditForm();
        } else {
            alert('No entry found with the provided ID.');
        }
    };

    // Update the catalog.json file (simulated here)
    function updateCatalogFile() {
        console.log('Catalog updated:', JSON.stringify(catalogData, null, 2));
        displayCatalog();
        clearForms();
        // In a real-world scenario, you would send this data to the server for saving
        // For example, using a POST request to an API endpoint
    }

    // Clear the add entry form after submission
    function clearForms() {
        addEntryForm.reset();
    }

    // Clear the edit entry form after deletion
    function clearEditForm() {
        editEntryForm.reset();
        document.getElementById('editEntryId').removeAttribute('readonly');
        document.getElementById('editEntryId').style.color = '';
    }
});
