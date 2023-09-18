import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import animatedLogo from '../assets/animated-splash.json';

const Splashscreen = (props) => {
  const [hasAnimationPlayedTwice, setHasAnimationPlayedTwice] = useState(false);

  useEffect(() => {
    lottieRef.current.play();
  }, []);

  const handleAnimationFinish = () => {
    if (!hasAnimationPlayedTwice) {
      lottieRef?.current?.reset();
      lottieRef?.current?.play();
      setHasAnimationPlayedTwice(true);
    } else {
      setIsModalVisible(false);
    }
  };

  const lottieRef = React.useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <Modal visible={isModalVisible} animationType="fade">
      <LottieView
        ref={lottieRef}
        source={animatedLogo}
        autoPlay={false}
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        style={styles.container}
      />
    </Modal>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#F5FCFF',
  },
});
