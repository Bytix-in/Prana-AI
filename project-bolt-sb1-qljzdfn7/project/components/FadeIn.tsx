import React from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  FadeIn as RNFadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';

interface FadeInProps extends ViewProps {
  children: React.ReactNode;
  delay?: number;
}

export default function FadeIn({ children, delay = 0, style, ...props }: FadeInProps) {
  return (
    <Animated.View
      entering={RNFadeIn.delay(delay).springify()}
      exiting={FadeOut.springify()}
      layout={Layout.springify()}
      style={style}
      {...props}>
      {children}
    </Animated.View>
  );
}