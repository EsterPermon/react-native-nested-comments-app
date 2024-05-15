import * as React from 'react';
import { Path } from 'react-native-svg';
import { Icon, IconProps } from './Icon';

const DEFAULT_ICON_SIZE = 14;

export const ArrowUpLeft = (props: IconProps) => (
  <Icon
    fill="none"
    viewBox={`0 0 ${DEFAULT_ICON_SIZE} ${DEFAULT_ICON_SIZE}`}
    width={DEFAULT_ICON_SIZE}
    height={DEFAULT_ICON_SIZE}
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.25 8.167 2.333 5.25m0 0L5.25 2.333M2.333 5.25h7a2.333 2.333 0 0 1 2.334 2.333v4.084"
    />
  </Icon>
);
