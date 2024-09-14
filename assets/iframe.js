$(function(){

	var MyIframe = {

		data:{
			ids:true
		},

		// 渲染菜单
		render:function(){

		},

		addtab:function(that){

			//判断是否打开 如果打开 选中这个 ； 如果没打开  打开这个并选中这个

			let id = that.data('id');
			let url = that.data('url');
			let name = that.children('span')[0].innerText;
			if(id=='' || url==''){
				return false;
			}
			this.selectTab(id,0);
			if(!this.data.ids){
				//alert(123);
				$('#tabmenu').find('a').removeClass();
				let html = '<a href="javascript:;" class="selected" data-id="'+id+'" data-url="'+url+'"><i class="icon"></i><span>'+name+'</span><i class="close"></i></a>'
				$('#tabmenu').append(html);
				$('#tabiframe').find('.iframe').hide();
				let iframe = '<div class="iframe if-'+id+'" data-id="'+id+'" data-url="'+url+'"><iframe src="'+url+'" frameborder="0"></iframe></div>'
				$('#tabiframe').append(iframe);
			}
		},

		deltab:function(id,that){

			let current = that.parent('a').attr('class');
			if(current == 'selected'){
				that.parent('a').prev().attr('class','selected');
				let previd = that.parent('a').prev().data('id');
				$('#tabiframe').find('.if-'+previd).show();
				console.log(that.parent('a').prev().data('id'))
				MyIframe.selectChild(previd);
			}

			that.parent('a').remove();
			$('#tabiframe').find('.if-'+id).remove();


		},
		//改变父类状态
		changeParentstatus:function(that){
			this.closeParent(that);
			let status =  that.next().attr('class');
			let sticon = that.find('i').attr('class');
			status = (status == 'hide') ? 'show' : 'hide';
			that.next().attr('class',status);
			sticon = (sticon == 'up') ? 'down' : 'up';
			that.find('i').attr('class',sticon);
		},
		//关闭所有父类
		closeParent:function(that){
			that.parent().siblings().find('dd').attr('class','hide');
			that.parent().siblings().find('a i').attr('class','down');
		},
		//打开某一个父类并且选中子类  菜单
		selectChild:function(id){
			$('li a').removeClass('active');
			let item = $('menu').find('a[data-id='+id+']');
			let parent = item.parents('dd').siblings('.isSub');
			if(parent){

				let swi = parent.find('i').attr('class');
				if(swi == 'down'){
					//如果是关闭的  关闭所有  打开这个
					MyIframe.closeParent(parent);
					item.parents('dd').attr('class','show');
					parent.find('i').attr('class','up');
				}else if(swi == undefined){
					console.log(swi)
					item.attr('class','show');
					MyIframe.closeParent(parent);
				}
			}

			item.attr('class','active');

		},
		//tab
		selectTab:function(id,p=1){
			that = this;
			that.data.ids = false;
			$('#tabmenu').find('a').each(function(item,index){
				let getid = $(index).data('id');
				if(getid == id){
					that.data.ids = true;
					$(index).attr('class','selected');
				}else{
					$(index).removeClass();

				}
			})
			$('#tabiframe').find('.if-'+id).show();
			$('#tabiframe').find('.if-'+id).siblings().hide()

			if(p==1){
				//打开列表  设为选中
				MyIframe.selectChild(id);
			}
		}

	};

	//父类点击事件
	$("body").delegate("menu .isSub","click", function(){
		let url = $(this).data('url');
		if(url && url!== '#'){
			MyIframe.addtab($(this));
		}else{
			MyIframe.changeParentstatus($(this))
		}
	});

	//子类点击事件
	$('menu dd dl a').on('click',function(){
		$('menu dl a').removeClass();
		$(this).attr('class','active');
		MyIframe.addtab($(this),0);

	})

	//tab点击事件
	$("body").delegate("#tabmenu a","click", function(e){
		console.log(123)
		let id = $(this).data('id');
		MyIframe.selectTab(id,1);
	});

	$("#tabmenu").delegate(".close","click", function(e){
		e.stopPropagation();
		let id = $(this).parents('a').data('id');
		MyIframe.deltab(id,$(this))

	});
	
	
})
