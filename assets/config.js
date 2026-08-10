// VVIP Gaming Room GitHub Pages frontend -> Apps Script API backend
// Apps Script Web App URL must end with /exec.
window.VVIP_API_URL = 'https://script.google.com/macros/s/AKfycbxaxxQokKUOoU3cR9fdQ8rOil8xJqmyPH8iGB73DK8lZL1zmcmFc9lc6jWGPNw14tig/exec';

// Compatibility patch: use the same JSONP loading pattern that works in objectives-dashboard.
// index.html defines apiJsonp later, so install this replacement after the page script has loaded,
// then retry config + calendar once with the patched loader.
(function () {
  function installReliableJsonp() {
    window.apiJsonp = function (action, params) {
      params = params || {};
      return new Promise(function (resolve, reject) {
        if (!window.VVIP_API_URL) {
          reject(new Error('VVIP_API_URL missing in assets/config.js'));
          return;
        }

        var callbackName = 'cb_' + Date.now() + '_' + Math.floor(Math.random() * 100000);
        var script = document.createElement('script');
        var timeout = setTimeout(function () {
          cleanup();
          reject(new Error('Apps Script API timeout'));
        }, 25000);

        function cleanup() {
          clearTimeout(timeout);
          try { delete window[callbackName]; } catch (e) {}
          if (script.parentNode) script.parentNode.removeChild(script);
        }

        window[callbackName] = function (payload) {
          cleanup();
          if (payload && payload.ok) {
            resolve(payload.data);
          } else {
            reject(new Error(payload && payload.error ? payload.error : 'API error'));
          }
        };

        var url = new URL(window.VVIP_API_URL);
        url.searchParams.set('action', String(action || 'status'));
        Object.keys(params).forEach(function (key) {
          var value = params[key];
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, String(value));
          }
        });
        url.searchParams.set('callback', callbackName);
        url.searchParams.set('_', String(Date.now()));

        script.onerror = function () {
          cleanup();
          reject(new Error('Could not load Apps Script API. Check deployment access.'));
        };
        script.src = url.toString();
        document.body.appendChild(script);
      });
    };
  }

  window.addEventListener('load', function () {
    installReliableJsonp();

    // Retry the two initial calls because the inline page script may have attempted them
    // before this compatibility patch replaced apiJsonp.
    setTimeout(function () {
      try {
        if (typeof window.loadConfig === 'function') window.loadConfig();
        if (typeof window.loadCalendar === 'function') window.loadCalendar();
      } catch (e) {
        console.error('VVIP API retry failed', e);
      }
    }, 350);
  });
})();
