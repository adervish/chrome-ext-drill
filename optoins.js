// Saves options to chrome.storage.sync.
function save_options() {
  var orders = document.getElementById('orders').checked;
  chrome.storage.sync.set({
    orders: orders
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    orders: true
  }, function(items) {
    document.getElementById('orders').checked = items.orders;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
