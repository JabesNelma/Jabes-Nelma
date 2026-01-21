
import dynamic from "next/dynamic";
/*
  File: src/components/layout/Navbar.tsx
  Deskripsi (ID):
  - Komponen navbar yang menampilkan logo singkat dan `GooeyNav` di tengah.
  - `GooeyNav` di-load secara dynamic dengan SSR dimatikan karena membutuhkan DOM.

  Titik edit yang umum:
  - Ubah `navLinks` untuk menambah atau menghapus item navigasi.
  - Ubah gaya kontainer (backdrop, padding) untuk memodifikasi tampilan navbar.
*/

const GooeyNav = dynamic(() => import("@/components/ui/GooeyNav"), { ssr: false });

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight">
          {/* Logo/brand singkat. Bisa diganti dengan gambar jika diinginkan. */}
          <a href="#hero" className="inline-block px-2 py-1 rounded-md hover:bg-white/6 transition">JN</a>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Bungkus GooeyNav di container dengan backdrop blur untuk efek subtle */}
          <div className="backdrop-blur-sm bg-white/2 rounded-full px-4 py-2">
            <GooeyNav items={navLinks} />
          </div>
        </div>
      </div>
    </nav>
  );
}