import type { PropsWithChildren } from 'react';
import React, { memo } from 'react';
import type { ColorValue } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import { Svg } from 'react-native-svg';

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_SCALE = 1;

export type IconProps = {
  scale?: number;
  color?: ColorValue;
  colorKey?: string;
  alt?: boolean;
  fillColor?: ColorValue;
} & SvgProps;

export const Icon = memo(
  ({
    color,
    width = DEFAULT_ICON_SIZE,
    height = DEFAULT_ICON_SIZE,
    scale = DEFAULT_SCALE,
    children,
    ...props
  }: PropsWithChildren<IconProps>) => {
    return (
      <Svg
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill={color || 'none'}
        scale={scale}
        {...props}
      >
        {children}
      </Svg>
    );
  },
);
