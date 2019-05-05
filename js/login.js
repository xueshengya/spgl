class Login{
    constructor(){
        this.username = document.querySelector("#exampleInputName2");
        this.password = document.querySelector("#exampleInputEmail2");
        this.btn = document.querySelector(".btn");
        this.check = document.querySelector("#check");
        console.log(this.btn,this.username);
        this.init();
    }
    init(){
        this.btn.onclick = ()=>{
            let username = this.username.value,
                password = this.password.value;
                console.log(username);
            tools.ajax("post","../api/v1/login.php",{username,password},data=>{
                if(data.res_code === 1){
                    alert(data.res_message)
                    // 登录成功后保存记录；判断是否勾选
                    if(this.check.checked){
                        tools.cookie("username",username,{expires: 7, path: "/"})
                    }else{
                        tools.cookie("username",username,{ path: "/"})
                    }
                    window.location.href = "../index.html";
                }else{
                    alert(data.res_message);
                }
            })
        return false;
        }
    }
    }

new Login();