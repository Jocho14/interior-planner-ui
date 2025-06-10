const VideoPlayer = () => {
  return (
    <div className="w-[50vw] h-[50vh] md:max-w-[800px] aspect-video">
      <video
        autoPlay
        muted
        controls={false}
        preload="metadata"
        className="w-full h-full rounded-xl shadow object-cover"
      >
        <source src="/videos/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
