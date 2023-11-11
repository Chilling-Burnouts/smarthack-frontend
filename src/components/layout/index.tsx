import { Sidebar } from "@src/containers/sidebar";

import "./styles.css";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="app-container">
      <Sidebar />

      <main className="bg-background">{props.children}</main>
    </div>
  );
};
