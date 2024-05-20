import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';
import { Comment, CommentReply } from '../features/comments/types';
import translate from '../i18n';

export const MAX_NESTED_REPLIES = 3;

export const getFormattedCreationDate = (timestamp: number) => {
  const now = new Date();
  const pastDate = new Date(timestamp);

  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    return '';
  }

  const years = differenceInYears(now, pastDate);
  if (years > 0) return translate('common.years', { years });

  const months = differenceInMonths(now, pastDate);
  if (months > 0) return translate('common.months', { months });

  const weeks = differenceInWeeks(now, pastDate);
  if (weeks > 0) return translate('common.weeks', { weeks });

  const days = differenceInDays(now, pastDate);
  if (days > 0) return translate('common.days', { days });

  const hours = differenceInHours(now, pastDate);
  if (hours > 0) return translate('common.hours', { hours });

  const minutes = differenceInMinutes(now, pastDate);
  if (minutes > 0) return translate('common.minutes', { minutes });

  const seconds = differenceInSeconds(now, pastDate);
  return translate('common.seconds', { seconds });
};

export const assembleReplyMap = (
  comments: Comment[],
): Map<string, CommentReply> => {
  return new Map(
    comments.map((comment) => [comment.id, { comment, children: [] }]),
  );
};

export const nestReplies = (
  comments: Comment[],
  replyMap: Map<string, CommentReply>,
): CommentReply[] => {
  return comments.reduce((accumulator: CommentReply[], comment: Comment) => {
    const commentReply = replyMap.get(comment.id);

    if (!commentReply) {
      return accumulator;
    }

    if (comment.parentId) {
      const parentCommentReply = replyMap.get(comment.parentId);
      parentCommentReply?.children.push({ ...commentReply });
    } else {
      accumulator.push({ ...commentReply });
    }

    return accumulator;
  }, []);
};

export const sortByCreatedAtDesc = (a: CommentReply, b: CommentReply) =>
  new Date(a.comment.createdAt).getTime() -
  new Date(b.comment.createdAt).getTime();

// Sort replies recusivelly
export const sortRepliesByCreatedAtDesc = (
  replies: CommentReply[],
): CommentReply[] => {
  return replies.sort(sortByCreatedAtDesc).map((reply) => ({
    ...reply,
    children: reply.children ? sortRepliesByCreatedAtDesc(reply.children) : [],
  }));
};

export const getSortedReplies = (comments: Comment[]) => {
  const replyMap = assembleReplyMap(comments);
  const nestedReplies = nestReplies(comments, replyMap);
  return sortRepliesByCreatedAtDesc(nestedReplies);
};
