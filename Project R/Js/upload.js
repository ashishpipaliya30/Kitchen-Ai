document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const message = document.getElementById('message');
    const getRecipeButton = document.getElementById('getRecipeButton');
    const ingredientList = document.getElementById('ingredientList');
    let itemsInFridge = [];

    // Function to display image preview
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
                message.innerText = 'Analyzing image...';
                getRecipeButton.classList.add('hidden');
                ingredientList.innerHTML = '';
                analyzeFridgeContents(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to analyze fridge contents using TensorFlow.js and EfficientDet model
    async function analyzeFridgeContents(imgElement) {
        const cocoModel = await cocoSsd.load();

        // Perform object detection using COCO-SSD
        const cocoPredictions = await cocoModel.detect(imgElement);

        // Check if an open fridge is detected based on certain criteria
        const fridgeDetected = checkForFridge(cocoPredictions);

        if (fridgeDetected) {
            message.innerText = 'Great!';
            itemsInFridge = extractItemsInFridge(cocoPredictions);
            displayItemsInFridge(itemsInFridge);
            getRecipeButton.classList.remove('hidden');
            getRecipeButton.addEventListener('click', fetchRecipe);
        } else {
            message.innerText = 'Please upload an "Open Fridge Image".';
        }
    }

    // Function to check for fridge based on detection results
    function checkForFridge(predictions) {
        // Example criteria for detecting a fridge (this logic can be adjusted)
        const fridgeClasses = ['refrigerator', 'fridge'];
        return predictions.some(prediction => fridgeClasses.includes(prediction.class) && prediction.score > 0.5);
    }

    // Function to extract items inside the fridge based on detection results
    function extractItemsInFridge(predictions) {
        // Filter out items detected inside the fridge excluding generic labels like "refrigerator"
        const fridgeItems = predictions.filter(prediction => prediction.score > 0.5 && prediction.class !== 'refrigerator' && prediction.class !== 'fridge');
        return fridgeItems.map(prediction => prediction.class);
    }

    // Function to display detected items inside the fridge
    function displayItemsInFridge(itemsInFridge) {
        const uniqueItems = [...new Set(itemsInFridge)]; // Remove duplicate items
        ingredientList.innerHTML = '';
        uniqueItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            ingredientList.appendChild(listItem);
        });
    }

    // Function to fetch recipe
    function fetchRecipe() {
        const items = itemsInFridge.join(',');
        // Redirect to the recipe page with the list of items as a query parameter
        window.location.href = `recipe.html?items=${encodeURIComponent(items)}`;
    }
});
