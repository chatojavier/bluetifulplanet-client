import Header from '@components/Header';
import './globals.css';
import MenusService from '@services/MenusService';
import SiteService from '@services/SiteService';
import { ReactNode } from 'react';

async function getData() {
  const { menu } = await MenusService.getMenuByLocation(
    process.env.MENU_BAR_LOCATION as string
  );
  const { language } = await SiteService.getSiteData();
  const socialMedia = await SiteService.getSiteOptions();

  return {
    mainMenu: menu,
    language,
    socialMedia,
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { mainMenu, language, socialMedia } = await getData();
  return (
    <html lang={(language as string) || 'en'}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header menuLinks={mainMenu} socialMedia={socialMedia} />
        <div className="body__wrapper">{children}</div>
      </body>
    </html>
  );
}
