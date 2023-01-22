import SiteService from '@services/SiteService';
import Favicon from '@components/Favicon';

async function getData() {
  const { favicon } = await SiteService.getSiteData();
  return { favicon };
}

export default async function DefaultTags() {
  const { favicon } = await getData();
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Favicon favItems={favicon} />
    </>
  );
}
