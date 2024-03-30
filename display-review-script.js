// This is for pages like https://letterboxd.com/churroc/film/the-perks-of-being-a-wallflower/ where the review is displayed and we display the private review but also allow film script to run to edit it.
(async () => {
    const username = document.querySelector('.has-icon.toggle-menu').innerText.toLowerCase();
    const reviewerName = document.querySelector('.title-4>a>span').innerText.toLowerCase();

    if (username === reviewerName) {
        const userReview = document.querySelector('.review.body-text.-prose.-hero.-loose>div>div>p');
        userReview.innerHTML = '<strong>Public Review:</strong><br/>' + userReview.innerHTML;

        const movieTitle = document.querySelector('.film-title-wrapper>a').innerText;
        const moviePrivateReview = (await chrome.storage.sync.get([movieTitle]))[movieTitle];
        if (moviePrivateReview) {
            userReview.innerHTML +=
                '<br/><br/><strong>Private Review: <span style="font-size: x-small">(You only have 1 private review in total which cannot be deleted and remember to click the submit button to save it)</span></strong><br/>' +
                moviePrivateReview +
                '<br/>';
            // This is for pages like https://letterboxd.com/churroc/film/the-perks-of-being-a-wallflower/ where the review is displayed and we display the private review but also allow film script to run to edit it.
        }

        const submit = document.querySelector('#diary-entry-submit-button');
        submit.addEventListener('click', async () => {
            console.log(document.querySelector('#private-review').value);
            chrome.storage.sync.set({ [movieTitle]: document.querySelector('#private-review').value });

            const observer = new MutationObserver(async (mutations, observer) => {
                if (
                    !document
                        .querySelector('.review.body-text.-prose.-hero.-loose>div>div>p')
                        .innerText.includes('Private Review:')
                ) {
                    observer.disconnect();
                    const userReview = document.querySelector('.review.body-text.-prose.-hero.-loose>div>div>p');
                    userReview.innerHTML = '<strong>Public Review:</strong><br/>' + userReview.innerHTML;

                    const movieTitle = document.querySelector('.film-title-wrapper>a').innerText;
                    const moviePrivateReview = (await chrome.storage.sync.get([movieTitle]))[movieTitle];
                    if (moviePrivateReview) {
                        userReview.innerHTML +=
                            '<br/><br/><strong>Private Review: <span style="font-size: x-small">(You only have 1 private review in total which cannot be deleted and remember to click the submit button to save it)</span></strong><br/>' +
                            moviePrivateReview +
                            '<br/>';
                        // This is for pages like https://letterboxd.com/churroc/film/the-perks-of-being-a-wallflower/ where the review is displayed and we display the private review but also allow film script to run to edit it.
                    }
                }
            });

            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }
})();
