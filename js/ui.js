class UI {
    constructor() {
        this.recipeGrid = document.getElementById('recipeGrid');
        this.loadingEl = document.getElementById('loading');
        this.loadMoreBtn = document.getElementById('loadMore');
        this.modal = document.getElementById('recipeModal');
        this.modalContent = document.getElementById('modalContent');
    }

    displayRecipes(recipes, append = false) {
        if (!append) this.recipeGrid.innerHTML = '';

        recipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe);
            this.recipeGrid.appendChild(card);
        });
    }

    createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-info">
                    <span>Ready in ${recipe.readyInMinutes} mins</span>
                    <span>${recipe.servings} servings</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.diets.slice(0, 3).map(diet => 
                        `<span class="tag">${diet}</span>`
                    ).join('')}
                </div>
                <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>
            </div>
        `;

        return card;
    }

    async displayRecipeModal(recipe) {
        this.modalContent.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; margin: 1rem 0;">
            <div class="recipe-details">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.extendedIngredients.map(ing => 
                        `<li>${ing.original}</li>`
                    ).join('')}
                </ul>
                <h3>Instructions:</h3>
                <ol>
                    ${recipe.analyzedInstructions[0]?.steps.map(step => 
                        `<li>${step.step}</li>`
                    ).join('') || 'No instructions available.'}
                </ol>
            </div>
        `;
        this.modal.classList.remove('hidden');
    }

    showLoading() {
        this.loadingEl.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingEl.classList.add('hidden');
    }

    showLoadMore() {
        this.loadMoreBtn.classList.remove('hidden');
    }

    hideLoadMore() {
        this.loadMoreBtn.classList.add('hidden');
    }

    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert';
        alert.textContent = message;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
}