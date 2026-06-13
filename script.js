import { create, insert, search } from 'https://cdn.jsdelivr.net/npm/@orama/orama@latest/+esm';

const db = await create({
  schema: { title: 'string', content: 'string' }
});

// Demo data
await insert(db, { title: 'Microsoft Edge', content: 'A fast, secure browser by Microsoft.' });
await insert(db, { title: 'GitHub Pages', content: 'Free hosting for static websites.' });
await insert(db, { title: 'Orama', content: 'Lightweight JavaScript search engine.' });

window.doSearch = async () => {
  const query = document.getElementById('searchBox').value;
  const results = await search(db, { term: query });
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = results.hits.map(hit =>
    `<div class="result"><b>${hit.document.title}</b>: ${hit.document.content}</div>`
  ).join('');
};
