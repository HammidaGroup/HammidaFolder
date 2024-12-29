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
    console.log(data[0])
    let files = [];

    for (const item of data) {
      if (item.type === 'file') {
        files.push(item.path); // केवल फाइल का नाम या पथ जोड़ें
      } else if (item.type === 'dir') {
        // डायरेक्टरी के अंदर की फाइलें प्राप्त करें
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

const box = document.getElementById("box") 
function appendContent(fil) {
  // Tab to edit
  const img = document.createElement("img") 
  img.src = fil
  box.appendChild(img)
}
// Example Usage
getRepoFiles().then((files) => {
  console.log('Files in repository:', files);
  console.log('Total files:', files.length);
  files.map((fil)=>{
    console.log(fil)
    appendContent(fil)
  })
});

