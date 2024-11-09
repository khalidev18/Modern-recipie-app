class App {
    constructor() {
        this.api = new RecipeAPI();
        this.ui = new UI();
        this.currentQuery = '';
        this.currentCuisine = '';
        this.currentDiet = '';

        this.init();
    }

    init() {
        // Event listeners
        document.getElementById('searchButton').addEventListener('click', () => this.handleSearch());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        document.getElementById('cuisineFilter').addEventListener('change', (e) => {
            this.currentCuisine = e.target.value;
            this.handleSearch();
        });
        
        document.getElementById('dietFilter').addEventListener('change', (e) => {
            this.currentDiet = e.target.value;
            this.handleSearch();
        });

        document.getElementById('loadMore').addEventListener('click', () => this.loadMore());

        document.getElementById('recipeGrid').addEventListener('click', (e) => {
            if (e.target.classList.contains('view-recipe')) {
                this.handleRecipeClick(e.target.dataset.id);
            }
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('recipeModal').classList.add('hidden');
        });

        // Initial load
        this.loadRecipes();
    }

    async handleSearch() {
        this.currentQuery = document.getElementById('searchInput').value;
        this.api.resetOffset();
        await this.loadRecipes();
    }

    async loadRecipes() {
        try {
            this.ui.showLoading();
            this.ui.hideLoadMore();

            const data = await this.api.searchRecipes(
                this.currentQuery,
                this.currentCuisine,
                this.currentDiet
            );

            this.ui.displayRecipes(data.results);

            if (data.totalResults > this.api.offset + config.RESULTS_PER_PAGE) {
                this.ui.showLoadMore();
            }
        } catch (error) {
            this.ui.showError(error.message);
        } finally {
            this.ui.hideLoading();
        }
    }

    async loadMore() {
        try {
            this.api.incrementOffset();
            this.ui.showLoading();
            this.ui.hideLoadMore();

            const data = await this.api.searchRecipes(
                this.currentQuery,
                this.currentCuisine,
                this.currentDiet
            );

            this.ui.displayRecipes(data.results, true);

            if (data.totalResults > this.api.offset + config.RESULTS_PER_PAGE) {
                this.ui.showLoadMore();
            }
        } catch (error) {
            this.ui.showError(error.message);
        } finally {
            this.ui.hideLoading();
        }
    }

    async handleRecipeClick(id) {
        try {
            this.ui.showLoading();
            const recipe = await this.api.getRecipeDetails(id);
            await this.ui.displayRecipeModal(recipe);
        } catch (error) {
            this.ui.showError(error.message);
        } finally {
            this.ui.hideLoading();
        }
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});