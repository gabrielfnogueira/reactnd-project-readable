export function getCategoryFromURL() {
  let category = null;

  if (window.location.pathname.lastIndexOf('/') === 0) {
    category = window.location.pathname === '/' ? window.location.pathname : window.location.pathname.substring(1);
  } else {
    category = window.location.pathname.substring(1, window.location.pathname.lastIndexOf('/'));
  }

  return category;
}
