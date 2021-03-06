/* eslint-disable */
const showButton = document.getElementById('show'); 
const searchButton = document.getElementById('search'); 
const form = document.getElementById('upload');

if (showButton) {
  showButton.addEventListener('click', e => {
    showModels();
  });
}

if (searchButton) {
  searchButton.addEventListener('click', e => {
    const searchInput = document.getElementById('searchInput').value; 

    searchModel(searchInput);
  });
}

const searchModel = async(model) => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/models'
    });
    
    const modelItems = res.data.data;
    const modelItemsNames = modelItems.map((e)=>{return e.name});
    const valueInput = document.getElementById("valueInput"); 
    
    let message; 
    if (modelItemsNames.includes(model)) {
      message = `Model: '${model}' found`;
    } else {
      message = `Model: '${model}' not found`
    }

    valueInput.innerHTML = message;

  } catch (err) {
    console.error(err); 
  } 
}

const showModels = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/models'
    });
    
    const modelItems = res.data.data;
    createModelList(modelItems);

  } catch (err) {
    console.error(err); 
  }
};

const createModelList = modelItems => {
  const modelList = document.createElement('ul');
  document.getElementById('renderList').appendChild(modelList);

  if (Array.isArray(modelItems) && modelItems.length > 0) {
    modelItems.map(modelItem => {
      modelList.appendChild(createModelElement(modelItem));
    });

  } else if (modelItems) {
    modelList.appendChild(createModelElement(modelItems));
  }
}

const createModelElement = item => {
  const modelElement = document.createElement('li');
  const btnDlt = document.createElement('button');
  btnDlt.appendChild(document.createTextNode("Remove"));

  modelElement.appendChild(document.createTextNode(item.name));
  modelElement.appendChild(btnDlt);
  modelElement.dataset.id = item._id;

  btnDlt.onclick = function() {
    const id = btnDlt.parentElement.dataset.id;

    deleteModel(id);
    this.parentElement.style.display = "none";
  }
  return modelElement;
};

const deleteModel = async (modelId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:8000/api/v1/models/${modelId}`
    });

  } catch (err) {
    console.error(err); 
  }
}

form.addEventListener("submit", function (event) {
	event.preventDefault();

  const name = form.elements['name'].value;
  const model = form.elements['model'].value;;
  createModel(name, model);
});

const createModel = async (name, model) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/models',
      data: {
        model: model,
        name: name,
      },
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    });

    if (res.status === 'success') {
      alert('Model successfully uploaded')
    }

  } catch (err) {
    console.error(err); 
  }
};