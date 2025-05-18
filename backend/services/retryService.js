export const retryFailed = (notification, attempt = 1) => {
    console.log(`Retrying (${attempt}):`, notification.message);
    if (attempt <= 3) {
        setTimeout(() => {
            console.log(`Retry attempt ${attempt} for notification ID: ${notification._id}`);
            retryFailed(notification, attempt + 1);
        }, 2000);
    } else {
        console.log(`Max retries reached for notification ID: ${notification._id}`);
    }
};