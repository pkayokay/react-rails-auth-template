const csrfToken = document.querySelector('[name=csrf-token]').content;

export const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-Token': csrfToken,
}