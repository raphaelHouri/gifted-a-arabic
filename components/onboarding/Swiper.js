import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Swiper = ({ children, index: initialIndex = 0, ...props }) => {
  const scrollViewRef = useRef(null);
  const [state, setState] = useState(() => {
    const total = children ? children.length || 1 : 0;
    const index = total > 1 ? Math.min(initialIndex, total - 1) : 0;
    const offset = width * index;

    return {
      total,
      index,
      offset,
      width,
      height,
    };
  });
  useEffect(() => {
  
  }, [])

  const internals = useRef({
    isScrolling: false,
    offset: state.offset,
  });


  const onScrollBegin = (e) => {
    internals.current.isScrolling = true;
  };

  const onScrollEnd = (e) => {
    internals.current.isScrolling = false;

    const offset = e.nativeEvent.contentOffset
      ? e.nativeEvent.contentOffset.x
      : e.nativeEvent.position * state.width;

    updateIndex(offset);
  };



  const updateIndex = (offset) => {
    // console.log(offset)
    // console.log(internals.current.offset)

    const diff = offset - internals.current.offset;
    const step = state.width;
    let index = state.index;

    // if (!diff) {
    //   return;
    // }

    index = parseInt(index + Math.round(diff / step), 10);

    internals.current.offset = offset;
    setState({ ...state, index });
  };


  const renderScrollView = (pages) => (
    <ScrollView
      ref={scrollViewRef}
      {...props}
      contentContainerStyle={[styles.wrapper, props.style]}
      onScrollBeginDrag={onScrollBegin}
      onMomentumScrollEnd={onScrollEnd}
    >
      {pages.map((page, i) => (
        <View style={[styles.fullScreen, styles.slide]} key={i}>
          {page}
        </View>
      ))}
    </ScrollView>
  );


  return (
    <View style={[styles.container, styles.fullScreen]}>
      {renderScrollView(children)}
    </View>
  );
};

Swiper.defaultProps = {
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  bounces: false,
  scrollsToTop: false,
  removeClippedSubviews: true,
  automaticallyAdjustContentInsets: false,
};

const styles = StyleSheet.create({
  fullScreen: {
    width: width * 1,
    height: 40,
  },
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  slide: {
    backgroundColor: 'transparent',
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Swiper;
