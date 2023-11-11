import Navbar from "@src/src/containers/navigation-bar";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="min-h-screen bg-primary ">
      <Navbar />

      <main>{props.children}</main>
    </div>
  );
};
