const endpoint = process.env.ENDPOINT || 'http://localhost:8888/api/book-consultation';

const sample = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '555-1234',
  message: 'This is a test submission',
  stage: 'initial'
};

async function run() {
  console.log('Posting sample to', endpoint);
  try {
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sample) });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (err) {
    console.error('Error posting sample:', err);
  }
}

run();
