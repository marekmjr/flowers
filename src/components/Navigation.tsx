import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();

  const isCurrentRoute = (name: string) => {
    return router.pathname == name;
  };

  const items: MenuItem[] = [
    {
      label: "Home",
      url: "/",
      className: isCurrentRoute("/") ? "active-route" : "",
    },
    {
      label: "Flowers table",
      url: "/flowers",
      className: isCurrentRoute("/flowers") ? "active-route" : "",
    },
  ];

  return (
    <>
      <Menubar model={items} />
    </>
  );
};

export default Navigation;
