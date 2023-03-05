// 控制"按钮的触发频率"
let statusMgr=(function(){
    let STATUS={};
    return {
        // id 唯一标识，cold 冷却时间毫秒
        isUsing:function(id, cold=300){
            if(STATUS[`${id}`]){
                return true;
            }
            STATUS[`${id}`]=true;
            setTimeout(() => {
                STATUS[`${id}`]=false;
            }, cold);
            return false;
        },
    };
})();
