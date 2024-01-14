import Header from '@components/Header';
import './globals.scss';
import MenusService from '@app/services/MenusService';
import { ReactNode } from 'react';
import SiteService from '@app/services/SiteService';
import { MenuLocationEnum } from '@app/graphql/__generated__/graphql';
import { Metadata } from 'next';
import PreventContextMenu from '@app/components/PreventContextMenu';
import { gilda, nunito, raleway } from './fonts';

export const generateMetadata = async (): Promise<Metadata> => {
  const { siteTitle, description, favicon } = await SiteService.getSiteData();

  return {
    title: {
      default: `${siteTitle} - ${description}`,
      template: `%s - ${siteTitle}`,
    },
    description,
    icons: {
      icon:
        favicon && favicon?.length > 0
          ? favicon
              .map(({ width, sourceUrl }) => ({
                url: sourceUrl as string,
                href: sourceUrl as string,
                sizes: `${width}x${width}`,
                type: 'image/png',
                rel: 'icon',
              }))
              .concat(
                favicon
                  .filter(({ width }) => width === '180')
                  .map(({ width, sourceUrl }) => ({
                    url: sourceUrl as string,
                    href: sourceUrl as string,
                    sizes: `${width}x${width}`,
                    type: 'image/png',
                    rel: 'apple-touch-icon',
                  }))
              )
          : [],
    },
  };
};

async function getData() {
  const { menu } = await MenusService.getMenuByLocation(
    MenuLocationEnum.MainMenu
  );
  const { language } = await SiteService.getSiteData();
  const { socialMedia } = await SiteService.getSiteOptions();

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
      <body className="h-full">
        <PreventContextMenu />
        <Header menuLinks={mainMenu?.menuItems} socialMedia={socialMedia} />
        <div className="content | h-[calc(100%-3rem)] md:h-[calc(100%-5rem)]">
          {children}
        </div>
      </body>
    </html>
  );
}
