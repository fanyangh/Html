var navs = [{
	"title": "会员管理",
	"icon": "fa-cubes",
	"spread": true,
    "children": [{
        "title": "会员列表",
        "icon": "fa-table",
        "href":'/views/user/list'
    }]
}, {
	"title": "内容管理",
	"icon": "fa-cogs",
	"spread": false,
	"children": [{
		"title": "已上传文件列表",
		"icon": "fa-table",
		"href": "/views/user/listfile"
	}]
}, {
	"title": "其他",
	"icon": "fa-stop-circle",
	"href": "#",
	"spread": false,
	"children": [{
		"title": "子窗体中打开选项卡",
		"icon": "fa-github",
		"href": "cop.html"
	}]
}];