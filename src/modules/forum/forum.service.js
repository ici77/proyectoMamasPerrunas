const prisma = require('../../lib/prisma');

async function getCategories() {
  const categories = await prisma.forumCategory.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      nombre: true,
      slug: true,
      descripcion: true,
      sortOrder: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      sortOrder: 'asc',
    },
  });

  return categories.map((category) => ({
    ...category,
    id: category.id.toString(),
  }));
}

module.exports = {
  getCategories,
};