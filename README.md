## Skoove Mobile Engineer Coding Challenge (React Native)

Thanks a lot for taking the time for this challenge and for applying at Skoove. Your assignment consists of writing the code for a mockup design in Figma, representing a system of nested comments with replies. This coding challenge is designed to evaluate your engineering skills, focusing on technical proficiency and system design.

### User Story
As a Skoove user, I want to engage with a community platform that allows me to easily read, post, and interact with comments in a structured and user-friendly way.

### Figma Deliverables
You can find figma file in the root of the project [skoove-mockups.fig](skoove-mockups.fig) and upload it to figma to see the design.

| Comments display 1                                   | Comments display 2                                   |
|------------------------------------------------------|------------------------------------------------------|
| ![Comments Display 1](mobile1.png "Comments screen") | ![Comments Display 2](mobile2.png "Comments screen") |

### Functional Requirements

- [ ] **Nested comment system display:** The comment system should be displayed in a nested structure as illustrated in the Figma file
- [ ] **Handling high volume of comments:** Although the platform currently doesn't frequently encounter a high volume of comments, consider optimizations to cover edge cases with a big number of comments, preventing overloading the user interface. Suggest possible optimization strategies in the [document](PROGRESS.md) for future discussion
- [ ] **Comment submission form:** 
    - [ ] Users must be able to add comments by submitting a form
    - [ ] There is no validation for comments; users can enter any text without character limits or validation checks
    - [ ] Comments are restricted to textual format only
    - [ ] When a user clicks the 'Reply' button on a comment, the same form should be displayed with two buttons: 'Reply' and 'Cancel'
    - [ ] 'Cancel' button should reset the form to its initial state, allowing users to add a new comment instead of replying
    - [ ] The form should automatically include the username of the user being replied to, as a reference in the reply
- [ ] **Handling deeply nested comments:** The Figma mockup limits the number of nested comments. Consider and propose UX/UI solutions for replying to comments beyond this limit. Ideas can be noted in the [document](PROGRESS.md). The implementation in code is not mandatory. We leave it up to you
- [ ] **Timestamp on comments:** Each comment should display a timestamp indicating when it was created, like '1 day ago', '2 days ago', etc
- [ ] **After refresh behavior:** After refreshing the app (close the app and open again), it is acceptable if newly added comments are not saved and only the mock data comments are displayed
- [ ] **Comment reactions:** Each comment has a simple 'Like' button with two states
- [ ] **Language Support:** The platform should support English only, with no requirement for other languages

### Non-functional Requirements

- [ ] **Device compatibility:** The application should work on both iOS & Android devices with support for the latest versions. It also should work and look good on small devices (ex: iphone X, iphone SE)
- [ ] **Configurability:** Ensure that components are designed for easy configurability, anticipating future changes
- [ ] **Comments structure and scalability**: When designing the comments structure, keep in mind the potential for a high volume of comments. Try to implement a scalable architecture from the start, optimized for handling a large number of comments efficiently.
- [ ] **Testability:** We recommend writing unit tests to verify the business logic. We leave it up to you to decide which parts of the implementation should be covered by tests, given the constraint of time


### Evaluation Criteria

- [ ] **Correctness**: The implementation should be free of bugs and strictly follows the requirements
- [ ] **Code Quality**: The code should be clean, readable, well-organized, and structured in a way that ensures easy maintenance and future scalability
- [ ] **Visual Implementation**: The implementation should be closely align with the provided Figma mockups
- [ ] **QA**: The implementation should be supported by several unit tests
- [ ] **Documentation**: Feel free to share all thoughts, progress stages and solutions in [document](PROGRESS.md)

### Technical Details

- [ ] **Data storage and state management**: You are free to choose any suitable tools for state management, including various libraries and state managements
- [ ] **Mock data structure:** The task doesn't require any interaction with API. In the 'assets/mockApi.json' folder, put a suitable, scalable structure for mock data that would be received from an API


### How to run the app

This template is build with Expo ([Typescript template](https://docs.expo.dev/guides/typescript/))

[How to run expo on ios emulator](https://docs.expo.dev/workflow/ios-simulator/)

[How to run expo on android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

| Command         | Description                                               |
|-----------------|-----------------------------------------------------------|
| `yarn start`    | Runs in dev mode                                          |
| `yarn test`     | Runs Unit tests                                           |
| `yarn ts:check` | Runs Typescript checks                                    |
| `yarn lint:fix` | Runs Eslint to automatically fix prettier & eslint errors |
| `yarn lint`     | Runs Eslint                                               |

### Possible issues

- Error: watchman --no-pretty get-sockname returned with exit code=1, signal=null, stderr= 2024-04-22T16:54:02,738: [] the permissions on /opt/homebrew/var/run/watchman/* allow others to write to it. Verify that you own the contents and then fix its permissions by running `chmod 0700 '/opt/homebrew/var/run/watchman/*'`
https://stackoverflow.com/questions/55978254/homebrew-permissions-for-watchman-on-muti-user-mac

---
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
