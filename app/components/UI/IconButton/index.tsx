import { ReactElement } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
  TextProps,
} from 'react-native';

type SyleProps = {
  button?: PressableProps['style'];
  textLeft?: TextProps['style'];
  textRight?: TextProps['style'];
};

type IconButtonProps = {
  icon: ReactElement;
  onPress: (event: GestureResponderEvent) => void;
  textLeft?: string;
  textRight?: string;
  style?: SyleProps;
};

const IconButton = (props: IconButtonProps) => {
  const { onPress, textLeft, textRight, icon, style } = props;
  return (
    <Pressable style={style?.button} onPress={onPress}>
      {textLeft ? <Text style={style?.textLeft}>{textLeft}</Text> : null}
      {icon}
      {textRight ? <Text style={style?.textRight}>{textRight}</Text> : null}
    </Pressable>
  );
};

export default IconButton;
