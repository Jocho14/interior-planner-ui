import React, { useEffect } from "react";
import { motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const TestPage = () => {
  useEffect(() => {
    const element = document.querySelector(".main-container") as HTMLElement;

    if (element) {
      const locoScroll = new LocomotiveScroll({
        el: element,
        smooth: true,
        multiplier: 0.7,
        class: "is-revealed",
      });

      locoScroll.update();

      return () => {
        locoScroll.destroy();
      };
    }
  }, []);

  return (
    <div className="main-container">
      <div className="content">
        <motion.div
          className="box"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>This Box Comes From the Air!</h1>
        </motion.div>

        <div className="parallax" data-scroll data-scroll-speed="3">
          <h2>This element moves slower than the rest</h2>
        </div>

        <div className="parallax" data-scroll data-scroll-speed="1">
          <h2>This element moves faster than the rest</h2>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
