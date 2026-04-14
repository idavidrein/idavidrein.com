// Toggle footnote popups on click/tap
document.addEventListener('click', function (e) {
  var ref = e.target.closest('.footnote-ref');
  if (ref) {
    e.stopPropagation();
    // Close others
    document.querySelectorAll('.footnote-ref.active').forEach(function (el) {
      if (el !== ref) el.classList.remove('active');
    });
    ref.classList.toggle('active');
  } else {
    // Click outside closes all
    document.querySelectorAll('.footnote-ref.active').forEach(function (el) {
      el.classList.remove('active');
    });
  }
});
