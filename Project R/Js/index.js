function validation(){
    if(document.Formfill.Username.value==""){
        document.getElementById("result").innerHTML="Enter Username*";
        return false;
    }
    else if(document.Formfill.Email.value==""){
        document.getElementById("result").innerHTML="Enter your Email";
        return false;
    }
    else if(document.Formfill.Password.value==""){
        document.getElementById("result").innerHTML="Enter your Password";
        return false;
    }
    else if(document.Formfill.Password.value.length<6){
        document.getElementById("result").innerHTML="Password must be 6-digits";
        return false;
    }
    else if(document.Formfill.CPassword.value==""){
        document.getElementById("result").innerHTML="Enter Confirm Password";
        return false;
    }
    else if(document.Formfill.Password.value !== document.Formfill.CPassword.value){
        document.getElementById("result").innerHTML="Password does'nt matched";
        return false;
    }

    else if(document.Formfill.Password.value == document.Formfill.CPassword.value){
        popup.classList.add("open-slide")
        return false;
    }
}

var popup=document.getElementById('popup');
function CloseSlide(){
    popup.classList.remove('open-slide')
}

// app.js
document.getElementById('imageUpload').addEventListener('change', (event) => {
    const image = document.getElementById('image');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = () => detectObjects(image);
});

async function detectObjects(image) {
    const model = await cocoSsd.load();
    const predictions = await model.detect(image);

    const results = document.getElementById('results');
    results.innerHTML = '';
    predictions.forEach(prediction => {
        const p = document.createElement('p');
        p.innerText = `${prediction.class} - ${prediction.score.toFixed(2)}`;
        results.appendChild(p);
    });

    // Generate recipes based on detected items
    const ingredients = predictions.map(prediction => prediction.class);
    generateRecipes(ingredients);
}

async function generateRecipes(ingredients) {
    const apiKey = 'your_spoonacular_api_key';
    const query = ingredients.join(',');
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=5&apiKey=${apiKey}`);
    const recipes = await response.json();

    const results = document.getElementById('results');
    recipes.forEach(recipe => {
        const p = document.createElement('p');
        p.innerHTML = `<a href="${recipe.sourceUrl}">${recipe.title}</a>`;
        results.appendChild(p);
    });
}
