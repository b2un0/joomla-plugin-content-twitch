window.twitch = {};
window.twitch.init = function(users){
    var script = document.createElement('script');
    script.src = '//api.justin.tv/api/stream/list.json?channel=' + users + '&jsonp=window.twitch.result';
    script.async = true;
    document.head.appendChild(script);
};
window.twitch.result = function(items) {
    for (var i=0; i < items.length; i++) {
        var target = document.getElementById('twitch_' + items[i].channel.login);
    
        var img = document.createElement('img');
            //img.src = items[i].channel.screen_cap_url_huge; // 630x473
            //img.src = items[i].channel.screen_cap_url_large; // 320x240
            img.src = items[i].channel.screen_cap_url_medium; // 150x113
            //img.src = items[i].channel.screen_cap_url_small; // 70x53
            img.width = 150;
            img.height = 113;
            
        var link = document.createElement('a');
            link.href = items[i].channel.channel_url;
            link.target = '_blank';
            link.innerHTML = items[i].channel.login + ' Online <br/>';
            link.appendChild(img);

        target.innerHTML = '';
        target.appendChild(link);
    }
}