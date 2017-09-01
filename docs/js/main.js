
var completeSVG = '<svg width="45px" height="45px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="compl"> <g id="Tick" transform="translate(9.000000, 9.000000)"> <circle id="Oval-619" fill="#DBDBDB" cx="21.5" cy="21.5" r="21.5"></circle> <path d="M18.6140153,26.9233805 L13.7250151,22.0343804 L13.0912961,21.4006614 L11.8238583,22.6680993 L12.4575772,23.3018183 L18.1257318,28.9699729 L18.7594508,29.6036919 L20.0268887,28.336254 L19.8814531,28.1908184 L19.9985126,28.073759 L32.7336151,15.3386568 L33.3673341,14.7049379 L32.0998962,13.4375 L31.4661772,14.0712189 L18.7310747,26.8063211 L18.6140153,26.9233805 Z" id="Combined-Shape" stroke="#FFFFFF" stroke-width="0.75" stroke-linecap="square" fill="#FFFFFF"></path> </g> </g> </g> </svg>';
var removeSVG = '<svg width="45px" height="45px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="rm" fill="#FB1515"> <g id="Global-Element-/-Bottom-Bar-Icons-/-Delete" transform="translate(16.000000, 12.000000)"> <path d="M20.6323158,2.96 C20.6323158,1.32534 19.3126316,0 17.6849474,0 L10.3165263,0 C8.68884211,0 7.36915789,1.32534 7.36915789,2.96 L7.36915789,4.44 L0,4.44 L0,5.92 L1.65789474,5.92 L2.94663158,34.78 C2.94663158,34.78 3.41010526,37 5.15715789,37 L13.2624211,37 L14.7361053,37 L22.8413684,37 C24.5891579,37 25.0526316,34.78 25.0526316,34.78 L26.2809474,5.92 L28,5.92 L28,4.44 L20.6323158,4.44 L20.6323158,2.96 Z M8.84284211,2.96 C8.84284211,2.1423 9.61308772,1.48 10.5621404,1.48 L17.4393333,1.48 C18.388386,1.48 19.1586316,2.14304 19.1586316,2.96 L19.1586316,4.44 L8.84284211,4.44 L8.84284211,2.96 L8.84284211,2.96 Z M22.8421053,35.51926 L14.7368421,35.51926 L13.2631579,35.51926 L5.15789474,35.51926 C5.15789474,35.51926 4.54484211,35.1833 4.42105263,34.03926 C4.298,32.89522 3.13157895,5.91926 3.13157895,5.91926 L24.7453684,5.91926 C24.7461053,5.91926 23.7027368,32.89522 23.5796842,34.03926 C23.4558947,35.1833 22.8421053,35.51926 22.8421053,35.51926 Z M19.8954737,8.88 L18.4217895,8.88 L17.6849474,32.56 L19.1586316,32.56 L19.8954737,8.88 Z M10.3165263,32.56 L9.57968421,8.88 L8.10526316,8.88 L8.84210526,32.56 L10.3165263,32.56 Z M13.2631579,8.88 L14.7368421,8.88 L14.7368421,32.56 L13.2631579,32.56 L13.2631579,8.88 Z" id="Global-Elements-/-Bottom-Bar-Icons-/-Delete"></path> </g> </g> </g> </svg>';


window.addEventListener("load", fetchTodoList);
window.addEventListener("load", fetchCompetedList);

document.getElementById('submit').addEventListener('click', function(){
    var id = new Date();
    var ID = String(id.getTime());
    var text = document.getElementById('input');
    var inputText = text.value;

    if(inputText != ''){

        var listObj = {
            id: ID,
            content: inputText
        }

        if(localStorage.getItem('todoList') === null){
            // Init array
            var list = [];
            // Add to array
            list.push(listObj);
            // Set to localStorage
            localStorage.setItem('todoList', JSON.stringify(list));
        } else {
            // Get bookmarks from localStorage
            var list = JSON.parse(localStorage.getItem('todoList'));
            // Add bookmark to array
            list.push(listObj);
            // Re-set back to localStorage
            localStorage.setItem('todoList', JSON.stringify(list));
        }
        // this is not related to the actual storage.
        var ul = document.getElementById('list');
        var li = document.createElement('li');

        li.setAttribute("id", ID);
        li.innerHTML = '<p>' + inputText + '</p>' + '<button id="complete" onclick="complete(this)">' + completeSVG + '</button>' + '<button id="remove" onclick="removeButton(this)">' + removeSVG +'</button>';
        ul.insertBefore(li, ul.childNodes[0]);

        // reset input value after adding a NEW ITEM
        text.value='';
    }
});

