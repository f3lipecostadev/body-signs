export function getYoutubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname.includes("www.youtube.com")
    ) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId || null;
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "") || null;
    }

    return null;
  } catch {
    return null;
  }
}

export function getYoutubeEmbedUrl(url: string): string | null {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export function getYoutubePreviewEmbedUrl(url: string): string | null {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1`;
}

export function getYoutubeThumbnailUrl(url: string): string | null {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}