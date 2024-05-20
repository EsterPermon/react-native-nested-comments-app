import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
  TextProps,
} from 'react-native';

type SyleProps = {
  button?: PressableProps['style'];
  title?: TextProps['style'];
};

type IconButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  style?: SyleProps;
};

const Button = (props: IconButtonProps) => {
  const { onPress, title, style } = props;
  return (
    <Pressable style={style?.button} onPress={onPress}>
      <Text style={style?.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;
