import React from 'react';
import { TextInput, ViewProps } from 'react-native';

type InputFieldProps = {
  onChangeText: (text: string) => void;
  value: string;
  ref?: React.Ref<TextInput>;
  style?: ViewProps['style'];
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom';
};

const InputField = React.forwardRef<Partial<TextInput>, InputFieldProps>(
  (props, ref) => {
    const {
      placeholder,
      onChangeText,
      style,
      value,
      multiline,
      numberOfLines,
      textAlignVertical,
    } = props;
    const inputRef = React.useRef<TextInput>(null);

    React.useImperativeHandle(
      ref,
      () =>
        ({
          focus: () => {
            inputRef.current?.focus();
          },
          blur: () => {
            inputRef.current?.blur();
          },
        }) satisfies Partial<TextInput>,
    );

    return (
      <TextInput
        ref={inputRef}
        style={style}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
      />
    );
  },
);

export default InputField;
