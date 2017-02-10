//新建一个对象，属性为每一屏，值为其包含的有动画的元素，方便使用
var scAnimationEles={
	'.header':[
		'.header',
		'.header-logo',
		'.nav-item1',
		'.nav-item2',
		'.nav-item3',
		'.nav-item4',
		'.nav-item5'
	],
	'.sc2':[
		'.sc2-heading',
		'.sc2-subheading',
		'.sc2-rocket'
	],
	'.sc3':[
		'.sc3-heading',
		'.sc3-subheading',
		'.sc3-pic',
		'.sc3-item1',
		'.sc3-item2',
		'.sc3-item3',
		'.sc3-item4',
		'.sc3-item5'
	],
	'.sc4':[
		'.sc4-heading',
		'.sc4-subheading',
		'.sc4-pic',
		'.sc4-item1',
		'.sc4-item2',
		'.sc4-item3',
		'.sc4-item4'
	],
	'.sc5':[
			'.sc5-heading',
			'.sc5-subheading',
			'.sc5-pic'
		],
	'.sidebar':['.sidebar']
};

// 为元素添加样式
var addCls=function(elm,cls){
	var baseCls=elm.getAttribute('class');//获取元素样式
	if(baseCls.indexOf(cls)===-1){//如果当前没有动画类
		elm.setAttribute('class',baseCls+' '+cls);//增加当前类
	}
}	
// 为元素删除样式
var delCls=function(elm,cls){
	var baseCls=elm.getAttribute('class');
	if(baseCls.indexOf(cls)!==-1){
		elm.setAttribute('class',baseCls.split(cls).join(' '));
	}
}
// 为元素添加动画效果的类，增加动画
function scAnimation(scCls){
	var sc=document.querySelector(scCls);//获取当前屏
	var elms=scAnimationEles[scCls];//获取当前屏带有动画的所有元素

	for (var i = 0;i<elms.length;i++) {
		var elm=document.querySelector(elms[i]);//遍历当前屏中每一个带有动画的元素
		var baseCls=elm.getAttribute('class');//获取当前屏每一个动画元素的类
		elm.setAttribute('class',baseCls+' '+elms[i].substr(1)+'-ani');
	}
}
// 为元素删除动画效果的类，恢复页面
function recovery(scCls){
	var sc=document.querySelector(scCls);//获取当前屏
	var elms=scAnimationEles[scCls];//获取当前屏带有动画的所有元素

	for (var i = 0;i<elms.length;i++) {
		var elm=document.querySelector(elms[i]);//遍历当前屏中每一个带有动画的元素
		var baseCls=elm.getAttribute('class');//获取当前屏每一个动画元素的类
		elm.setAttribute('class',baseCls.replace('-ani',''));
	}
}


//第一步：鼠标滚动到当前页面播放当前页面动画
var head=document.getElementById('header');//获取header
var text=head.getElementsByTagName('a');//获取header中所有的a元素

window.onscroll=function(){
	var top=document.body.scrollTop;
	if(top>500&&top<640*2-200){
		scAnimation('.sc2');//为第二屏中的元素加上动画类
		active(1);
		setLine(1);
		scAnimation('.sidebar');
		scAnimation('.header');
	}
	if(top>640*2-200&&top<640*3-200){
		scAnimation('.sc3');
		recovery('.sc2');
		active(2);
		setLine(2);
	}
	if(top>640*3-200&&top<640*4-200){
		scAnimation('.sc4');
		recovery('.sc3');
		active(3);
		setLine(3);
	}
	if(top>640*4-200&&top<640*5-200){
		scAnimation('.sc5');
		recovery('.sc4');
		active(4);
		setLine(4);
	}if(top<500){
		// recovery('.header');
		active(0);
		setLine(0);
		delCls(head,'header-ani');//为header添加背景色和透明度
		for(var i=0;i<text.length;i++){
			delCls(text[0],'header-logo-ani');
			delCls(text[i],'nav-item'+i+'-ani');//为header中的每一个a设置文字颜色
		};
	};
	return;
};


// 第二步：双向定位
var navItems=head.getElementsByClassName('item');
var sideItems=document.getElementsByClassName('side-item');
//定义点击导航项跳转到对应页面的函数jump
var jump=function(i,lib){
	var item=lib[i];
	item.onclick=function(){
		document.body.scrollTop=640*i-60;
		addCls(item,'active');
	}
}
//调用点击导航项跳转到对应页面的函数jump
for(var i=0;i<navItems.length;i++){
	jump(i,navItems);
	jump(i,sideItems);
}

// 第三步：定义导航项active样式变化的函数
var active=function(dex){
	for(var i=0;i<navItems.length;i++){
		delCls(navItems[i],'active');
		delCls(sideItems[i],'active');
	}
	addCls(navItems[dex],'active');
	addCls(sideItems[dex],'active');
}


//第四步：滑动门特效
var line=document.getElementById('header-nav-line');//获取活动条元素
var activeIdx=0;//定义一个变量用来存放active项的索引
//定义设置滑动条位置的函数setLine
var setLine=function(idx){
	for(var i=0;i<navItems.length;i++){
			if(navItems[i].className.indexOf('active')!==-1){
				activeIdx=i;//active类所在项的索引
				break;
			}
		}
		line.style.left=(96*activeIdx)+'px';
	//鼠标经过当前项时，滑动条left的值设置为当前项索引*滑动条宽度
	navItems[idx].onmouseover=function(){
		line.style.left=(96*idx)+'px';
	}
	//鼠标离开当前项时，滑动条left的值设置为active类所在项的位置
	navItems[idx].onmouseout=function(){
		for(var i=0;i<navItems.length;i++){
			if(navItems[i].className.indexOf('active')!==-1){
				activeIdx=i;//active类所在项的索引
				break;
			}
		}
		line.style.left=(96*activeIdx)+'px';
	}
}
//调用滑动门特效函数setLine
for(var i=0;i<navItems.length;i++){
	setLine(i);
}
//第五步：给按钮绑定点击效果
var now=document.getElementById('now');
now.onclick=function(){
	prompt('请输入您的账号');
};