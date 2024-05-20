import React from 'react';

export type CommentContextType = {
  currentReplyId: string;
  currentReplyAuthor: string;
  resetReplier: () => void;
  replyComment: (commentId: string, authorName: string) => void;
};

const defaultValue = {
  currentReplyId: '',
  currentReplyAuthor: '',
  resetReplier: () => null,
  replyComment: () => null,
};

export const CommentContext =
  React.createContext<CommentContextType>(defaultValue);

export const CommentContextProvider = ({
  children,
}: {
  children?: React.ReactElement;
}) => {
  const [currentReplyId, setCurrentReplyId] = React.useState('');
  const [currentReplyAuthor, setCurrentReplyAuthor] = React.useState('');

  const replyComment = React.useCallback(
    (commentId: string, authorName: string) => {
      setCurrentReplyId(commentId);
      setCurrentReplyAuthor(authorName);
    },
    [],
  );

  const resetReplier = React.useCallback(() => {
    setCurrentReplyId('');
    setCurrentReplyAuthor('');
  }, []);

  const memoizedValue = React.useMemo(() => {
    return {
      currentReplyId,
      currentReplyAuthor,
      replyComment,
      resetReplier,
    };
  }, [currentReplyId, currentReplyAuthor, replyComment, resetReplier]);

  return (
    <CommentContext.Provider value={memoizedValue}>
      {children}
    </CommentContext.Provider>
  );
};
