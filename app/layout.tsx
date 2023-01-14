import { getMenuByLocation } from "./apollo/menus";
import Header from "./components/Header";
import "./globals.css";

async function getData() {
  const { menu, loading } = await getMenuByLocation(
    process.env.MENU_BAR_LOCATION as string
  );

  return {
    mainMenu: menu,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mainMenu } = await getData();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header menuLinks={mainMenu} />
        <div className="body__wrapper">{children}</div>
      </body>
    </html>
  );
}
