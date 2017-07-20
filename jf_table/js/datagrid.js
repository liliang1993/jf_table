$(function() {
	var dataGrid = function(ele, opt) {
		this.default = {
			//id
			id: '',
			url: null,
			columns: null,
			isoddcolor: false,
			searchnation: false,
			data: null,
			isdropdown: false
		}
		this.settings = $.extend({}, this.default, opt);
	}
	dataGrid.prototype = {
		_id: null,
		_op: null,
		init: function() {
			this._id = this.settings.id;
			_op = this;
			this.create();
			this.bindEvent();
		},
		create: function() {
			//初始化元素
			this.InitializeElement();
			//初始化表头
			this.createTableHead();
			//初始化动态行
			this.createTableBody(_op.settings.data); // var json = this.getAjaxDate(_op.settings.url, null);
		},
		bindEvent: function() {
			//添加鼠标悬浮事件
			// this.registermousehover();
			//添加隔行变色
			this.registerchangebgcolor();
			//添加全选全不选事件
			this.registercheckall();
		},
		//初始化元素
		InitializeElement: function() {
			//var id = this.settings.id;
			$("#" + this._id).empty().append("<thead><tr></tr></thead><tbody></tbody><TFOOT></TFOOT>");
		},
		//循环添加表头
		createTableHead: function() {
			var headcols = this.settings.columns;
			var isdropdown = this.settings.isdropdown
			for (var i = 0; i < headcols.length; i++) {
				if (headcols[i].field == 'ck') {
					$("table[id='" + this._id + "'] thead tr").append("<th width='60px'><i class='chkall'></i></th>");
				} else {
					if (headcols[i].search == true) {
						$("table[id='" + this._id + "'] thead tr").append("<th width=" + headcols[i].width + " align=" + headcols[i].align + ">" + headcols[i].title + "<input type='search' placeholder='Search'></th>");
					} else {
						$("table[id='" + this._id + "'] thead tr").append("<th width=" + headcols[i].width + " align=" + headcols[i].align + ">" + headcols[i].title + "</th>");
					}

				}
			}
		},
		//循环添加行
		createTableBody: function(data) {
			var columns = _op.settings.columns;
			var rowsdata = "";
			for (var row = 0; row < data.length; row++) {
				// if (row == json.rows.length) break;
				rowsdata += "<tr>";
				for (var colindex = 0; colindex < columns.length; colindex++) {
					if (columns[colindex].field == 'ck') {
						rowsdata += '<td width="60px" align="center"><i class="icon icon-unchecked"></i></td>'
					} else {
						rowsdata += '<td width=' + columns[colindex].width + ' align=' + columns[colindex].align + '>' + data[row][columns[colindex].field] + '</td>';
					}
				}
				rowsdata += "</tr>";
			}
			$("table[id='" + this._id + "'] tbody").empty().append(rowsdata);
			// $("#currentpageIndex").html(pn);
			// this.registermousehover();
		},
		//添加鼠标悬浮事件
		// registermousehover: function() {
		// 	//添加鼠标悬浮事件
		// 	$("table[id='" + this._id + "'] tbody tr").mouseover(function() {
		// 		$(this).addClass("mouseover");
		// 	}).mouseleave(function() {
		// 		$(this).removeClass("mouseover");
		// 	});
		// },
		//添加隔行变色事件
		registerchangebgcolor: function() {
			//添加隔行变色
			if (this.settings.isoddcolor)
				$("table[id='" + this._id + "'] tr:odd").css("background-color", "#2c2b33").css("color", "#fff");
		},
		//添加全选全不选事件
		registercheckall: function() {
			//添加全选全不选事件
			$(".chkall").click(function() {
				if ($(this).hasClass('checked')) {
					$(this).removeClass('checked');
					$(".chk.checked").each(function() {
						$(this).removeClass('checked');
					});
				} else {
					$(this).addClass('checked');
					$(".chk").each(function() {
						if (!$(this).hasClass('checked')) {
							$(this).addClass('checked');
						}
					});
				}
			});
		},
		registerdropdown: function() {

		},
		//添加异步ajax事件
		getAjaxDate: function(url, parms) {
			//定义一个全局变量来接受$post的返回值
			var result;
			//用ajax的同步方式
			$.ajax({
				url: url,
				async: false,
				//改为同步方式
				data: parms,
				success: function(data) {
					result = data;
				}
			});
			return result;
		}
	}
	$.fn.grid = function(options) {
		var grid = new dataGrid(this, options);
		return this.each(function() {
			grid.init();
		});
	}
})