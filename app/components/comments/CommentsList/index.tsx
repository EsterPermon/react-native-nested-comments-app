import React from 'react';
import { FlatList, View } from 'react-native';
import { CommentReply } from '../../../features/comments/types';
import CommentItem from '../CommentItem';

type CommentsListProps = {
  commentReplies: CommentReply[];
  replyLevel: number;
};

const CommentsList = (props: CommentsListProps) => {
  const { commentReplies, replyLevel } = props;
  return (
    <FlatList
      data={commentReplies}
      renderItem={({ item }) => (
        <View style={{ marginLeft: replyLevel * 10 }}>
          <CommentItem comment={item.comment} replyLevel={replyLevel} />
          {item.children.length > 0 && (
            <CommentsList
              commentReplies={item.children}
              replyLevel={replyLevel + 1}
            />
          )}
        </View>
      )}
      keyExtractor={(item) => item.comment.id}
    />
  );
};

export default CommentsList;
