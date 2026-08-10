// VVIP Gaming Room — GitHub Pages/API bridge
// IMPORTANT: Existing Code.gs доторх хуучин doGet(e) функцийг ЭНЭ doGet(e)-ээр солино.
// apiOutput_ функцийг мөн Code.gs-д нэмнэ.

function doGet(e) {
  const params = (e && e.parameter) || {};
  const action = String(params.action || 'status');

  // Админы баталгаажуулах/цуцлах холбоосууд хуучнаараа HTML page буцаана.
  if (action === 'confirm' || action === 'cancel') return handleAdminAction_(params);

  const callback = params.callback;
  try {
    let data;
    switch (action) {
      case 'status':
        data = { serviceName: CONFIG.SERVICE_NAME, ok: true, mode: 'github-pages-api' };
        break;
      case 'config':
        data = getConfig();
        break;
      case 'availability':
        data = getCalendarAvailability(params.start, params.end);
        break;
      case 'book':
        data = createBooking({
          name: params.name || '',
          phone: params.phone || '',
          email: params.email || '',
          guestCount: params.guestCount || '',
          date: params.date || '',
          shift: params.shift || '',
          note: params.note || ''
        });
        break;
      default:
        throw new Error('Unknown API action: ' + action);
    }
    return apiOutput_({ ok: true, data: data }, callback);
  } catch (err) {
    return apiOutput_({ ok: false, error: err && err.message ? err.message : String(err) }, callback);
  }
}

function apiOutput_(payload, callback) {
  const text = JSON.stringify(payload);
  if (callback) {
    const safeCallback = String(callback).replace(/[^a-zA-Z0-9_.$]/g, '');
    return ContentService.createTextOutput(safeCallback + '(' + text + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.JSON);
}
