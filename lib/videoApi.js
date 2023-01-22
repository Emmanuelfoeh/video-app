export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.NEW_YOUTUBE_API_KEY;
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    // `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${queryStr}&key=${YOUTUBE_API_KEY}`
    // const response = await fetch(
    //   `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    // );

    const data = await response.json();

    if (data?.error) {
      console.log("return data error", data.error);
      return [];
    }
    console.log({ data: data.items });

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (error) {
    console.error("error:", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=GH";
  return getCommonVideos(URL);
};
