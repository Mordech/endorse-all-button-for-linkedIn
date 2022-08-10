// @ts-check

(function () {
  class EndorseAllButton {
    /**
     * @param {HTMLButtonElement} element
     */

    constructor(element = document.createElement("button")) {
      this.element = element;
      this.element.id = "endorse-all";
      this.element.classList.add(
        "message-anywhere-button",
        "pvs-profile-actions__action",
        "artdeco-button",
      );
      this.element.textContent = "Endorse all";
      this.element.style.backgroundColor = "rgb(5, 118, 66)";
      this.element.style.alignSelf = "center";
      this.element.onclick = () => this.endorseAll();
    }

    endorseAll() {
      /** @type {HTMLButtonElement} */
      document
        .querySelectorAll("button")
        .forEach(
          (item) =>
            item.querySelector("span")?.textContent?.trim() === "Endorse" &&
            item.click(),
        );
    }
  }

  const endorseAllButton = new EndorseAllButton();

  setInterval(() => {
    if (
      document.querySelector("#endorse-all") === null &&
      document.querySelector("h2[class*='t-20']")?.textContent?.match("Skills")
    ) {
      document
        .querySelector("h2[class*='t-20']")
        ?.parentElement?.appendChild(endorseAllButton.element) &&
        console.log("button created");
    }
  }, 60);
})();
