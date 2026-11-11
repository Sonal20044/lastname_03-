
const url = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY';

const outputContainer = document.querySelector('.container');

apiApp();

async function apiApp() {
  const jsonData = await getData(url);
  const newHtml = processData(jsonData);
  outputContainer.innerHTML = newHtml;
}

function processData(data) {
  return `
    <h1>NASA Picture of the Day</h1>
    <h2>${data.title}</h2>
    <p>${data.date}</p>
    ${data.media_type === 'image' && data.hdurl
      ? `<img src="${data.hdurl}" alt="${data.alt || data.title}">`
      : `<p><a href="${data.permalink}">View this picture on NASA</a></p>`}
    <p>${data.explanation}</p>
  `;
}

async function getData(dataUrl) {
  const response = await fetch(dataUrl);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return await response.json();
}
