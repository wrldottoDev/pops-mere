import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POPS - LAB",
};

const fredoka = localFont({
  src: "./fonts/Fredoka-VariableFont_wdth,wght.ttf",
  variable: "--font-fredoka",
});

const fredokaCondensed = localFont({
  src: "./fonts/Fredoka_Condensed-SemiBold.ttf",
  variable: "--font-fredoka-condensed",
});

const chewy = localFont({
  src: "./fonts/Chewy-Regular.ttf",
  variable: "--font-chewy",
  preload: false,
});

const chauPhilomene = localFont({
  src: "./fonts/ChauPhilomeneOne-Regular.ttf",
  variable: "--font-chau",
  preload: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`
          ${fredoka.variable}
          ${fredokaCondensed.variable}
          ${chewy.variable}
          ${chauPhilomene.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
