import {Suspense} from "react";
import DomesticFundSearch from "@/app/domestic-fund/query/search";
import DomesticFundSearchResults from "@/app/domestic-fund/query/search-result";


export default function DomesticFundQuery({searchParams}:{
  searchParams?: {
    query?: string;
    page?: string;
};
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;


  return (
    <div>
      <div className="flex justify-center">
        <div className="min-w-5">
          <div className="mt-2 justify-center w-[500px] min-h-[100px]">
            <DomesticFundSearch />
          </div>
          <Suspense key={query + currentPage}>
            <DomesticFundSearchResults query={query} currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
