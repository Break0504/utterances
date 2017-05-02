(function () {
'use strict';

function param(obj) {
    var parts = [];
    for (var name_1 in obj) {
        if (obj.hasOwnProperty(name_1)) {
            parts.push(encodeURIComponent(name_1) + "=" + encodeURIComponent(obj[name_1]));
        }
    }
    return parts.join('&');
}

var script = document.currentScript;
var attrs = {};
for (var i = 0; i < script.attributes.length; i++) {
    var attribute = script.attributes.item(i);
    attrs[attribute.name] = attribute.value;
}
attrs.url = location.href;
attrs.origin = location.origin;
attrs.pathname = location.pathname.substr(1).replace(/\.\w+$/, '');
attrs.title = document.title;
var descriptionMeta = document.querySelector("meta[name='description']");
attrs.description = descriptionMeta ? descriptionMeta.content : '';
document.head.insertAdjacentHTML('afterBegin', "<style>\n    .utterances {\n      position: relative;\n      width: 100%;\n    }\n    .utterances > iframe {\n      position: absolute;\n      left: 0;\n      right: 0;\n      width: 1px;\n      min-width: 100%;\n      max-width: 100%;\n      border: 0;\n    }\n  </style>");
var url = script.src.replace(/\/client(\.debug)?\.js(?:$|\?)/, '/utterances$1.html');
script.insertAdjacentHTML('afterEnd', "<div class=\"utterances\"><iframe src=\"" + url + "?" + param(attrs) + "\"></iframe></div>");
var iframe = script.nextElementSibling.firstElementChild;
script.parentElement.removeChild(script);
addEventListener('message', function (event) {
    var data = event.data;
    if (data && data.type === 'resize' && data.height) {
        iframe.style.minHeight = data.height + "px";
    }
});

}());
