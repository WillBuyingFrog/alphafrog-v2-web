"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { searchDomesticFund } from "@/lib/engine/domestic/index/index-info";

interface SearchResult {
  ts_code: string;
  name: string;
  market: string;
}

export default async function DomesticFundSearchResults({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const searchResults = await searchDomesticFund(query, currentPage);
  console.log(searchResults);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableColumn>基金代码</TableColumn>
          <TableColumn>基金名称</TableColumn>
        </TableHeader>
        <TableBody>
          {searchResults.length > 0 && searchResults.map((item: SearchResult, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.ts_code}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
