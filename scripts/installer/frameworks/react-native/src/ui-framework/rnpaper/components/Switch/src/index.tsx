// Library
import React from 'react';
import { View } from 'react-native';
import { Switch, Subheading } from 'react-native-paper';

export default ({
  label = '',
  htmlid,
  value,
  onChange,
  disabled = false,
  options = {},
}) => (
  <View>
    <Subheading>
      {label}
    </Subheading>
    <Switch 
      key={htmlid} 
      value={value} 
      onValueChange={onChange} 
      disabled={undefined}
      ref={undefined}
      style={undefined}
      pointerEvents={undefined}
      color={undefined}
      onLayout={undefined}
      testID={undefined}
      nativeID={undefined}
      accessible={undefined}
      accessibilityActions={undefined}
      accessibilityLabel={undefined}
      accessibilityRole={undefined}
      accessibilityState={undefined}
      accessibilityHint={undefined}
      accessibilityValue={undefined}
      onAccessibilityAction={undefined}
      accessibilityLiveRegion={undefined}
      importantForAccessibility={undefined}
      accessibilityElementsHidden={undefined}
      accessibilityViewIsModal={undefined}
      onAccessibilityEscape={undefined}
      onAccessibilityTap={undefined}
      onMagicTap={undefined}
      accessibilityIgnoresInvertColors={undefined}
      hitSlop={undefined}
      removeClippedSubviews={undefined}
      collapsable={undefined}
      needsOffscreenAlphaCompositing={undefined}
      renderToHardwareTextureAndroid={undefined}
      focusable={undefined}
      shouldRasterizeIOS={undefined}
      isTVSelectable={undefined}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
      tvParallaxShiftDistanceX={undefined}
      tvParallaxShiftDistanceY={undefined}
      tvParallaxTiltAngle={undefined}
      tvParallaxMagnification={undefined}
      onStartShouldSetResponder={undefined}
      onMoveShouldSetResponder={undefined}
      onResponderEnd={undefined}
      onResponderGrant={undefined}
      onResponderReject={undefined}
      onResponderMove={undefined}
      onResponderRelease={undefined}
      onResponderStart={undefined}
      onResponderTerminationRequest={undefined}
      onResponderTerminate={undefined}
      onStartShouldSetResponderCapture={undefined}
      onMoveShouldSetResponderCapture={undefined}
      onTouchStart={undefined}
      onTouchMove={undefined}
      onTouchEnd={undefined}
      onTouchCancel={undefined}
      onTouchEndCapture={undefined}
      thumbColor={undefined}
      trackColor={undefined}
      ios_backgroundColor={undefined}
      onTintColor={undefined}
      thumbTintColor={undefined}
      tintColor={undefined} 
      {...options}
    />
  </View>
);
