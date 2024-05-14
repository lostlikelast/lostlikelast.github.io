function makeRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}
function getMarkers(_data) {
    var arr = [];
    for (var i = 0; i < _data.length; i++) {
        var obj = {
            lnglat: [_data[i].location.coordinates[0],_data[i].location.coordinates[1]], //经纬度
            name: _data[i].shopName,
            style: 1, //该数据的取值为样式数组对应的对象索引
        }
        arr.push(obj)
    }
    return arr;
}
function objectToQueryString(obj) {
    var queryString = '';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString.length > 0) {
                queryString += '&';
            }
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }
    }
    return queryString;
}
// 信息处理
window.webViewExecute = function(params) {
    console.log("webViewExecute params:" + JSON.stringify(params));
    if (typeof params === "string") {
        params = JSON.parse(params);
    }
    var type = params.type;
    switch(type) {
        case "reloadScene":
            // 用新的参数刷新页面
            window.location.href = params.data.url;
            break;
    }
}