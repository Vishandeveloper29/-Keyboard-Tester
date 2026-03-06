
  // --- SCALE KEYBOARD TO FIT SCREEN ---
  // The keyboard is 1400px wide. We scale it down to fit.
  function scale_keyboard() {
    var scaler   = document.getElementById('kb_scaler');
    var keyboard = document.getElementById('keyboard');
    var available = window.innerWidth - 20; // 10px padding each side
    var kb_width  = keyboard.offsetWidth;   // 1400px
    var ratio = available / kb_width;
    if (ratio > 1) ratio = 1; // never scale up
    scaler.style.transform = 'scale(' + ratio + ')';
    scaler.style.width  = kb_width + 'px';
    // adjust the outer height so page doesn't scroll unnecessarily
    var kb_height = keyboard.offsetHeight;
    scaler.style.height = (kb_height * ratio) + 'px';
  }

  window.addEventListener('load',   scale_keyboard);
  window.addEventListener('resize', scale_keyboard);


  // --- KEY LOGIC ---
  var tested_count = 0;
  var all_keys = document.querySelectorAll('.key');

  function handle_key(key_element) {
    if (!key_element.classList.contains('green')) {
      tested_count++;
      document.getElementById('tested_count').textContent = tested_count;
    }
    key_element.classList.add('green');
  }

  // Click
  for (var i = 0; i < all_keys.length; i++) {
    (function(el) {
      el.addEventListener('click', function() { handle_key(el); });
    })(all_keys[i]);
  }

  // Physical keyboard
  document.addEventListener('keydown', function(event) {
    event.preventDefault();
    var el = document.querySelector('[data-key="' + event.code + '"]');
    if (el) {
      handle_key(el);
      el.style.transform = 'scale(0.88)';
      setTimeout(function() { el.style.transform = ''; }, 100);
    }
  });

  // Reset
  function reset_all() {
    tested_count = 0;
    for (var i = 0; i < all_keys.length; i++) {
      all_keys[i].classList.remove('green');
    }
    document.getElementById('tested_count').textContent = '0';
  }