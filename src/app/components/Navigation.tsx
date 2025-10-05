import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex justify-between pr-10 pl-10">
      <Image
        src="https://res.cloudinary.com/dqgvmwnpl/image/upload/v1759690939/posts/1500648_ukb9dp.svg"
        alt="Ukraine"
        width={80}
        height={80}
      />
      <div className="space-x-10 flex items-center">
        <Link href="/">HOME</Link>
        <Link href="/shop">SHOP</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/contact">CONTACT</Link>
      </div>
    </div>
  );
}
