import { createError } from './errors';

export function validateFeedbackData(feedbackData) {
  if (!feedbackData || typeof feedbackData !== 'object' || Array.isArray(feedbackData)) {
    return createError('INVALID_DATA', 'feedbackData must be an object.');
  }

  const { feedbackRating, feedbackComment, durationSec } = feedbackData;

  if (!feedbackRating || !['good', 'normal', 'bad'].includes(feedbackRating)) {
    return createError(
      'INVALID_DATA',
      'feedbackRating is required and must be "good", "normal", or "bad".'
    );
  }

  if (
    feedbackComment !== undefined &&
    (typeof feedbackComment !== 'string' || feedbackComment.length > 500)
  ) {
    return createError(
      'INVALID_DATA',
      'feedbackComment must be a string with a maximum length of 500 characters.'
    );
  }

  if (durationSec !== undefined && (typeof durationSec !== 'number' || durationSec < 0)) {
    return createError('INVALID_DATA', 'durationSec must be a non-negative number.');
  }

  return null;
}
