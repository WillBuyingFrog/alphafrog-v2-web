import { alphafrogDataInstance } from "@/axios/af-data-instance";

export async function searchDomesticFund(keyword: string, currentPage: number) {

  if (keyword.length < 2){
    return -2;
  }

  const response = await alphafrogDataInstance.get(
    "domestic/fund/search-fund-info",
    {
      params: {
        keyword: keyword,
        page: currentPage,
      },
    },
  );

  if (response.data.message === "success") {
    return response.data.data;
  } else {
    return -1;
  }
}
