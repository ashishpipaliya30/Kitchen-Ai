document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const message = document.getElementById('message');
    const getRecipeButton = document.getElementById('getRecipeButton');
    const ingredientList = document.getElementById('ingredientList');

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
                analyzeImage(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to analyze image using TensorFlow.js and COCO-SSD model
    async function analyzeImage(imgElement) {
        const model = await cocoSsd.load();
        const predictions = await model.detect(imgElement);

        // Check if an open fridge is detected based on certain criteria
        const fridgeDetected = checkForFridge(predictions);

        if (fridgeDetected) {
            message.innerText = 'Great!';
            const ingredients = extractIngredients(predictions);
            displayIngredients(ingredients);
        } else {
            message.innerText = 'Please upload your "Open Fridge Image".';
        }
    }

    // Function to check for fridge based on detection results
    function checkForFridge(predictions) {
        // Example criteria for detecting a fridge (this logic can be adjusted)
        const fridgeClasses = ['refrigerator', 'oven', 'microwave']; // Modify as per available classes
        return predictions.some(prediction => fridgeClasses.includes(prediction.class) && prediction.score > 0.5);
    }

    // Function to extract ingredients based on detection results
    function extractIngredients(predictions) {
        // Example criteria for extracting ingredients
        const ingredientClasses = ['bottle', 'can', 'apple', 'banana', 'orange', 'carrot', 'milk', 'egg']; // Modify as per available classes
        return predictions
            .filter(prediction => ingredientClasses.includes(prediction.class) && prediction.score > 0.5)
            .map(prediction => prediction.class);
    }

    // Function to display detected ingredients
    function displayIngredients(ingredients) {
        ingredientList.innerHTML = '';
        ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.textContent = ingredient;
            ingredientList.appendChild(listItem);
        });
        getRecipeButton.classList.remove('hidden');
    }
});
