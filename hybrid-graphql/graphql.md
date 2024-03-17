# Media Sharing App API Documentation

## Comment

### Query

- **comments**: `[Comment]`
- **commentsByMediaID(media_id: ID!)**: `[Comment]`
  - Requires authorization token
- **myComments**: `[Comment]`
  - Requires authorization token

### Mutation

- **createComment(media_id: ID!, comment_text: String!)**: `Message`
  - Requires authorization token
- **deleteComment(comment_id: ID!)**: `Message`
  - Requires authorization token
- **updateComment(comment_id: ID!, comment_text: String!)**: `Message`
  - Requires authorization token

## Like

### Query

- **likes**: `[Like]`
- **likesByMediaID(media_id: ID!)**: `[Like]`
- **likesByUserID(user_id: ID!)**: `[Like]`
- **myLikes**: `[Like]`
  - Requires authorization token

### Mutation

- **createLike(media_id: ID!)**: `Message`
  - Requires authorization token
- **deleteLike(like_id: ID!)**: `Message`
  - Requires authorization token

## Media Item

### Query

- **mediaItems**: `[MediaItem]`
- **mediaItem(media_id: ID!)**: `MediaItem`
- **mediaItemsByTag(tag_id: ID!)**: `[MediaItem]`
  - Requires authorization token
- **myMediaItems**: `[MediaItem]`
  - Requires authorization token
- **mostLikedMediaItem**: `MediaItem`
- **mostRatedMediaItem**: `MediaItem`
- **mostCommentedMediaItem**: `MediaItem`

### Mutation

- **createMediaItem(input: MediaItemInput!)**: `MediaItem`
  - Requires authorization token
- **addTagToMediaItem(input: AddTagToMediaItemInput!)**: `MediaItem`
  - Requires authorization token
- **updateMediaItem(media_id: ID, input: MediaItemInput!)**: `MediaItem`
  - Requires authorization token
- **deleteMediaItem(media_id: ID!)**: `Message`
  - Requires authorization token

## Message

### Object

- **message**: `String`

- **LoginResponse**

  - **user**: `User`
  - **token**: `String`
  - **message**: `String`

- **AvailabeResponse**
  - **available**: `Boolean`
  - **message**: `String`

## Rating

### Query

- **ratings**: `[Rating!]`
- **ratingsByMediaID(media_id: ID!)**: `[Rating!]`
- **myRatings**: `[Rating!]`
  - Requires authorization token

### Mutation

- **createRating(media_id: ID!, rating_value: Int!)**: `Message`
  - Requires authorization token
- **deleteRating(rating_id: ID!)**: `Message`
  - Requires authorization token

## Status

### Query

- **statuses**: `[Status]`
- **statusByMediaId(media_id: ID!)**: `Status`

### Mutation

- **createStatus(input: StatusInput!)**: `Status`
  - Requires admin authorization token
- **deleteStatus(input: ID!)**: `Message`
  - Requires admin authorization token
- **updateMediaItemStatus(input: MediaStatusInput!)**: `Message`
  - Allows updating the status of a specific media item
  - Requires authorization token

## Tag

### Query

- **tags**: `[Tag]`
- **tagsByMediaId(media_id: ID!)**: `[Tag]`

### Mutation

- **createTag(input: TagInput!)**: `Tag`
  - Requires authorization token
- **deleteTag(input: ID!)**: `Message`
  - Requires admin authorization token
- **deleteTagFromMediaItem(input: TagInputID!)**: `Message`
  - Requires authorization token

## User

### Query

- **users**: `[User!]`
- **user(user_id: ID!)**: `User`
- **checkToken**: `User`
  - Requires authorization token
- **checkEmail(email: String!)**: `AvailabeResponse`
- **checkUsername(username: String!)**: `AvailabeResponse`

### Mutation

- **register(input: InputUser)**: `User`
- **login(username: String!, password: String!)**: `LoginResponse`
- **updateUser(input: InputUser)**: `User`
  - Requires authorization token
- **deleteUser**: `Message`
  - Requires authorization token
