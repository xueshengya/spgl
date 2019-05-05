class Rigist{
    constructor(){
        // 获取文本框及按钮；
        this.username = document.querySelector("#exampleInputName2");
        this.password = document.querySelector("#exampleInputEmail2");
        this.btn= document.querySelector("#submit");
        console.log(this.password);
        this.init();
    }
    init(){
        // 点击按钮提交；
        this.btn.onclick = ()=>{
        let username = this.username.value,
            password = this.password.value;
        var reg = /^[a-zA-Z].+\d$/i;
        if(reg.test(username)){
               // 将输入的用户名密码传送给数据库，保存；
        tools.ajax("post","../api/v1/rigist.php",{username,password},data=>{
            console.log(data);
            alert(data.res_message);
        });
        
            
        }else{
            alert("用户名以字母开头，数字结尾，中间任意一个字符");
        }
          // 阻止默认事件；  
        return false;
     }
    }
}
new Rigist();