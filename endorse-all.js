(function () {
	function contains(word) {
		return `*[class*="${word}"]`;
	}

	const body = document.querySelectorAll('body')[0];

	const endorseAllButton = document.createElement('button');
	endorseAllButton.id = 'endorse-all';
	endorseAllButton.classList.add('message-anywhere-button');
	endorseAllButton.classList.add('pvs-profile-actions__action');
	endorseAllButton.classList.add('artdeco-button');
	endorseAllButton.textContent = 'Endorse all';
	endorseAllButton.style.backgroundColor = 'rgb(5, 118, 66)';
	endorseAllButton.onclick = () => endorseAll();
	let endorseButtonClick = false;

	function endorseAll() {
		const additionalSkillsButton = document.querySelector(
			contains('additional-skills')
		);

		additionalSkillsButton.getAttribute('aria-expanded') === 'false' &&
			additionalSkillsButton.click();

		const endorseButtons = document.querySelectorAll(contains('endorse'));

		endorseButtons.forEach(
			(item) => item.getAttribute('aria-pressed') === 'false' && item.click()
		);

		endorseButtonClick = true;
	}

	const callback = function (mutationsList) {
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				// console.log('A child node has been added or removed.');
				if (
					document.querySelectorAll(contains('skill-categories'))[0] &&
					document.querySelectorAll(contains('profile-photo-edit'))[0] ===
						undefined &&
					document.getElementById('endorse-all') === null
				) {
					document
						.querySelectorAll(contains('skill-categories'))[0]
						.firstChild.appendChild(endorseAllButton);
					console.log('endorseAllButton created.');
					break;
				}
				document.querySelector(contains('hoverable-content__close-btn')) &&
					endorseButtonClick &&
					document
						.querySelector(contains('hoverable-content__close-btn'))
						.click();
				break;
			}
		}
	};

	const config = {
		attributes: false,
		childList: true,
		subtree: true,
	};

	const observer = new MutationObserver(callback);
	observer.observe(body, config);
})();
