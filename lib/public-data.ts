import prisma from "@/lib/db";

export async function getSiteSettings() {
  const rows = await prisma.siteSetting.findMany();
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

export async function getPublishedCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    include: {
      features: { orderBy: { sortOrder: "asc" } },
      packages: { where: { isPublished: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedBookingServices() {
  return prisma.testBookingService.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } });
}

export async function getPublishedCountries() {
  return prisma.country.findMany({
    where: { isPublished: true },
    include: { sections: { where: { isPublished: true }, orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
}
