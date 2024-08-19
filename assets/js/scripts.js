
function performSearch() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    fetch('../catalog.json')
        .then(response => response.json())
        .then(data => {
            let results = data.filter(item => 
                item.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );

            // Save results to sessionStorage for use in the search results page
            sessionStorage.setItem('searchResults', JSON.stringify(results));
            
            // Open the search results page
            window.open('search_results.html', '_blank');
        });

    document.getElementById('searchInput').value = '';  // Clear search box
}
