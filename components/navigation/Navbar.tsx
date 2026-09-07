"use client";

import { useEffect, useState } from "react";
import { brand, navigation } from "@/data/brand";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
    <a className="brand" href="#top" aria-label="Lake beauty - trang chủ"><span className="brand-mark">L</span><span><strong>Lake</strong> beauty</span></a>
    <nav id="primary-nav" className={open ? "nav-links nav-open" : "nav-links"} aria-label="Điều hướng chính">
      {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
    </nav>
    <a className="book-link" href={brand.messengerUrl} target="_blank" rel="noreferrer">Đặt lịch <span aria-hidden="true">↗</span></a>
    <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((current) => !current)}>{open ? "Đóng" : "Menu"}</button>
  </header>;
}