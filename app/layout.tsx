import Header from "@components/Header";
import "./globals.css";
import MenusService from "@services/MenusService";
import SiteService from "@services/SiteService";

async function getData() {
  const { menu } = await MenusService.getMenuByLocation(
    process.env.MENU_BAR_LOCATION as string
  );
  const { language } = await SiteService.getSiteData();

  return {
    mainMenu: menu,
    language,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mainMenu, language } = await getData();
  return (
    <html lang={(language as string) || "en"}>
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
