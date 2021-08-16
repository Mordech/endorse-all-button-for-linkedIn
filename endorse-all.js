// @ts-check

(function () {
  /**
   * @function
   * Use this function to find long selectors using only part of their name
   * @param {string} word
   * @returns {string}
   */

  function contains(word) {
    return `*[class*="${word}"]`;
  }
  class EndorseAllButton {
    /**
     * @param {HTMLButtonElement} element
     * @param {Boolean} isClicked
     */

    constructor(element = document.createElement("button"), isClicked = false) {
      this.element = element;
      this.isClicked = isClicked;
      this.element.id = "endorse-all";
      this.element.classList.add(
        "message-anywhere-button",
        "pvs-profile-actions__action",
        "artdeco-button",
      );
      this.element.textContent = "Endorse all";
      this.element.style.backgroundColor = "rgb(5, 118, 66)";
      this.element.onclick = () => this.endorseAll();
    }
    toggleClicked() {
      this.isClicked = true;
    }
    endorseAll() {
      /** @type {HTMLButtonElement} */

      let additionalSkillsButton = document.querySelector(
        contains("additional-skills"),
      );

      additionalSkillsButton.getAttribute("aria-expanded") === "false" &&
        additionalSkillsButton.click();

      /** @type {NodeListOf<HTMLButtonElement>} */

      const endorseButtons = document.querySelectorAll(contains("endorse"));

      endorseButtons.forEach(
        (button) =>
          button.getAttribute("aria-pressed") === "false" && button.click(),
      );

      this.toggleClicked();
    }
  }

  const endorseAllButton = new EndorseAllButton();

  const callback = function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // console.log('A child node has been added or removed.');
        if (
          document.querySelector(contains("skill-categories")) &&
          document.querySelector(contains("profile-photo-edit")) === null &&
          document.querySelector("#endorse-all") === null
        ) {
          document
            .querySelector(contains("skill-categories"))
            .firstChild.appendChild(endorseAllButton.element);
          console.log("Endorse-all button created", endorseAllButton.element);
          break;
        }
        document.querySelector(contains("hoverable-content__close-btn")) &&
          endorseAllButton.isClicked &&
          document
            .querySelector(contains("hoverable-content__close-btn"))
            // @ts-ignore
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

  const body = document.querySelector("body");
  const observer = new MutationObserver(callback);

  observer.observe(body, config);
})();
