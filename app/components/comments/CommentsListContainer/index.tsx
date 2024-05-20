import { FlatList, Text, View } from 'react-native';
import translate from '../../../i18n';
import { useAppSelector } from '../../../store';
import { getSortedReplies } from '../../../utils';
import CommentsList from '../CommentsList';

const CommentListContainer = () => {
  const comments = useAppSelector((state) => state.comments?.allComments);
  const replies = getSortedReplies(comments);

  return (
    <View>
      {replies ? (
        <FlatList
          data={replies}
          renderItem={({ item }) => (
            <CommentsList commentReplies={[item]} replyLevel={0} />
          )}
          keyExtractor={(item) => item.comment.id}
        />
      ) : (
        <Text>{translate('commentsListContainer.noCommentsMessage')}</Text>
      )}
    </View>
  );
};

export default CommentListContainer;
