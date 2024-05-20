import * as React from 'react';
import type { ColorValue } from 'react-native';
import { Path, Rect } from 'react-native-svg';
import { Icon, IconProps } from './Icon';

const DEFAULT_ICON_SIZE = 32;

type Props = IconProps & {
  backgroundColor?: ColorValue;
  color?: ColorValue;
};

export const UserIcon = (props: Props) => {
  const { backgroundColor, color } = props;
  return (
    <Icon
      viewBox={`0 0 ${DEFAULT_ICON_SIZE} ${DEFAULT_ICON_SIZE}`}
      width={DEFAULT_ICON_SIZE}
      height={DEFAULT_ICON_SIZE}
      fill="none"
      {...props}
    >
      <Rect
        width={DEFAULT_ICON_SIZE}
        height={DEFAULT_ICON_SIZE}
        fill={backgroundColor}
        rx={16}
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M22.667 23.5v-1.667a3.333 3.333 0 0 0-3.334-3.333h-6.666a3.334 3.334 0 0 0-3.334 3.333V23.5m10-11.667a3.333 3.333 0 1 1-6.666 0 3.333 3.333 0 0 1 6.666 0Z"
      />
    </Icon>
  );
};
