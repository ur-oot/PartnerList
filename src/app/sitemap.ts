import { MetadataRoute } from "next";
import { getAllCompanies } from "@/lib/companies";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getAllCompanies();

  const companyRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${SITE_URL}/companies/${company.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...companyRoutes,
  ];
}
