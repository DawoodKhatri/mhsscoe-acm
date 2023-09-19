import "@/styles/globals.css";
import AppProviders from "./providers";
import AppNavbar from "@/components/common/Navbar";
import AppFooter from "@/components/common/Footer";

export const metadata = {
  title: "MHSSCOE ACM CHAPTER",
  description:
    "MHSSCOE ACM CHAPTER is a student chapter started by M. H. Saboo Siddik College Of Engineering in 2014. The chapter has successfully conducted various workshops, seminars and industrial visits for the students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <div className="fixed top-0 h-screen w-full overflow-hidden">
            <img
              className="object-cover align-middle absolute h-screen w-screen top-0"
              src="https://png.pngtree.com/background/20211215/original/pngtree-geometric-gradient-background-with-glassmorphism-effect-and-light-color-picture-image_1472036.jpg"
            />
          </div>
          <AppNavbar />
          <div className="my-5">{children}</div>
          <AppFooter />
        </AppProviders>
      </body>
    </html>
  );
}