function complete(e){

    var tempID = $(e).parents("li").attr("id");
    var itemList = JSON.parse(localStorage.getItem('todoList'));


    //search for the ID
    for(var i = 0; i < itemList.length; i++)
    {
        if(itemList[i].id == tempID){
            var input = itemList[i].content;
            itemList.splice(i, 1);
        }
    }

    // Store back to local storage
    localStorage.setItem('todoList', JSON.stringify(itemList));

    // remove li from todoList
    var li = document.getElementById(tempID);
    li.parentNode.removeChild(li);


    var listObj = {
        id: tempID,
        content: input
    }

    if(localStorage.getItem('completed') === null){
        // Init array
        var list = [];
        // Add to array
        list.push(listObj);
        // Set to localStorage
        localStorage.setItem('completed', JSON.stringify(list));
    } else {
        // Get data from localStorage
        var list = JSON.parse(localStorage.getItem('completed'));
        // Add object to array
        list.push(listObj);
        // Re-set back to localStorage
        localStorage.setItem('completed', JSON.stringify(list));
    }
    // this is not related to the actual storage.
    // adds html element
    var ul = document.getElementById('completedList');
    var li = document.createElement('li');

    li.setAttribute("id", tempID);
    li.innerHTML = '<p>' + input + '</p>' + '<button id="remove" onclick="removeCompleted(this)">' + removeSVG +'</button>';
    ul.insertBefore(li, ul.childNodes[0]);

}


function removeCompleted(e){
    // id of the item to be removed
    var tempID = $(e).parents("li").attr("id");
    var list = JSON.parse(localStorage.getItem('completed'));
    //search for the ID
    for(var i = 0; i < list.length; i++)
    {
        if(list[i].id == tempID){
            list.splice(i, 1);
        }
    }

    localStorage.setItem('completed', JSON.stringify(list));
    var li = document.getElementById(tempID);
    li.parentNode.removeChild(li);

}

function removeButton(e){
    // id of the item to be removed
    var tempID = $(e).parents("li").attr("id");

    var list = JSON.parse(localStorage.getItem('todoList'));
    //search for the ID
    for(var i = 0; i < list.length; i++)
    {
        if(list[i].id == tempID){
            list.splice(i, 1);
        }
    }

    localStorage.setItem('todoList', JSON.stringify(list));
    var li = document.getElementById(tempID);
    li.parentNode.removeChild(li);

}

function fetchTodoList(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('todoList'));
    // Get output id

    // Build output
    for(var i = 0; i < bookmarks.length; i++)
    {
        var id = bookmarks[i].id;
        var content = bookmarks[i].content;
        var ul = document.getElementById('list');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(content));
        li.setAttribute("id", id);
        li.innerHTML = '<p>' + content + '</p>' + '<button id="complete" onclick="complete(this)">' + completeSVG +'</button>' + '<button id="remove" onclick="removeButton(this)">' + removeSVG +'</button>';
        ul.insertBefore(li, ul.childNodes[0]);
    }
}


function fetchCompetedList(){
    var completedList = JSON.parse(localStorage.getItem('completed'));

    for(var i = 0; i < completedList.length; i++)
    {
        var id = completedList[i].id;
        var content = completedList[i].content;
        var ul = document.getElementById('completedList');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(content));
        li.setAttribute("id", id);
        li.innerHTML = '<p>' + content + '</p>' + '<button id="remove" onclick="removeCompleted(this)">' + removeSVG +'</button>';
        ul.insertBefore(li, ul.childNodes[0]);
    }

}
