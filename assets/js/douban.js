function $(el){ return document.getElementById(el);}
var douban = {
    baseUrl:'http://api.douban.com/people/panweizeng/collection',
    params:{
        cat:'book',
        'start-index':1,
        'max-results':50,
        alt:'xd',
        apikey:'*******',
        callback:'douban.appendHTML'
    },
    magicBox:'douban',
    buildUrl:function(){
        var ps = this.params,string='';
        for(var i in ps)
            string += i + '='+ ps[i]+ '&';
        return this.baseUrl+"?"+string;
    },
    appendRequestScript:function(url){
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = url;
        script.charset = 'utf-8';
        head.appendChild(script);
    },
    appendHTML:function(json){
        $(this.magicBox).innerHTML = this.render(this.parseJSON(json));
    },
    parseJSON:function(json){
        var itemCollection=[];
        for(var i in json.entry)
            itemCollection.push(this.parseEntry(json.entry[i]));
        return itemCollection;
    },
    parseEntry:function(entry){
        var linkItem = {};
        var linkEntry  = entry["db:subject"]["link"];
        linkItem.title = entry["db:subject"]["title"]["$t"];
        linkItem.src = 'http://abc.com/img/douban-no-image.jpg';
        for(var i in linkEntry){
            if(linkEntry[i]['@rel'] == 'image')
                linkItem.src = linkEntry[i]['@href'];
            if(linkEntry[i]['@rel'] == 'alternate')
                linkItem.link = linkEntry[i]['@href'];
        }
        return linkItem;
    },
    render:function(itemCollection){...},
    init:function(){
        this.appendRequestScript(this.buildUrl());
    }
}
douban.init();