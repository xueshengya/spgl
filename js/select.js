class Select{
    constructor(tbody){
        this.tbody = document.querySelector(tbody);
        console.log(this.tbody);
        // 默认处于第一页；
        this.pageIndex = 1;
        // count指的是一页的数量（不能被修改）
        Object.defineProperty(this, "count", {
        writable : false,
        value : 4
      });
      console.log(this);
    //   默认暂时的总页数；
    this.pageCount = 1;
    this.Selectdate();
    }
    Selectdate(){
        // 通过数据库查询数据
        let {pageIndex,count} = this;
        tools.ajaxGetPromise("api/v1/select.php",{pageIndex,count}).then(data=>{
            // 查询成功，调用数据
            if(data.res_code === 1){
                // 利用数据渲染页面
                this.pageCount = data.res_body.pageCount;
                console.log(this.pageCount);
                this.render(data.res_body.date);
                pagenation.renders(this);
                console.log(this);
            }
        })
    }
    // 渲染页面
    render(list){
        console.log(list)
        var html = "";
        list.forEach((shop,index)=>{
            html += `
            <tr data-id=${shop.Id}>
                <td>${index+1}</td>
                <td>${shop.shopname}</td>
                <td>
                    <span>${shop.shopprice}</span>
                    <input type="text" class="inputprice">
                </td>
                <td>
                    <span>${shop.shopnum}</span>
                    <input type="text" class="inputnum">
                </td>
                <td>
                    <button type="button" class="btn btn-edit btn-primary btn-xs">编辑</button>
                    <button type="button" class="btn btn-delete btn-success btn-xs">删除</button>
                    <button type="button" class="btn btn-ok btn-info btn-xs">确定</button>
                    <button type="button" class="btn btn-cancel btn-warning btn-xs">取消</button>
                </td>
            </tr>`;
        })
        this.tbody.innerHTML = html;
    }
}
let getShop = new Select("#tbody");