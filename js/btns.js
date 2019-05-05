class Btns{
    constructor(tbody){
        this.tbody = document.querySelector(tbody);
        this.bindEvents();
    }

bindEvents(){
    this.tbody.onclick = e =>{
        let target = e.target;
        let tr = target.parentNode.parentNode;
        // 事件委托，点击谁，获取谁的class名
        let classList = Array.from(target.classList);
        // 通过判断，得到编辑按钮的名字，然后进行事件绑定；
        if(classList.includes("btn-edit")){
            // 调用编辑按钮绑定事件
            this.editBtns(tr);
        }else if(classList.includes("btn-cancel")){
            this.cancelBtns(tr);
        }else if(classList.includes("btn-ok")){
            this.BtnsOk(tr);
        }else if(classList.includes("btn-delete")){
            this.DeleteBtns(tr);
        }
    }
    }
editBtns(tr){
    // 让span隐藏，input出现；
    tr.classList.add("edit");
// 将span的值赋给input；
// 获取span和input
    let spans = tr.querySelectorAll("span");
    Array.from(spans).forEach(span=>{
        span.nextElementSibling.value = span.innerHTML;
    })
    }

cancelBtns(tr){
    // 将input隐藏，span出现；
    tr.classList.remove("edit");
}

BtnsOk(tr){
    // 获取到要修改的值，然后传输给后端修改
    let inputprice = tr.querySelector(".inputprice"),
        inputnum = tr.querySelector(".inputnum"),
        id = tr.getAttribute("data-id"),
        price = inputprice.value,
        num = inputnum.value;
        // 传送数据，然后获取返回修改好的数据
    tools.ajaxGetPromise("api/v1/update.php",{id,price,num}).then(date=>{
        if(date.res_code===1){
            inputprice.previousElementSibling.innerHTML = inputprice.value;
            inputnum.previousElementSibling.innerHTML = inputnum.value;
        }
    })
    // 点击确定 让inpu隐藏，span出现
    tr.classList.remove("edit");
    }

DeleteBtns(tr){
    // 从body里面删除行；数据库也要更新；首先要获取删除的行数，id;
    let id = tr.getAttribute("data-id")
    console.log(id);
    // 把要删除的行获取到，传输到后台进行删除，再传到前段进行渲染；
    tools.ajaxGetPromise("api/v1/delete.php",{id}).then(date=>{
        if(date.res_code===1){
            if(confirm("确定要删除吗？")){
                tr.remove();
                // 删除完成后重新加载页面；刷新数据库；
                getShop.Selectdate();
            }
            
            
        }
    })

}
}
new Btns("#tbody");