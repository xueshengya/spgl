class Addshop{
    constructor(){
        // 获取需要添加的商品信息，传送给后台；
        this.inputName = document.querySelector("#inputName"),
        this.inputPrice = document.querySelector("#inputPrice"),
        this.inputNum = document.querySelector("#inputNum"),
        this.addshop = document.querySelector("#addshop");
        console.log(this.addshop)
        this.init();
    }
    init(){
        this.addshop.onclick = () =>{
           let name = this.inputName.value,
               price = this.inputPrice.value,
               num = this.inputNum.value;
            if(name === "" || price === "" || num ===""){
                alert("输入不能为空")
            }
            // 然后将输入的值传输给后端进行添加，添加完成后返回；
            tools.ajaxGetPromise("api/v1/insert.php",{name,price,num}).then(date=>{
                if(date.res_code===1){
                    alert(date.res_message);
                }
                // 添加完成后将input里面的数据清空；
            this.inputName.value = this.inputNum.value = this.inputPrice.value = "";
            // 添加成功后要关闭添加页面；
            $('#addModal').modal('hide');
            // 添加完成后要重新加载主页面，重新加载数据库；
            getShop.Selectdate();
            })
        }
    }
}
new Addshop();