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
        "ml2",
        "white-space-nowrap",
        "artdeco-pill",
        "artdeco-pill--slate",
        "artdeco-pill--3",
        "artdeco-pill--choice",
        "artdeco-pill--selected",
        "ember-view",
      );
      this.element.textContent = "Endorse all";
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

  const skillsTitle = "h1[class*='t-20']";

  setInterval(() => {
    if (
      document.querySelector("#endorse-all") === null &&
      document.querySelector(skillsTitle)?.textContent?.match("Skills")
    ) {
      document
        .querySelector(skillsTitle)
        ?.parentElement?.appendChild(endorseAllButton.element) &&
        console.log("button created");
    }
  }, 60);
})();
