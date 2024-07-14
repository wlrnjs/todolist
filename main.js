document.addEventListener('DOMContentLoaded', (event) => { // DOM 이 실행되면 js가 실행됨
    const inputItem = document.getElementById('input-item');
    const buttonItem = document.getElementById('button-item');
    const ulItem = document.getElementById('ul-item');
    let items = [];
    let deleteItems = [];
    const deleteConsole = document.getElementById('del-btn');
    let completeItems = [];
    const completeConsole = document.getElementById('com-btn');
    const contentValue = document.getElementById('content-value');
    const contentValue2 = document.getElementById('content-value2');

    let isRenderVisible = true; // 초기 상태는 보이는 상태

    buttonItem.addEventListener('click', render); // buttonItem 에 'click' 했을 때, render 가 실행되게 이벤트 추가.
    deleteConsole.addEventListener('click', toggleRender); // deleteConsole 에 'click' 했을 때, toggleRender 가 실행되게 이벤트 추가.
    completeConsole.addEventListener('click', toggleRenderBtn); // completeConsole 에 'click' 했을 때, toggleRenderBtn 가 실행되게 이벤트 추가.

    function render(event) { // render 함수
        event.preventDefault(); // 새로고침이 되지 않게

        if (inputItem.value !== '') { // inputItem 부분이 빈 값이 아닐 때 실행.
            let inputValue = inputItem.value;

            let liItem = document.createElement('li');  // li 생성
            liItem.className = 'li-item';
            liItem.innerText = inputValue;

            let deleteBtn = document.createElement('button');   // delete버튼 생성
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerText = '삭제';

            let completeBtn = document.createElement('button'); // complete버튼 생성
            completeBtn.className = 'fix-btn';
            completeBtn.innerText = '완료';

            let btnDiv = document.createElement('div'); // btn이 들어갈 div 박스 생성
            btnDiv.className = 'btn-div';

            let liDiv = document.createElement('div');  // li 랑 btn 이 들어갈 div 만들기 / randomId 추가
            liDiv.className = 'li-div';
            liDiv.id = randomId(); // id 값을 randomId 로 지정

            liDiv.appendChild(liItem);  // liItem 을 liDiv 에 자식요소로 추가
            btnDiv.appendChild(deleteBtn);  // deleteBtn 을 btnDiv 에 자식요소로 추가
            btnDiv.appendChild(completeBtn); // completeBtn 을 btnDiv 에 자식요소로 추가

            liItem.appendChild(btnDiv); // btnDiv(deleteBtn, completeBtn이 추가된)를 liItem 에 자식요소로 추가
            ulItem.appendChild(liDiv); // liDiv 를 ulItem 에 자식요소로 추가
            items.push(liItem); // liItem 을 items(배열)에 push 를 사용해서 넣어줌

            inputItem.value = ''; // inputItem 에 들어가는 값을 초기화 시킴

            deleteBtn.addEventListener('click', () => deleteItem(liDiv)); // deleteBtn 을 'click' 했을 때 실행되게 (deleteItem 을 호출하고 매개변수 liDiv 로 전달)
            completeBtn.addEventListener('click', () => completeItem(liDiv)); // completeBtn 을 'click' 했을 때 실행되게 (completeItem 을 호출하고 매개변수 liDiv 로 전달)
        }
    }

    function deleteItem(liDiv) { // deleteItem 을 함수로 지정 (매개변수로 liDiv 를 받음)

        let liItem = liDiv.querySelector('.li-item'); // 변수 liItem 을 liDiv에서 .li-item 클래스 요소로 가져옴
        if (!liItem) return; // liItem 이 false 일 때, 값을 실행시키지 않음

        let deletedItemText = liItem.innerText; // liItem의 텍스트 내용을 가져와 deleteItems 배열에 추가
        deleteItems.push(deletedItemText); // deleteItems 에 deletedItemText 를 배열에 추가

        let deleteItemsValue = document.createElement('li'); // 삭제된 항목의 내용을 표시할 DOM 요소 li 생성
        deleteItemsValue.innerText = deletedItemText; // deleteItemsValue 에 들어갈 텍스트를 deletedItemText 로 지정
        deleteItemsValue.className = 'delete-items-value'; // deleteItemsValue 의 클래스 이름 지정

        let deleteItemsValueDiv = document.createElement('div'); // deleteItemsValue 가 들어갈 div 박스 생성
        deleteItemsValueDiv.className = 'delete-items-value-div'; // deleteItemsValueDiv 의 클래스 이름 지정

        deleteItemsValueDiv.appendChild(deleteItemsValue); // deleteItemsValue 를 deleteItemsValueDiv 에 자식요소로 추가
        contentValue.appendChild(deleteItemsValueDiv); // deleteItemsValueDiv 를 contentValue 에 자식요소로 추가
        ulItem.removeChild(liDiv); // DOM에서 해당 요소를 제거

        items = items.filter(item => item !== liItem); // items 배열에서 items.filter 를 사용해서 삭제된 항목 제거

        deletedItemText.innerText = '';
    }

    function completeItem(liDiv) { // completeItem 라는 함수로 정의 (매개변수 liDiv 를 받음)

        let liItem = liDiv.querySelector('.li-item'); // 변수 liItem 을 liDiv에서 클래스 요소로 li-item 을 가져옴
        if (!liItem) return; // liItem 의 값이 false 일 때, 값을 실행시키지 않음

        let completeItemText = liItem.innerText; // 변수 completeItemText 값은 liItem 에 있는 내용임
        completeItems.push(completeItemText); // completeItems 배열에 completeItemText 를 추가함

        let completeItemsValue = document.createElement('li'); // li 를 생성 하고 completeItemsValue 로 변수 선언
        completeItemsValue.innerText = completeItemText;    // completeItemsValue 의 내용은 completeItemText 로 저장
        completeItemsValue.className = 'complete-items-value'; // 클래스 이름 지정

        let completeItemsValueDiv = document.createElement('div'); // div 생성 completeItemValueDiv 로 변수 선언
        completeItemsValueDiv.className = 'complete-items-value-div'; // 클래스 이름 지정

        completeItemsValueDiv.appendChild(completeItemsValue); // completeItemsValueDiv 에 completeItemsValue 를 추가
        contentValue2.appendChild(completeItemsValueDiv); // contentValue2에 completeItemsValue를 추가
        ulItem.removeChild(liDiv);  // ulItem 에서 자식요소를 제거

        items = items.filter(item => item !== liItem); // items 배열에서 filter 메서드를 사용해서 새로 배열함 (item 은 liItem 과 일치하지 않으면 새로 반환)
    }

    // deleteConsole 버튼을 클릭하여 render 함수 실행 여부를 토글하는 함수
    function toggleRender(event) { // toggleRender 함수로 지정
        event.preventDefault(); // html 이 새로고침 되지 않게 함

        if (isRenderVisible) {
            ulItem.style.display = 'none'; // ulItem 의 display 스타일을 none 로 함
            contentValue2.style.display = 'none'; // contentValue2 의 display 스타일을 none 로 함
            isRenderVisible = false; // isRenderVisible 의 상태가 false
        } else {
            contentValue2.style.display = 'block'; // contentValue2 의 display 스타일을 block 으로 처리
            ulItem.style.display = 'block'; // ulItem 의 display 스타일을 block 으로 처리
            isRenderVisible = true; // isRenderVisible 의 상태가 true 가 됨
        }
    }

    function toggleRenderBtn(event) { // toggleRenderBtn 함수
        event.preventDefault(); // 페이지가 새로고침 되지 않게 함

        if (isRenderVisible) {
            ulItem.style.display = 'none'; // ulItem 의 display 스타일을 none 로 함
            contentValue.style.display = 'none'; // contentValue 의 display 스타일을 none 로 함
            isRenderVisible = false; // isRenderVisible 의 상태가 false
        } else {
            contentValue.style.display = 'block'; // contentValue 의 display 스타일을 block 으로 처리
            ulItem.style.display = 'block'; // ulItem 의 display 스타일을 block 으로 처리
            isRenderVisible = true; // isRenderVisible 의 상태가 true 가 됨
        }
    }

    function randomId() {    // id 를 랜덤으로 뽑아주는 코드(구글링으로 스크랩해옴)
        return '_' + Math.random().toString(36).substr(2, 9);
    }
});