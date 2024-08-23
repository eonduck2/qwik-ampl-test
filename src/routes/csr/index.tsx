import { component$, useVisibleTask$, useStore } from "@builder.io/qwik";

interface Video {
  id: string;
  contentDetails: {
    duration: string;
  };
}

export default component$(() => {
  const videoStore = useStore<{ videos: Video[] }>({ videos: [] });

  useVisibleTask$(async () => {
    console.log("클라이언트에서 실행되는 코드");
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=10&regionCode=kr&key=AIzaSyAdAHdRseIVBU9_40L103fmzt4NPRF4GzU"
      );
      const data = await response.json();
      videoStore.videos = data.items;
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  return (
    <>
      <ul>
        {videoStore.videos.map((video) => (
          <li key={video.id}>
            <h3>{video.snippet.title}</h3>
            <p>길이: {video.contentDetails.duration}</p>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
          </li>
        ))}
      </ul>
    </>
  );
});
