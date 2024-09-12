"use client";
import { Input } from "@nextui-org/input";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DomesticFundSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchDomesticFund = useDebouncedCallback(
    async (term: string) => {
      const params = new URLSearchParams(searchParams);

      if (term.length >= 2) {
        params.set("page", "1");
        params.set("query", term);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <div>
      <Input
        className="bg-white"
        defaultValue={searchParams.get("query")?.toString()}
        placeholder="输入基金代码、名称……"
        type="text"
        onChange={(e) => {
          handleSearchDomesticFund(e.target.value);
        }}
      />
    </div>
  );
}
