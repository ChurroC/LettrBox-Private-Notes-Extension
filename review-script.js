// Runs when they try to review a movie

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

(async () => {
    // console.log('Review script running');
    // const review = document.querySelector('form[id=diary-entry-form]>fieldset>div.form-row:nth-of-type(2)');
    // review.innerHTML = '<strong>Public Review:</strong>' + review.innerHTML;

    // const privateReview = review.cloneNode(true);
    // const movieTitle =
    //     document.querySelector('.film-title-wrapper>a')?.innerText ??
    //     document.querySelector('.headline-1.js-widont.prettify')?.innerText;

    // privateReview.querySelector('textarea').value = (await chrome.storage.sync.get([movieTitle]))[movieTitle] ?? '';
    // privateReview.querySelector('textarea').id = 'private-review';
    // privateReview.querySelector('strong').innerHTML =
    //     'Private Review: <span style="font-size: x-small">(You only have 1 private review in total which cannot be deleted and remember to click the submit button to save it)</span>';

    // review.insertAdjacentElement('afterend', privateReview);

    // const submit = document.querySelector('#diary-entry-submit-button');
    // submit.addEventListener('click', () => {
    //     chrome.storage.sync.set({ [movieTitle]: document.querySelector('#private-review').value });
    // });

    const movieTitle =
        document.querySelector('.film-title-wrapper>a')?.innerText ??
        document.querySelector('.headline-1.js-widont.prettify')?.innerText;

    const exampleSection = await waitForElm('aside>section>ul>li:nth-of-type(3)');
    console.log(exampleSection);
    const privateReviewSection = exampleSection.cloneNode(true);
    privateReviewSection.innerText = 'Private Review';

    privateReviewSection.addEventListener('click', async () => {
        document.querySelector('aside>section>ul>li:nth-of-type(5)>a').click();
        document.querySelector('#modal').style.display = 'none';

        const modal = document.querySelector('#modal').cloneNode(true);
        modal.style.display = 'block';
        modal.querySelector('section:nth-of-type(2)>h1').innerText = 'EDIT PRIVATE DIARY ENTRY';
        modal.querySelector('.form-row.specified-dates').remove();
        modal.querySelector('.form-row.clearfix').remove();
        modal.id = 'private-review-modal';

        const privateReview = modal.querySelector('textarea');
        privateReview.value = (await chrome.storage.sync.get([movieTitle]))[movieTitle] ?? '';
        privateReview.id = 'private-review';

        const nameWithReviewTextbox = modal.querySelector('fieldset > div.form-row:nth-of-type(2)');
        nameWithReviewTextbox.innerHTML =
            '<strong>Private Review: <span style="font-size: x-small">(You only have 1 private review in total which cannot be deleted and remember to click the submit button to save it)</span></strong>' +
            nameWithReviewTextbox.innerHTML;

        document.querySelector('#cboxLoadedContent').appendChild(modal);
    });

    exampleSection.insertAdjacentElement('afterend', privateReviewSection);
})();
