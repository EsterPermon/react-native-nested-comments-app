import * as React from 'react';
import { Path } from 'react-native-svg';
import { Icon, IconProps } from './Icon';

export const HeartIcon = (props: IconProps) => (
  <Icon fill={props.fillColor} {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.367 3.842a4.584 4.584 0 0 0-6.484 0L10 4.725l-.883-.883a4.584 4.584 0 0 0-6.484 6.483l.884.883L10 17.692l6.483-6.484.884-.883a4.584 4.584 0 0 0 0-6.483v0Z"
    />
  </Icon>
);
