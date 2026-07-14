export const openContactFormEvent = 'open-contact-form';

export function openContactForm() {
  window.dispatchEvent(new CustomEvent(openContactFormEvent));
}
