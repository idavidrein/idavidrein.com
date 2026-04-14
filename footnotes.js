function positionPopup(ref) {
  var popup = ref.querySelector('.footnote-popup');
  var body = ref.closest('.post-body');
  if (!popup || !body) return;

  // Reset so we can measure cleanly
  popup.style.left = '0';
  popup.style.top = '0';

  var bodyRect = body.getBoundingClientRect();
  var refRect = ref.getBoundingClientRect();

  // Place above the ref, 8px gap
  var top = refRect.top - bodyRect.top - popup.offsetHeight - 8;
  var left = refRect.left - bodyRect.left;

  // Clamp horizontally within .post-body
  var maxLeft = body.clientWidth - popup.offsetWidth;
  if (left > maxLeft) left = Math.max(0, maxLeft);
  if (left < 0) left = 0;

  popup.style.top = top + 'px';
  popup.style.left = left + 'px';
}

// Click/tap
document.addEventListener('click', function (e) {
  var ref = e.target.closest('.footnote-ref');
  if (ref) {
    // Let links inside the popup work normally
    if (e.target.closest('.footnote-popup a')) return;
    e.preventDefault();
    e.stopPropagation();
    document.querySelectorAll('.footnote-ref.active').forEach(function (el) {
      if (el !== ref) el.classList.remove('active');
    });
    var wasActive = ref.classList.contains('active');
    ref.classList.toggle('active');
    if (!wasActive) positionPopup(ref);
  } else {
    document.querySelectorAll('.footnote-ref.active').forEach(function (el) {
      el.classList.remove('active');
    });
  }
});

// Hover (desktop only)
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.footnote-ref').forEach(function (ref) {
    ref.addEventListener('mouseenter', function () {
      ref.classList.add('hover');
      positionPopup(ref);
    });
    ref.addEventListener('mouseleave', function () {
      ref.classList.remove('hover');
    });
  });
}

// Keyboard focus
document.querySelectorAll('.footnote-ref').forEach(function (ref) {
  ref.addEventListener('focus', function () {
    ref.classList.add('hover');
    positionPopup(ref);
  });
  ref.addEventListener('blur', function () {
    ref.classList.remove('hover');
  });
});
