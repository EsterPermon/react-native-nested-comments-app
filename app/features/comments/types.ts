export type Comment = {
  id: string;
  parentId: string | null;
  text: string;
  createdAt: number;
  isLiked: boolean;
  authorName: string;
};

export type CommentReply = {
  comment: Comment;
  children: CommentReply[];
};
