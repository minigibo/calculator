export function themeChange() {
  const themeLight = document.querySelector<HTMLElement>(`.light`);
  const themeDark = document.querySelector<HTMLElement>(`.dark`);
  const mainBody = document.querySelector<HTMLElement>(`body`);

  if (!themeLight || !themeDark || !mainBody) {
    throw new Error("Issue with query selectors");
  }
  themeLight.addEventListener(`click`, () => {
    mainBody.classList.add(`themeLight`);
  });

  themeDark.addEventListener(`click`, () => {
    mainBody.classList.remove(`themeLight`);
  });
}
