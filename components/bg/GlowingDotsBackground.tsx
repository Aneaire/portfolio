import styles from "./GlowingDotsBackground.module.css";

const GlowingDotsBackground = () => {
  // Generate dots on the server
  const numberOfDots = 200;
  const dots = Array.from({ length: numberOfDots }, (_, i) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomSize = 0.3 + Math.random() * 3; // Size between 1px and 4px
    const randomGlowDuration = 2 + Math.random() * 4; // Between 2s and 6s

    return (
      <div
        key={i}
        className={styles.dot}
        style={{
          left: `${randomX}%`,
          top: `${randomY}%`,
          width: `${randomSize}px`,
          height: `${randomSize}px`,
          animationDuration: `${randomGlowDuration}s`,
        }}
      ></div>
    );
  });

  return (
    <div id="dots-container" className={`${styles.dotsContainer} opacity-100 `}>
      {dots}
    </div>
  );
};

export default GlowingDotsBackground;
