import { useRouter } from "next/router";
import React from "react";
import ReactModal from "react-modal";
import clsx from "classnames";

import styles from "./video.module.css";
import { getYoutubeVideoById } from "@/lib/videoApi";
import Navbar from "@/components/Navbar/Navbar";

ReactModal.setAppElement("#__next");


 export async function getStaticProps(context) {

  const videoId = context.params.videoId;

  const videoArray = await getYoutubeVideoById(videoId);

    return {
      props: {
        video: videoArray.length > 0 ? videoArray[0] : {},
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    };
  }

  export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
    const paths = listOfVideos.map((videoId) => ({
      params: { videoId },
    }));

    return { paths, fallback: "blocking" };
  }

const VideoId = ({ video }) => {
  const router = useRouter();
  const id = router.query.videoId;

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <div className={styles.container}>
      <Navbar/>
      <ReactModal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {/* https://www.youtube.com/embed/MZwe7Qcmj5w */}
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default VideoId;
