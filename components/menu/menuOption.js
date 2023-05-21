"use client";

import Link from "next/link";
import menu from "./menu.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function Option({ url, text, iconUrl }) {
    
    const pathname  = usePathname();
    
    return (
        <li>
            <Link href={url} className={pathname.includes(url) ? `${menu.optionWrapper} ${menu.selected}` : menu.optionWrapper}>
                <div className={menu.option}>
                    <div className={menu.iconBG}>
                        <Image
                            src={iconUrl}
                            alt=""
                            width={40}
                            height={40} />
                    </div>
                    <span className={menu.optionText}>{text}</span>
                </div>
                <div className={menu.bar} />
            </Link>
        </li>
    )
}