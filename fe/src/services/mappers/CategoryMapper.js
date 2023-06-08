class CategoryMapper {
  toPersistance(domainCategory) {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    };
  }

  toDomain(persistanceCategory) {
    return {
      id: persistanceCategory.id,
      name: persistanceCategory.name,
    };
  }
}

export default new CategoryMapper();
