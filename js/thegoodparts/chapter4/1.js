// 单一职责
function trimAndCapitalize(s) {
  s = trimString(s)
  s = capitalizeString(s)
  return s
}

function trimString(s) {
  return s.trim();
}

function capitalizeString(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

console.log(trimAndCapitalize(' hello '))