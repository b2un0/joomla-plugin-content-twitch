window.twitch = {};
window.twitch.init = function (users) {
    var script = document.createElement('script');
    script.src = '//api.justin.tv/api/stream/list.json?channel=' + users + '&jsonp=window.twitch.result';
    script.async = true;
    document.head.appendChild(script);
};
window.twitch.result = function (items) {
    for (var i = 0; i < items.length; i++) {
        var target = document.getElementById('twitch_' + items[i].channel.login);
        var size = target.getAttribute('data-size');

        console.log(items[i]);

        var img = document.createElement('img');
        img.src = items[i].channel['screen_cap_url_' + size];

        var link = document.createElement('a');
        link.href = items[i].channel.channel_url;
        link.target = '_blank';
        link.innerHTML = items[i].channel.login + ' Online <br/>';
        link.appendChild(img);

        target.innerHTML = '';
        target.appendChild(link);
    }
}