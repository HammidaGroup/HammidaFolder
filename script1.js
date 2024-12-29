const token = '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'; // GitHub का PAT
const owner = 'HammidaGroup'; // रिपोजिटरी का मालिक
const repo = 'HammidaFolder'; // रिपोजिटरी का नाम

async function getRepoFiles(path = '') {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.status}`);
    }

    const data = await response.json();
    let files = [];

    for (const item of data) {
      if (item.type === 'file') {
        files.push(item);
      } else if (item.type === 'dir') {
        const subDirFiles = await getRepoFiles(item.path);
        files = files.concat(subDirFiles);
      }
    }

    return files;
  } catch (error) {
    console.error('Error fetching repository files:', error.message);
    return [];
  }
}

const box = document.getElementById("box");

function appendContent(fil) {
  // Check if the file is an image based on its extension
  const imgExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
  if (imgExtensions.some(ext => fil.name.toLowerCase().endsWith(ext))) {
    const img = document.createElement("img");
    img.src = fil.download_url; // Use download_url for images
    img.alt = fil.name;
    box.appendChild(img);
  } else {
    alert(`Skipping non-image file: ${fil.name}`);
  }
}

// Example Usage
getRepoFiles().then((files) => {
  console.log('Files in repository:', files);
  console.log('Total files:', files.length);
  files.forEach((fil) => {
    console.log(fil.name);
    appendContent(fil);
  });
});

const number = Math.floor(Math.random()*10)
box.innerHTML = number;
