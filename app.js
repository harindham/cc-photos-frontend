const apigClient = apigClientFactory.newClient({ apiKey: 'b1CrdxDxZ92F0C311QIWL1huTZfkj0UP3mknXpmu' });
const API_BASE = 'https://vp5yzuz8m9.execute-api.us-east-1.amazonaws.com/prod';
const API_KEY = 'b1CrdxDxZ92F0C311QIWL1huTZfkj0UP3mknXpmu';

async function upload() {
  const file = document.getElementById('fileInput').files[0];
  const labels = document.getElementById('customLabels').value;
  if (!file) return alert('Choose a file');

  try {
    const res = await fetch(`${API_BASE}/upload/${encodeURIComponent(file.name)}`, {
      method: 'PUT',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': file.type,
        'x-amz-meta-customLabels': labels
      },
      body: file
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    alert('Uploaded! Indexing may take a few seconds.');
  } catch (e) {
    alert('Upload failed: ' + e.message);
  }
}
// SEARCH
async function search() {
  const q = document.getElementById('searchBox').value.trim();
  const out = document.getElementById('results');
  out.innerHTML = 'Searching...';
  try {// comment
    const res = await apigClient.searchGet({ q }, {}, {});
    const items = res.data.results || [];
    out.innerHTML = items.length
      ? items.map(p => `<figure><img src="${p.url}" width="200"><figcaption>${p.labels.join(', ')}</figcaption></figure>`).join('')
      : 'No results';
  } catch (e) { out.innerHTML = 'Error: ' + e.message; } //comment added
}
