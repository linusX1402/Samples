generateAllrecipes();

function generateAllrecipes() {

    fetch('http://localhost:3000/getAllPosts')
        .then(response => response.json())
        .then(recipes => {
            console.log(recipes);
            document.querySelector(".feed").innerHTML = generatePostsHtml(recipes);
        })
        .catch(err => console.log(err));
}

function generatePostsHtml(recipes) {
    let recipesHTML = "";

    for (let i = 0; i < recipes.posts.length; i++) {
        let recipe = recipes.posts[i];
        let tagsHTML = "";
        for (let j = 0; j < recipe.tags.length; j++) {
            tagsHTML += `#${recipe.tags[j]} `;
        }
        let ingredientsHTML = "";
        for (let j = 0; j < recipe.ingredients.length; j++) {
            ingredientsHTML += `${recipe.ingredients[j]}`;
            if (j < recipe.ingredients.length - 1) {
                ingredientsHTML += ` | `;
            }
        } //TODO: Add rating mechanic
          //TODO: Add image upload instead of URL input

        //TODO: image upload function
        /*var loadFile = function(event) {
            var image = document.getElementById('postImage'+recipe.id);
            image.style.backgroundImage = url();//event.target.files[0]; //image.src = URL.createObjectURL(event.target.files[0]);
        };*/

        let recipeHTML = `<div class="postCard" onclick="detailView(this, ${recipe.id})">
            <div class="postImage" id="postImage${recipe.id}" style="background-image: url(./img/data/${recipe.imgLink}.jpg);"></div>

            <div class="postContent">
                <h1 class="postTitle">${recipe.title}</h1>
                <div class="interaction-heading">
                <div class="postRating">
                    <img src="img/CheffsHatGood.png">
                    <img src="img/CheffsHatGood.png">
                    <img src="img/CheffsHatGood.png">
                    <img src="img/CheffsHatGood.png">
                    <img src="img/CheffsHatGood.png">
                </div>
                    <img class="postBookmark" id="false" src="img/icons/bookmark.svg" onclick="changePostSavestate(this)" onmouseenter="changePostSavestate(this)" onmouseleave="changePostSavestate(this)">
                </div>
                <p class="postDescription">${recipe.description}</p>
                <h2>Ingredients:</h2>
                <p class="postIngredients">${ingredientsHTML}</p>
                <div class="postPreparation"></div>
                <div class="postFooter">
                   <p class="postDate">${recipe.date}</p>
                    <p class="postTags">${tagsHTML}</p>
                </div>
            </div>
            </div>
        `;
        console.log(recipeHTML);
        recipesHTML += recipeHTML;
    }

    return recipesHTML;
}

function detailView(postCard, recipeId) {
//<p className="postPreparation">${recipe.preparation}</p>
    postCard.classList.add("detailView");

    fetch('http://localhost:3000/getPost/' + recipeId)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            postCard.setAttribute('onclick', 'closeDetailView(this, ' + recipeId + ')');
            let preparation = postCard.querySelector(".postPreparation");
            preparation.innerHTML += "<h2>How to Cook:</h2>";
            preparation.innerHTML += '<div>' + data.preparation + '</div>';
        })
        .catch(err => console.log(err));

}

function closeDetailView(postCard, recipeId) {
    console.log('closeDetailView');
    postCard.classList.remove("detailView")
    postCard.setAttribute('onclick', 'detailView(this, ' + recipeId + ')');
    postCard.querySelector(".postPreparation").innerHTML = "";
}

function addPost() {
    let recipe = {
        "title": document.querySelector("#title").value,
        "imgLink": document.querySelector("#imgLink").value,
        "date": new Date().toISOString().slice(0, 10),
        "ingredients": document.querySelector("#ingredients").value.split(","),
        "tags": document.querySelector("#tags").value.split(","),
        "description": document.querySelector("#description").value,
        "preparation": document.querySelector("#preparation").value,
    }
    console.log(recipe);

    fetch('http://localhost:3000/addPost', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(recipe)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            generateAllrecipes();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function changePostSavestate(bookmark) {
    if (bookmark.id === 'false') {
        bookmark.src = "img/i" + "cons/bookmark-saved.svg"
        bookmark.id = 'true'
    } else if (bookmark.id === 'true') {
        bookmark.src = "img/icons/bookmark.svg"
        bookmark.id = 'false'
    }
}


// HTML FORMAT OF recipe
//                     <div class="postImage"></div>
//                     <div class="postContent">
//                         <h1 class="postTitle">Tasty Tomato Pasta</h1>
//                         <div class="postRating">
//                             <img src="img/CheffsHatGood.png">
//                             <img src="img/CheffsHatGood.png">
//                             <img src="img/CheffsHatGood.png">
//                             <img src="img/CheffsHatGood.png">
//                             <img src="img/CheffsHatGood.png">
//                         </div>
//                         <p class="postDescription">Easy to make, delicious noodles.</p>
//                         <h2>Ingredients:</h2>
//                         <p class="postIngredients">Noodles | Tomatosauce | Water</p>
//                         <p class="postPreparation">Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, iusto blanditiis? Nisi ab sapiente, minus aperiam est amet! Vitae architecto enim modi accusantium quaerat exercitationem provident rerum dolor ratione tempora.</p>
//                         <div class="postFooter">
//                             <p class="postTags">#Easy, #Noodles, #Yummy</p>
//                             <p class="postDate">Posted on: 2024-01-04</p>
//                             <img class="postUserIcon" src="../Kilogram/Assets/Images/default_profile_icon.png">
//                             <p class="postUserName">SuperUser146</p>
//                         </div>
//                     </div>


// JSON FORMAT OF recipe
// {
//     "posts" : [
//         {
//             "id": "1",
//             "title": "Tasty Tomato Pasta",
//             "imgLink": "#",
//             "date": "2024-01-04",
//             "ingredients": ["Noodles", "Tomatosauce", "Water"],
//             "tags": ["Easy", "Noodles", "Yummy"],
//             "description": "Easy to make, delicious noodles.",
//             "preparation": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae facilis illo placeat voluptatum illum? Maiores assumenda quia reprehenderit iusto enim ratione animi, laudantium, cum officiis laboriosam debitis illo, nemo ipsum!"
//         }
//     ]
// }