class Shoplist{
    constructor(){
        this.ul = document.querySelector("#page-container");
        this.next = document.querySelector("#next-page");
        // console.log(this.nextPage);
        this.bindevevt();
    }
    renders(pagelist){
        this.pagelist = pagelist;
        // console.log(pageIndex);
        Array.from(this.ul.querySelectorAll(".page-li")).forEach(li=>{
            li.remove();
        })
        for(let i=1;i<= this.pagelist.pageCount; i++){
            let li = document.createElement("li");
            li.className = i === this.pagelist.pageIndex ? "active page-li" : "page-li";
            li.innerHTML = `<a href="javascript:;" class="page">${i}</a>`;
            this.ul.insertBefore(li,this.next);
        }
    }
     bindevevt(){
         this.ul.onclick = e =>{
            let target = e.target;
            console.log(target);
            let targetClass = Array.from(e.target.classList);
            // let targetClass =[...target.classLsit]
            console.log(targetClass)
             if(targetClass.includes("page") ){
                 this.pagelist.pageIndex = Number(target.innerHTML);
                 this.pagelist.Selectdate();
            }else if(targetClass.includes("prev-page")){
                if(--this.pagelist.pageIndex < 1){
                    // 将当前页控制到点击后的页码，然后再调取查询；也就是渲染页面
                    this.pagelist.pageIndex = 1;
                    return;
                }
            this.pagelist.Selectdate();
            }else if(targetClass.includes("next-page")){
                if(++ this.pagelist.pageIndex > this.pagelist.pageCount){
                    this.pagelist.pageIndex = this.pagelist.pageCount;
                    return;
                }
             this.pagelist.Selectdate();
            }
         }
    }
}

let pagenation = new Shoplist();