// FRONT END FILE TO INTERACT WITH THE DOM

let addButton = document.getElementById('btn-agregar')
let addButton2 = document.getElementById('btn-img')
let inputButton = document.getElementById('tareaInput')

let inputButton2 = document.getElementById('imgInput')
let list = document.getElementById('lista')




const delTaskToDB = (infos) => {
    fetch('/api/deltask', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infos),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


const addTaskToDB = (infos) => {
    fetch('api/addTask', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(infos),
    }) 
    .then(response => response.json())
    .then(data => {
        console.log('succes:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}



const GetTaskFromDB = () => {
    fetch('api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        console.log(data.data);
        data.data.forEach((element, index) => {
            console.log(element);
            let tasks = 
            `<li>
            <a class="Test" href="#"> ${element.content} </a> 
            <form>
            <input class="checkbox" type="checkbox" value="Done">
            </form>
            </li>`
            list.insertAdjacentHTML('beforeend', tasks) 
        });
        let a = document.querySelectorAll('.Test')
        a.forEach((element,index) => {
            element.addEventListener('click', () => {
                delTaskToDB({data: data.data[index]})
                list.innerHTML = ''
                setTimeout(function(){
                    GetTaskFromDB();
                }, 100);
            })
 
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

addButton.addEventListener('click', () => {
    let dataArray = []
    let data = inputButton.value
    dataArray.push(data);
    addTaskToDB(dataArray);
    list.innerHTML = ''
      setTimeout(function(){
        GetTaskFromDB();
       }, 100);

})

window.addEventListener('load', () => {   
    list.innerHTML = ''
    GetTaskFromDB()
})



