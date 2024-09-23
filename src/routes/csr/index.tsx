import { component$, useVisibleTask$, useStore } from "@builder.io/qwik";

interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
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
        // "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=10&regionCode=kr&key=AIzaSyAdAHdRseIVBU9_40L103fmzt4NPRF4GzU"
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,&type=channel&q=Google for Developers&maxResults=5&&key=AIzaSyAdAHdRseIVBU9_40L103fmzt4NPRF4GzU"
      );
      const data = await response.json();
      //   videoStore.videos = data.items;
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  return (
    <>
      <h1>인기 YouTube 동영상</h1>
      <ul>
        {videoStore.videos.map((video) => (
          <li key={video.id}>
            <h3>{video.snippet.title}</h3>
            <p>길이: {video.contentDetails.duration}</p>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.snippet.title}
              frameBorder="15px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullscreen
            ></iframe>
          </li>
        ))}
      </ul>
    </>
  );
});
