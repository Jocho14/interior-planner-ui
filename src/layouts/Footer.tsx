import { Link } from "react-router";
import { Box3dCenter } from "iconoir-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container flex flex-col gap-6 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-3 lg:max-w-sm">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Box3dCenter className="h-6 w-6 text-primary" />
              <span>InteriorPlanner</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transform your ideas into reality with our intuitive 3D room
              planner. Design, visualize, and share your perfect space in
              minutes.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link to="#" className="text-sm hover:underline">
                  Features
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Pricing
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Templates
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Gallery
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link to="#" className="text-sm hover:underline">
                  Blog
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Tutorials
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Support
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Documentation
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link to="#" className="text-sm hover:underline">
                  About
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Careers
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Press
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Legal</h3>
              <nav className="flex flex-col gap-2">
                <Link to="#" className="text-sm hover:underline">
                  Terms
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Privacy
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Cookies
                </Link>
                <Link to="#" className="text-sm hover:underline">
                  Licenses
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} InteriorPlanner
          </p>
          <div className="flex gap-4">
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
