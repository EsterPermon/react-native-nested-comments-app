import React from 'react';
import { Text, View } from 'react-native';
import { CommentContext } from '../../../contexts/CommentContext';
import type { Comment } from '../../../features/comments/types';
import translate from '../../../i18n';
import { Colors } from '../../../ui/constants';
import { ArrowUpLeft, HeartIcon, UserIcon } from '../../../ui/icons';
import { getFormattedCreationDate, MAX_NESTED_REPLIES } from '../../../utils';
import IconButton from '../../UI/IconButton';
import { styles } from './styles';

type CommentProps = {
  comment: Comment;
  replyLevel: number;
};

const CommentItem = (props: CommentProps) => {
  const { replyComment } = React.useContext(CommentContext);
  // Ideally isLiked state changes would be persisted on Comment entity
  const { comment, replyLevel } = props;
  const [isLiked, setIsLiked] = React.useState(comment.isLiked);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UserIcon
          color={Colors.skooveBlue}
          backgroundColor={Colors.skooveLightBlue}
        />
        <Text style={styles.authorName}>{comment.authorName}</Text>
        <Text style={styles.creation}>
          {getFormattedCreationDate(comment.createdAt)}
        </Text>
      </View>
      <Text style={styles.content}>{comment.text}</Text>
      <View style={styles.footer}>
        <IconButton
          onPress={() => {
            setIsLiked((prev) => !prev);
          }}
          icon={
            <HeartIcon
              color={Colors.skooveRed}
              fillColor={isLiked ? Colors.skooveRed : Colors.skooveWhite}
            />
          }
        />
        {/* Disable reply funcitonality when nested reply level reaches 4 nested comments, according to requirements/layout */}
        {replyLevel < MAX_NESTED_REPLIES ? (
          <IconButton
            style={{
              button: styles.replyButton,
              textRight: styles.replyButtonLabel,
            }}
            onPress={() => replyComment(comment.id, comment.authorName)}
            icon={<ArrowUpLeft color={Colors.primary_700} />}
            textRight={translate('commentItem.replyButton.title')}
          />
        ) : null}
      </View>
    </View>
  );
};

export default CommentItem;
