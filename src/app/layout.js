import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/common/Footer";
import ThemeContextProvider from "@/context/ThemeContext";
import ContextProviders from "@/context/ContextProviders";
import AuthProviders from "@/providers/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Blogio",
    description: "Blog website for coders",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProviders>
                    <ThemeContextProvider>
                        <ContextProviders>
                            <div className="containerc">
                                <div className="wrapper">
                                    <Navbar />
                                    {children}
                                    <Footer />
                                </div>
                            </div>
                        </ContextProviders>
                    </ThemeContextProvider>
                </AuthProviders>
            </body>
        </html>
    );
}
