import Header from '@components/Header';
import './globals.scss';
import MenusService from '@app/apollo/MenusService';
import SiteService from '@app/apollo/SiteService';
import { ReactNode } from 'react';
import { gilda, nunito, raleway } from './fonts';

async function getData() {
  const { menu } = await MenusService.queryMenuByLocation(
    process.env.MENU_BAR_LOCATION as string
  );
  const { language } = await SiteService.querySiteData();
  const socialMedia = await SiteService.querySiteOptions();

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
    <html
      lang={(language as string) || 'en'}
      className={`h-full ${raleway.variable} ${nunito.variable} ${gilda.variable} font-sans scroll-smooth`}
    >
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="h-full">
        <Header menuLinks={mainMenu} socialMedia={socialMedia} />
        <div className="content | h-[calc(100%-3rem)] md:h-[calc(100%-5rem)]">
          {children}
        </div>
      </body>
    </html>
  );
}
