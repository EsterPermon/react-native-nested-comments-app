import { subDays } from 'date-fns';

const todayDate = new Date();
const today = todayDate.getTime();
const yesterday = subDays(todayDate, 1).getTime();
const oneWeekAgo = subDays(todayDate, 8).getTime();
const oneMonthAgo = subDays(todayDate, 30).getTime();

const parent = {
  id: 'ImTheParent',
  parentId: null,
  text: 'test',
  createdAt: oneMonthAgo,
  isLiked: false,
  authorName: 'user1',
};
const child1 = {
  id: 'ImTheChild1',
  parentId: 'ImTheParent',
  text: 'test',
  createdAt: oneWeekAgo,
  isLiked: false,
  authorName: 'user3',
};
const child2 = {
  id: 'ImTheChild2',
  parentId: 'ImTheParent',
  text: 'test',
  createdAt: yesterday,
  isLiked: false,
  authorName: 'user2',
};
const grandChild = {
  id: 'ImTheGrandChild',
  parentId: 'ImTheChild1',
  text: 'test',
  createdAt: today,
  isLiked: false,
  authorName: 'user4',
};
const root1 = {
  id: 'rootComment1',
  parentId: null,
  text: 'test',
  createdAt: yesterday,
  isLiked: false,
  authorName: 'user2',
};
const root2 = {
  id: 'rootComment2',
  parentId: null,
  text: 'test',
  createdAt: oneWeekAgo,
  isLiked: false,
  authorName: 'user3',
};
const root3 = {
  id: 'rootComment3',
  parentId: null,
  text: 'test',
  createdAt: today,
  isLiked: false,
  authorName: 'user1',
};

export const parentId = parent.id;
export const child1Id = child1.id;
export const child2Id = child2.id;
export const grandChildId = grandChild.id;
export const root1Id = root1.id;
export const root2Id = root2.id;
export const root3Id = root3.id;

export const mockedComments = [parent, child1, child2, grandChild];
export const mockedCommentsWithNoNesting = [root1, root2, root3];
export const mockedReplies = [
  { comment: child2, children: [] },
  { comment: child1, children: [] },
  { comment: grandChild, children: [] },
  { comment: parent, children: [] },
];

export const mockedNestedReplies = [
  {
    comment: parent,
    children: [
      {
        comment: child2,
        children: [],
      },
      {
        comment: child1,
        children: [
          {
            comment: grandChild,
            children: [],
          },
        ],
      },
    ],
  },
];
