import companiesRaw from "@/companies.json";
import { Company, CompanySchema } from "@/types/company";

// データを安全にパース
const companies: Company[] = companiesRaw.map((raw) => CompanySchema.parse(raw));

/**
 * 全パートナー企業を取得
 */
export async function getAllCompanies(): Promise<Company[]> {
  return companies;
}

/**
 * ID でパートナー企業を取得
 */
export async function getCompanyById(id: number): Promise<Company | undefined> {
  return companies.find((c) => c.id === id);
}

/**
 * 重複のないカテゴリ（サポートメニュー）一覧を取得
 */
export function getCategories(companyList: Company[]): string[] {
  const set = new Set<string>();
  companyList.forEach((c) => {
    if (c.category) set.add(c.category);
  });
  return Array.from(set);
}

/**
 * 重複のない業種一覧を取得
 */
export function getIndustries(companyList: Company[]): string[] {
  const set = new Set<string>();
  companyList.forEach((c) => {
    if (c.industries) set.add(c.industries);
  });
  return Array.from(set);
}
