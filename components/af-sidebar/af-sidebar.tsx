import { Link } from "@nextui-org/link";

interface SidebarItem {
  name: string;
  href: string;
  newWindow?: boolean;
}

interface AlphafrogSidebarProps {
  items: SidebarItem[];
}

export default function AlphaFrogSidebar({ items }: AlphafrogSidebarProps) {
  return (
    <div className="flex flex-col h-full w-64">
      <div className="flex flex-col flex-grow">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-16 text-foreground
             transition-all duration-500 ease-in-out
             hover:text-sky-500 hover:translate-x-[6px] cursor-pointer"
          >
            <Link href={item.href} isExternal={item.newWindow} underline="none">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
