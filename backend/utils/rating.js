// Utilidad simple para manejar ratings y promedios

function addRating(entity, score) {
    if (!entity.ratings) {
        entity.ratings = [];
    }

    entity.ratings.push(score);
    entity.averageRating = calculateAverage(entity.ratings);

    return entity;
}

function calculateAverage(ratings) {
    if (!ratings.length) return 0;

    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return Number((sum / ratings.length).toFixed(2));
}

module.exports = {
    addRating,
    calculateAverage
};
