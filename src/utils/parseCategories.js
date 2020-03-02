module.exports = {
  parseCategories: categories => {
    if (!categories) {
      return [];
    }

    return categories.split(",").map(category => category.trim());
  }
};
