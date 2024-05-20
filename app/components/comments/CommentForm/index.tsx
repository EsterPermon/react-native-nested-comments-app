import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import { CommentContext } from '../../../contexts/CommentContext';
import { addComment } from '../../../features/comments/commentsSlice';
import translate from '../../../i18n';
import { useAppDispatch } from '../../../store';
import { Colors } from '../../../ui/constants';
import { UserIcon } from '../../../ui/icons';
import Button from '../../UI/Button';
import InputField from '../../UI/InputField';
import { styles } from './styles';

type FormValues = {
  comment: string;
};

const CommentForm = () => {
  const dispatch = useAppDispatch();

  const { currentReplyId, currentReplyAuthor, resetReplier } =
    React.useContext(CommentContext);

  const { handleSubmit, reset, control, watch } = useForm<FormValues>({
    defaultValues: {
      comment: '',
    },
  });

  const commentRef = React.useRef<TextInput>(null);
  const watchComment = watch('comment');

  // ideally we would have a User entity populated with the data of the current logged in user
  const username = 'me';

  React.useEffect(() => {
    if (currentReplyId) {
      commentRef.current?.focus();
    } else {
      commentRef.current?.blur();
    }
  }, [currentReplyId, commentRef]);

  const resetState = () => {
    reset({
      comment: '',
    });
    if (currentReplyId) {
      resetReplier();
    }
  };

  const currentReplyAuthorMention = currentReplyAuthor
    ? `@${currentReplyAuthor} `
    : '';

  const submitButtonTranslationKey = currentReplyId
    ? 'commentForm.replyButton.title'
    : 'commentForm.sendButton.title';

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const commentId = uuid.v4() as string;

    const newComment = {
      id: commentId,
      parentId: currentReplyId || null,
      text: data.comment,
      createdAt: Date.now(),
      isLiked: false,
      authorName: username,
    };

    dispatch(addComment(newComment));
    resetState();
  };

  const handleCancel = () => {
    resetState();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        {currentReplyAuthorMention ? (
          <Text style={styles.mention}>{currentReplyAuthorMention}</Text>
        ) : null}
        <Controller
          control={control}
          rules={{
            required: true, // to present a better ui/ux empty comment submission is not allowed
          }}
          render={({ field: { value, onChange } }) => (
            <InputField
              ref={commentRef}
              placeholder={
                currentReplyAuthorMention
                  ? ''
                  : translate('commentForm.input.placeholder')
              }
              onChangeText={onChange}
              value={value}
              style={styles.input}
              numberOfLines={3}
              textAlignVertical="top"
              multiline
            />
          )}
          name="comment"
        />
      </View>
      <View style={styles.footer}>
        <UserIcon
          color={Colors.skooveBlue}
          backgroundColor={Colors.primary_100}
        />
        <View style={styles.actionButtons}>
          {watchComment || currentReplyAuthorMention ? (
            <Button
              onPress={handleCancel}
              title={translate('commentForm.cancelButton.title')}
              style={{
                button: styles.cancelButton,
                title: styles.cancelButtonLabel,
              }}
            />
          ) : null}
          <Button
            onPress={handleSubmit(onSubmit)}
            title={translate(submitButtonTranslationKey)}
            style={{
              button: styles.submitButton,
              title: styles.submitButtonLabel,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CommentForm;
