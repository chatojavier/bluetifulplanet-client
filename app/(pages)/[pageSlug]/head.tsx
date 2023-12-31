import SiteService from '@app/services/SiteService';
import DefaultTags from '@components/DefaultTags';

export default async function Head() {
  const { siteTitle, description } = await SiteService.getSiteData();

  return (
    <>
      <DefaultTags />
      <title>{`${siteTitle} - ${description}`}</title>
      <meta name="description" content={description as string} />
    </>
  );
}
