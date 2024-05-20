import {
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subSeconds,
  subWeeks,
  subYears,
} from 'date-fns';
import {
  assembleReplyMap,
  getFormattedCreationDate,
  getSortedReplies,
  nestReplies,
  sortByCreatedAtDesc,
  sortRepliesByCreatedAtDesc,
} from '..';
import {
  child1Id,
  child2Id,
  grandChildId,
  mockedComments,
  mockedCommentsWithNoNesting,
  mockedNestedReplies,
  mockedReplies,
  parentId,
  root1Id,
  root2Id,
  root3Id,
} from '../__fixtures__/comments';
import translate from '../../i18n';

describe('utils test', () => {
  describe('Comment time logic', () => {
    describe('getFormattedCreationDate', () => {
      const today = new Date();

      it('should return empty string when date is invalid', () => {
        // here we cast to any because the fucntion only accepts number
        expect(getFormattedCreationDate('dfsafsd' as any)).toBe('');
        expect(getFormattedCreationDate(undefined as any)).toBe('');
        expect(getFormattedCreationDate(null as any)).toBe('');
      });

      it('should correctly return time in years', () => {
        const years = 1;
        const date = subYears(today, years).getTime();
        expect(getFormattedCreationDate(date)).toBe(
          translate('common.years', { years }),
        );
      });

      it('should correctly return time in months', () => {
        const months = 1;
        const date = subMonths(today, months).getTime();
        expect(getFormattedCreationDate(date)).toBe(
          translate('common.months', { months }),
        );
      });

      it('should correctly return time in weeks', () => {
        const weeks = 1;
        const date = subWeeks(today, weeks).getTime();
        expect(getFormattedCreationDate(date)).toBe(
          translate('common.weeks', { weeks }),
        );
      });

      it('should correctly return time in days', () => {
        const days = 1;
        const date = subDays(today, days).getTime();
        expect(getFormattedCreationDate(date)).toBe(
          translate('common.days', { days }),
        );
      });

      it('should correctly return time in hours', () => {
        const hours = 1;
        const date = subHours(today, hours).getTime();
        expect(getFormattedCreationDate(date)).toBe(
          translate('common.hours', { hours }),
        );
      });

      it('should correctly return time in minutes', () => {
        const minutes = 1;
        const date = subMinutes(today, minutes).getTime();
        expect(getFormattedCreationDate(date)).toBe(
          translate('common.minutes', { minutes }),
        );
      });

      it('should correctly return time in seconds', () => {
        const seconds = 1;
        const date = subSeconds(today, seconds).getTime();
        expect(getFormattedCreationDate(date)).toBe(
          translate('common.seconds', { seconds }),
        );
      });
    });
  });

  describe('Comments nesting logic', () => {
    describe('assembleReplyMap', () => {
      it('should return empty map when comment arrays is empty', () => {
        const replyMap = assembleReplyMap([]);
        expect(replyMap.size).toBe(0);
      });

      it('should always return a map with all comments', () => {
        const replyMap = assembleReplyMap(mockedComments);
        expect(replyMap.size).toBe(mockedComments.length);
        mockedComments.forEach((comment) => {
          expect(replyMap.get(comment.id)).not.toBeNull();
        });
      });

      it('should return a map in the correct structure', () => {
        const replyMap = assembleReplyMap(mockedComments);
        mockedComments.forEach((comment) => {
          const reply = replyMap.get(comment.id);
          expect(reply).toHaveProperty('comment');
          expect(reply).toHaveProperty('children');
          expect(reply?.children).toEqual([]);
        });
      });
    });

    describe('nestReplies', () => {
      it('should return empty array when replies map is empty', () => {
        const nestedReplies = nestReplies([], new Map([]));
        expect(nestedReplies.length).toBe(0);
      });

      it('should always return all comments in a flat structure when there are no replies', () => {
        const replyMap = assembleReplyMap(mockedCommentsWithNoNesting);
        const nestedReplies = nestReplies(
          mockedCommentsWithNoNesting,
          replyMap,
        );
        expect(nestedReplies.length).toBe(mockedCommentsWithNoNesting.length);
        nestedReplies.forEach((reply) => {
          expect(reply?.children).toEqual([]);
        });
      });

      it('should only add comments with no parentId to the root', () => {
        const replyMap = assembleReplyMap(mockedComments);
        const nestedReplies = nestReplies(mockedComments, replyMap);

        expect(nestedReplies.length).toBe(1);

        const root = nestedReplies[0];
        expect(root.comment.id).toBe(parentId);
        expect(root.comment.parentId).toBe(null);
      });

      it('should add a comment on the children array of its parent', () => {
        const replyMap = assembleReplyMap(mockedComments);
        const nestedReplies = nestReplies(mockedComments, replyMap);

        const parent = nestedReplies[0];
        expect(parent.comment.id).toBe(parentId);

        const child1 = parent.children[0];
        expect(child1.comment.id).toBe(child1Id);

        const child2 = parent.children[1];
        expect(child2.comment.id).toBe(child2Id);

        const grandChild = child1.children[0];
        expect(grandChild.comment.id).toBe(grandChildId);
      });
    });

    describe('sortByCreatedAtDesc', () => {
      it('should sort replies by createdAt in descending order', () => {
        const sortedReplies = mockedReplies.slice().sort(sortByCreatedAtDesc);
        expect(sortedReplies[0].comment.id).toBe(mockedReplies[3].comment.id);
        expect(sortedReplies[1].comment.id).toBe(mockedReplies[1].comment.id);
        expect(sortedReplies[2].comment.id).toBe(mockedReplies[0].comment.id);
        expect(sortedReplies[3].comment.id).toBe(mockedReplies[2].comment.id);
      });

      it('should handle comments created at the same time', () => {
        const reply = mockedReplies[0];
        const replies = [reply, { ...reply, id: `${reply.comment.id}Copy` }];
        const sortedReplies = replies.sort(sortByCreatedAtDesc);
        expect(sortedReplies).toHaveLength(2);
      });
    });

    describe('sortRepliesByCreatedAtDesc', () => {
      it('should sort nested replies correctly', () => {
        const sortedReplies = sortRepliesByCreatedAtDesc(mockedNestedReplies);

        const parent = sortedReplies[0];
        expect(parent.comment.id).toBe(parentId);

        const olderChild = parent.children[0];
        expect(olderChild.comment.id).toBe(child1Id);

        const youngerChild = parent.children[1];
        expect(youngerChild.comment.id).toBe(child2Id);

        const grandChild = olderChild.children[0];
        expect(grandChild.comment.id).toBe(grandChildId);
      });
    });

    describe('getSortedReplies', () => {
      it('should return nested sorted replies from plain comments array', () => {
        const sortedAndNestedReplies = getSortedReplies(mockedComments);

        expect(sortedAndNestedReplies.length).toBe(1);

        const parent = sortedAndNestedReplies[0];
        expect(parent.comment.id).toBe(parentId);
        expect(parent.children.length).toBe(2);

        const olderChild = parent.children[0];
        expect(olderChild.comment.id).toBe(child1Id);
        expect(olderChild.children.length).toBe(1);

        const youngerChild = parent.children[1];
        expect(youngerChild.comment.id).toBe(child2Id);
        expect(youngerChild.children.length).toBe(0);

        const grandChild = olderChild.children[0];
        expect(grandChild.comment.id).toBe(grandChildId);
        expect(grandChild.children.length).toBe(0);
      });

      it('should return correct sorted structure when there are no replies', () => {
        const sortedReplies = getSortedReplies(mockedCommentsWithNoNesting);

        expect(sortedReplies.length).toBe(3);

        const root2 = sortedReplies[0];
        expect(root2.comment.id).toBe(root2Id);
        expect(root2.children.length).toBe(0);

        const root1 = sortedReplies[1];
        expect(root1.comment.id).toBe(root1Id);
        expect(root1.children.length).toBe(0);

        const root3 = sortedReplies[2];
        expect(root3.comment.id).toBe(root3Id);
        expect(root3.children.length).toBe(0);
      });
    });
  });
});
