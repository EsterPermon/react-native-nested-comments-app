## Progress

### Proposed solutions for handling deeply nested comments

After doing some research, I came up with 2 possible solutions to handle deeply nested comments, without constraining the nesting level and avoiding overloading.

Note that both approaches:

- are an extention of this project, therefore they follow the structure and nomenclature defined in this code-basis
- require a cross-functional effort, since it would rely on specific endpoints, that will be explained bellow.

---

1. **Show the replies separately in a modal (favorite)**

   For this approch we would need to know beforehand if a comment has replies, therefore a slight change in the `Comment` structure is required:

   ```
   type Comment = {
      id: string;
      parentId: string | null;
      ...
      hasChildren: boolean
   }
   ```

   Here are the implementation steps:

   - Initially, the application would show only root comments (comment without a parent). For that we would need the endpoint `/getRootComments`, that would return only comments with `parentId` equals to `null`, and supports pagination to handle huge amounts of data.

   - All comments with its `hasChildren` property set as `true` would have a **"see replies"** button. Whenever this button were clicked, we would render a `Modal` that would show the comment body on top, and all its all replies listed bellow.
   - For that we would need the endpoint `/getCommentReplies`, that would recieve a comment id and return all comments with this value set as `parentId`, sorted desc, and supports pagination to handle huge amounts of data.

   - **Reply** button would follow the same behaviour as **"see replies"** button (not overlapping modals, just updating its content).

   ***

2. **Only two visual levels of nesting: 1st with root comments, 2nd with all replies in a flat list**

   In order to keep only two levels of nesting, we would always link the reply to both the root comment, and the replied comment. This approch would require a slight change in the reply logic, and therefore in the comment concept adopted in this project.

   We would have two entities:

   ```
   type Comment = {
       id: string;
       ...
       hasChildren: boolean
   }

    type Reply = {
       id: string,
       ...
       parentId: string;
       rootCommentId: string;
   }
   ```

   Meaning that, instead of this nested hierarchy

   > parent(`typeof Comment`) > child(`typeof Reply`) > grandchild(`typeof Reply`)

   We would have this new flat structure

   > parent(`typeof Comment`) > child(`typeof Reply`)
   >
   > parent(`typeof Comment`) > grandchild(`typeof Reply`)

   Here are the implementation steps:

   - Initially, the application would show only root comments (`typeof Comment`), for that we would need the endpoint `/getRootComments`, that would return only comments, and supports pagination to handle huge amounts of data.

   - Then, whenever a root comment had its `hasChildren` property set as `true`, we would show a button **"show replies"**. Whenever this button were clicked, we would render another list (rigth bellow the comment, with one level of nesting in the UI), that would show all replies.
   - For that we would need the endpoint `/getCommentReplies`, that would recieve a comment id and return only this comment's replies, sorted desc, and supports pagination to handle huge amounts of data.

   - In order to not lose track of which comment was actually replied, we could:

     - attach the `currentReplyAuthorMention` to the reply body
     - and even add a trucated quote reply for the replied comment, with a anchor

   - **Reply** button would follow the same behaviour as **"see replies"** button.

### Things I would've implemented with more time

Due the time constraint, I decided to only add unit tests for the following logics:

- nesting logic
- sorting logic
- formatted comment creation date logic

However, with more time, I would've add e2e tests to cover the following functionalities:

- Add new comment

  - New comment should be added to the list on submit button click
  - Empty comments should not be added
  - Submit button label should be "Send"
  - Cancel button should only be rendered when input has value
  - Cancel button click should reset input and not add comment

- Reply comment

  - Click on reply button should set input focus
  - Click on reply button should render replied comment author name
  - Submit reply should not add replied comment author name to comment body
  - Submit button label should change to "Reply"
  - Reply button should not be rendered on comment when nesting level reaches `MAX_NESTED_REPLIES`

- Like comment
  - Heart icon should be filled in color red when comment `isLiked` state is set to `true`
  - Heart icon should NOT be filled when comment `isLiked` state is set to `false`

### Considerations

1. Due the lack of logic to retrieve data from users, adding or replying comments always set `username` property to `me`. Ideally we would have an endpoint to fetch currently logged in user data, and retrieve username from our store.

   Additionally, the structure of the `Comment` entity would contain `authorId` instead of `authorName` and then we would fetch the comment author user data in order to display the comment's author name.

2. Just as all data, the `isLiked` comment state is not persisted on reload, therefore I only used a simple `useState` and didn't dispatch any action on the store to persist this change. Ideally we would have an endpoint to modify this property on the database.

3. Since the layout already resctricts the level of nesting replies to 4, I decided to not render the reply button, to prevent replies in this case. Even though this doesn't match the figma prototype, I realised it would be the easiest way to implement this constraint.

4. Even though no validations are required on the comments form, I decided not to allow empty comments submission, to present a good ui/ux.
