(function () {
	function contains(word) {
		return `*[class*="${word}"]`;
	}

	const body = document.querySelectorAll('body')[0];

	const endorseAllButton = document.createElement('button');
	endorseAllButton.id;
	endorseAllButton.id = 'endorse-all';
	endorseAllButton.classList.add('message-anywhere-button');
	endorseAllButton.classList.add('pvs-profile-actions__action');
	endorseAllButton.classList.add('artdeco-button');
	endorseAllButton.textContent = 'Endorse all';
	endorseAllButton.style.backgroundColor = 'rgb(5, 118, 66)';
	endorseAllButton.onclick = () => endorseAll();

	function endorseAll() {
		document
			.querySelectorAll(contains('additional'))
			.forEach(
				(item) => item.getAttribute('aria-expanded') === 'false' && item.click()
			);

		document
			.querySelectorAll(contains('endorse'))
			.forEach(
				(item) => item.getAttribute('aria-pressed') === 'false' && item.click()
			);
	}

	const callback = function (mutationsList, observer) {
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
