class RecipeAPI {
    constructor() {
        this.offset = 0;
    }

    async searchRecipes(query = '', cuisine = '', diet = '') {
        try {
            const params = new URLSearchParams({
                apiKey: config.API_KEY,
                number: config.RESULTS_PER_PAGE,
                offset: this.offset,
                addRecipeInformation: true
            });

            if (query) params.append('query', query);
            if (cuisine) params.append('cuisine', cuisine);
            if (diet) params.append('diet', diet);

            const response = await fetch(`${config.API_BASE_URL}/complexSearch?${params}`);
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to fetch recipes');

            return data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    }

    async getRecipeDetails(id) {
        try {
            const params = new URLSearchParams({
                apiKey: config.API_KEY
            });

            const response = await fetch(`${config.API_BASE_URL}/${id}/information?${params}`);
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to fetch recipe details');

            return data;
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            throw error;
        }
    }

    resetOffset() {
        this.offset = 0;
    }

    incrementOffset() {
        this.offset += config.RESULTS_PER_PAGE;
    }
}