import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center p-12
      bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200"
    >
      {children}
    </div>
  );
};

export default Layout;
