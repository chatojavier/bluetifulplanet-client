import SiteService from '@app/services/SiteService';
import Favicon from '@components/Favicon';

export default async function DefaultTags() {
  const { favicon } = await SiteService.getSiteData();
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Favicon favItems={favicon} />
    </>
  );
}
