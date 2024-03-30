// Runs when they try to review a movie

(async () => {
    // console.log('Review script running');
    // const review = document.querySelector('form[id=diary-entry-form]>fieldset>div.form-row:nth-of-type(2)');
    // review.innerHTML = '<strong>Public Review:</strong>' + review.innerHTML;

    const privateReview = review.cloneNode(true);
    const movieTitle =
        document.querySelector('.film-title-wrapper>a')?.innerText ??
        document.querySelector('.headline-1.js-widont.prettify')?.innerText;

    privateReview.querySelector('textarea').value = (await chrome.storage.sync.get([movieTitle]))[movieTitle] ?? '';
    privateReview.querySelector('textarea').id = 'private-review';
    privateReview.querySelector('strong').innerHTML =
        'Private Review: <span style="font-size: x-small">(You only have 1 private review in total which cannot be deleted and remember to click the submit button to save it)</span>';

    review.insertAdjacentElement('afterend', privateReview);

    // const submit = document.querySelector('#diary-entry-submit-button');
    // submit.addEventListener('click', () => {
    //     chrome.storage.sync.set({ [movieTitle]: document.querySelector('#private-review').value });
    // });
    const modal = document.querySelector('#modal').cloneNode(true);
    modal.querySelector('section:nth-of-type(2)>h1').innerText = 'EDIT PRIVATE DIARY ENTRY';
    modal.querySelector('.form-row.specified-dates').remove();
    modal.querySelector('.form-row.clearfix').remove();
    modal.id = 'private-review-modal';

    const privateReview = review.cloneNode(true);
    const movieTitle =
        document.querySelector('.film-title-wrapper>a')?.innerText ??
        document.querySelector('.headline-1.js-widont.prettify')?.innerText;

    privateReview.querySelector('textarea').value = (await chrome.storage.sync.get([movieTitle]))[movieTitle] ?? '';
    privateReview.querySelector('textarea').id = 'private-review';
    privateReview.querySelector('strong').innerHTML =
        'Private Review: <span style="font-size: x-small">(You only have 1 private review in total which cannot be deleted and remember to click the submit button to save it)</span>';

    privateReviewSection.addEventListener('click', async () => {
        document.querySelector('#cboxLoadedContent').appendChild(modal);
        document.querySelector('#cboxOverlay').style.opacity = 0.9;
    });

    exampleSection.insertAdjacentElement('afterend', privateReviewSection);
})();
