import MediaItemsService from '@app/services/MediaItemsService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get('ids')?.split(',') ?? [];

  try {
    const start = Date.now();
    const res = await MediaItemsService.getMediaItemsById(ids);

    const end = Date.now();
    console.log(`[/galleries/api] Execution time route: ${end - start} ms`);

    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
