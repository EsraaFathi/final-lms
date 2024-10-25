import { useMoveBack } from "../../../hooks/useMoveBack";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import to get URL params

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const moveBack = useMoveBack();

  useEffect(() => {
    // Iterate through localStorage keys to find a matching video ID
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === id) {
        const storedVideoUrl = localStorage.getItem(key);
        if (storedVideoUrl) {
          setVideoUrl(storedVideoUrl);
        }
      }
    }
  }, [id]);

  if (!videoUrl) {
    return <div>Video URL not found or does not match ID.</div>;
  }

  // Extract the video ID from the YouTube URL
  let videoId = null;
  if (videoUrl.includes("youtube.com/watch")) {
    videoId = videoUrl.split("v=")[1]?.split("&")[0];
  } else if (videoUrl.includes("youtu.be")) {
    videoId = videoUrl.split("youtu.be/")[1];
  }

  if (!videoId) {
    return <p>Invalid video URL</p>;
  }

  return (
    <div className="container mt-10 mb-10 mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-primaryBG to-GreidentColor2 bg-clip-text text-transparent">
        تشغيل الفيديو
      </h1>

      <div className="video-container">
        <iframe
          width="600"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&rel=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="w-full flex justify-center items-center mt-5">
        <motion.button
          onClick={moveBack}
          className="bg-gradient-to-r from-primaryBG to-GreidentColor2 text-white px-2 py-1 rounded-lg text-md transition-all duration-300 transform hover:scale-105 hover:shadow-gray-800 hover:shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          الرجوع للخلف
        </motion.button>
      </div>
    </div>
  );
};

export default VideoPlayer;
