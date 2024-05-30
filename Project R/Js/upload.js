document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image Preview">`;
            // Show the "Get Your Recipe" button
            document.getElementById('getRecipeButton').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

// Add a click event listener to the "Get Your Recipe" button
document.getElementById('getRecipeButton').addEventListener('click', function() {
    alert('Here is your recipe!');
    // You can replace the alert with any function you want to execute
});
