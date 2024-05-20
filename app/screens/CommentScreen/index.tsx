import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import CommentForm from '../../components/comments/CommentForm';
import CommentListContainer from '../../components/comments/CommentsListContainer';
import { fetchComments } from '../../features/comments/commentsSlice';
import translate from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../store';

const CommentScreen = () => {
  const dispatch = useAppDispatch();
  const commentsError = useAppSelector((state) => state.comments.error);
  const isLoadingComments = useAppSelector((state) => state.comments.loading);

  React.useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (isLoadingComments) {
    return <Text>{translate('commentScreen.loadingMessage')}</Text>;
  }

  if (commentsError) {
    return (
      <Text>
        {translate('commentScreen.errorMessage', {
          commentsError,
        })}
      </Text>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <CommentListContainer />
        </View>
        <CommentForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentScreen;
