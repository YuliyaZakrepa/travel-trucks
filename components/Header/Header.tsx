"use client";
import css from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link href="/" className={css.logo}>
          <Image
            className={css.image}
            src={logo}
            alt="TravelTrucks"
            width={136}
            height={16}
            priority
          />
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.listNavigation}>
            <li>
              <Link
                href="/"
                className={css.link}
                data-active={pathname === "/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={css.link}
                data-active={pathname?.startsWith("/catalog")}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
