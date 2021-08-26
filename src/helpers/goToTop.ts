export default function goToTop(elementId?: string) {
  const element = document.getElementById(
    elementId ? elementId : 'ScreensWrapper__content-wrapper'
  );

  if (element) {
    element.scrollTop = 0;
  }

  return false;
}
