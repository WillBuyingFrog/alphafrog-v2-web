import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import React from "react";

export default function AlphaFrogNavbar() {
  return (
    <div>
      <Navbar>
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/domestic-fund">
              公募基金
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              沪深指数
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/domestic-fund/accounting">
              投资记账
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
