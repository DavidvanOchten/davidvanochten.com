export const appendView = (data, parent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const content = doc.querySelector('[data-view]');
  return parent.appendChild(content);
};
