import { Navbar } from "@src/containers/navigation-bar";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>{props.children}</main>
    </div>
  );
};
