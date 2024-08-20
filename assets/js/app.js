const cl = console.log;
const values = document.getElementById("values");
const listOfTodos = document.getElementById("listOfTodos");

let TODO_URL = `https://jsonplaceholder.typicode.com/todos`;

let todosArr = [];

const templating = (arr) => {
    let result = '';
    let completed = '';
    
    arr.forEach((ele, i)=> {
        (ele.completed === true) ? completed = 'Yes' : completed = 'No';
        result += `
                        <tr>
                            <td>${i +1}</td>
                            <td>${ele.title}</td>
                            <td>${ele.userId}</td>
                            <td>${completed}</td>
                        </tr>
        
        `
    });

    listOfTodos.innerHTML = result;

}

const newArr = (obj) => {
    for (const key in obj) {
        todosArr.push({...obj[key], id : key})
    }
    return todosArr
}

const makeApiCall = async (methodName, api_url, msgbody) => {
    msgbody = msgbody ? JSON.stringify(msgbody) : null
    let res = await fetch(api_url, {
        method : methodName,
        body : msgbody,
        headers : {
            token : 'get a JWT Token from local Storage'
        }

    })
    return res.json()
    
}

const dataGet = async() => {
    let data = await makeApiCall("GET", TODO_URL)
    cl(data)
    let arr = newArr(data);
    templating(arr)
}

dataGet()

const onValueChange = (eve) => {
    let changeEvent = eve.target.value;
    cl(changeEvent);

    if(changeEvent === 'all'){
        templating(todosArr)
    }else if(changeEvent === 'completed'){
        trueValue = todosArr.filter(ele => ele.completed == true)
        templating(trueValue)
    }else{
        falseValue = todosArr.filter(ele => ele.completed == false);
        templating(falseValue)
    }
}

values.addEventListener("change", onValueChange)