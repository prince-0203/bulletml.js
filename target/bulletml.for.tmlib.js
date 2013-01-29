/*
 The MIT License (MIT)
 Copyright (c) 2012 dev7.jp

 Permission is hereby granted, free of charge, to any person obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
*/
var bulletml={GLOBAL:this,_temp:function(){}};
(function(){function m(a){var b=new bulletml.Root;if(a=a.getElementsByTagName("bulletml")[0]){p(a,"type",function(a){b.type=a});var c=a.getElementsByTagName("action");if(c)for(var k=0,d=c.length;k<d;k++)if(c[k].parentNode===a){var f=q(b,c[k]);f&&(b.actions[b.actions.length]=f)}if(c=a.getElementsByTagName("bullet")){k=0;for(d=c.length;k<d;k++)c[k].parentNode===a&&(f=e(b,c[k]))&&(b.bullets[b.bullets.length]=f)}if(c=a.getElementsByTagName("fire")){k=0;for(d=c.length;k<d;k++)c[k].parentNode===a&&(f=h(b,
c[k]))&&(b.fires[b.fires.length]=f)}return b}}function q(a,b){var c=new bulletml.Action;p(b,"label",function(a){c.label=a});d(b,".",function(b){switch(b.tagName.toLowerCase()){case "action":c.commands[c.commands.length]=q(a,b);break;case "actionref":c.commands[c.commands.length]=f(a,b);break;case "fire":c.commands[c.commands.length]=h(a,b);break;case "fireref":var l=c.commands,e=c.commands.length,i=new bulletml.FireRef;p(b,"label",function(a){i.label=a});d(b,/param$/,function(a){i.params[i.params.length]=
n(a)});i.root=a;l[e]=i;break;case "changedirection":var l=c.commands,e=c.commands.length,m=new bulletml.ChangeDirection;m.root=a;j(b,"direction",function(a){m.direction=g(new bulletml.Direction,a)});j(b,"term",function(a){m.term=n(a)});l[e]=m;break;case "changespeed":var l=c.commands,e=c.commands.length,t=new bulletml.ChangeSpeed;t.root=a;j(b,"speed",function(a){t.speed=g(new bulletml.Speed,a)});j(b,"term",function(a){t.term=n(a)});l[e]=t;break;case "accel":var l=c.commands,e=c.commands.length,r=
new bulletml.Accel;r.root=a;j(b,"horizontal",function(a){r.horizontal=g(new bulletml.Horizontal,a)});j(b,"vertical",function(a){r.vertical=g(new bulletml.Vertical,a)});j(b,"term",function(a){r.term=n(a)});l[e]=r;break;case "wait":var l=c.commands,e=c.commands.length,u=new bulletml.Wait;u.root=a;u.value=n(b);l[e]=u;break;case "vanish":b=c.commands;l=c.commands.length;e=new bulletml.Vanish;e.root=a;b[l]=e;break;case "repeat":var l=c.commands,e=c.commands.length,s=new bulletml.Repeat;j(b,"action",function(b){s.action=
q(a,b)});j(b,"actionRef",function(b){s.action=f(a,b)});j(b,"times",function(a){s.times=n(a)});s.root=a;l[e]=s}});c.root=a;return c}function f(a,b){var c=new bulletml.ActionRef;p(b,"label",function(a){c.label=a});d(b,/param$/,function(a){c.params[c.params.length]=n(a)});c.root=a;return c}function e(a,b){var c=new bulletml.Bullet;p(b,"label",function(a){c.label=a});j(b,"direction",function(a){c.direction=g(new bulletml.Direction,a)});j(b,"speed",function(a){c.speed=g(new bulletml.Speed,a)});d(b,/(action)|(actionRef)$/,
function(b){"action"==b.tagName.toLowerCase()?c.actions[c.actions.length]=q(a,b):"actionref"==b.tagName.toLowerCase()&&(c.actions[c.actions.length]=f(a,b))});c.root=a;return c}function h(a,b){var c=new bulletml.Fire;p(b,"label",function(a){c.label=a});j(b,"direction",function(a){c.direction=g(new bulletml.Direction,a)});j(b,"speed",function(a){c.speed=g(new bulletml.Speed,a)});j(b,"bullet",function(b){c.bullet=e(a,b)});j(b,"bulletref",function(b){var e=new bulletml.BulletRef;p(b,"label",function(a){e.label=
a});d(b,/param$/,function(a){e.params[e.params.length]=n(a)});e.root=a;c.bullet=e});if(!c.bullet)throw Error("fire has no bullet or bulletRef.");c.root=a;return c}function g(a,b){p(b,"type",function(b){a.type=b});n(b,function(b){a.value=b});return a}function i(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c].label==b)return a[c]}function j(a,b,c,d){for(var b=b.toLowerCase(),a=a.childNodes,e=0,f=a.length;e<f;e++)if(a[e].tagName&&a[e].tagName.toLowerCase()==b)return c&&c(a[e]),a[e];d&&d();return null}function d(a,
b,c){for(var a=a.childNodes,d=0,e=a.length;d<e;d++)a[d].tagName&&a[d].tagName.toLowerCase().match(b)&&c(a[d])}function p(a,b,c,d){if(a=a.attributes[b])return c&&c(a.value),a;d&&d()}function n(a,b){var c=a.textContent.trim();if(void 0!==c||a.childNodes[0]&&(c=a.childNodes[0].nodeValue,void 0!==c))return b&&b(c),c}bulletml.build=function(a){if("string"===typeof a)var b=new DOMParser,a=m(b.parseFromString(a,"application/xml"));else if(a.getElementsByTagName("bulletml"))a=m(a);else throw Error("cannot build "+
a);return a};bulletml.Root=function(a){this.type="none";this.root=this;this.actions=[];this.bullets=[];this.fires=[];if(void 0!==a){for(var b in a)a.hasOwnProperty(b)&&(a[b].label=b,a[b]instanceof bulletml.Action?this.actions.push(a[b]):a[b]instanceof bulletml.Bullet?this.bullets.push(a[b]):a[b]instanceof bulletml.Fire&&this.fires.push(a[b]));a=0;for(b=this.actions.length;a<b;a++)this.actions[a].setRoot(this);a=0;for(b=this.bullets.length;a<b;a++)this.bullets[a].setRoot(this);a=0;for(b=this.fires.length;a<
b;a++)this.fires[a].setRoot(this)}};bulletml.Root.prototype.findAction=function(a){return i(this.actions,a)};bulletml.Root.prototype.getTopActionLabels=function(){for(var a=[],b=0,c=this.actions.length;b<c;b++){var d=this.actions[b];d.label&&0===d.label.indexOf("top")&&(a[a.length]=d.label)}return a};bulletml.Root.prototype.findActionOrThrow=function(a){var b;if(b=this.findAction(a))return b;throw Error("action labeled '"+a+"' is undefined.");};bulletml.Root.prototype.findBullet=function(a){return i(this.bullets,
a)};bulletml.Root.prototype.findBulletOrThrow=function(a){var b;if(b=this.findBullet(a))return b;throw Error("bullet labeled '"+a+"' is undefined.");};bulletml.Root.prototype.findFire=function(a){return i(this.fires,a)};bulletml.Root.prototype.findFireOrThrow=function(a){var b;if(b=this.findFire(a))return b;throw Error("fire labeled '"+a+"' is undefined.");};bulletml.Root.prototype.getWalker=function(a,b){var c=new bulletml.Walker(this,b),d=this.findAction(a);if(d)return c._action=d,c};bulletml.Walker=
function(a,b){this._root=a;this._stack=[];this._cursor=-1;this._action=null;this._localScope={};this._globalScope={$rank:b||0}};bulletml.Walker.prototype.next=function(){this._cursor+=1;if(null!==this._action){var a=this._action.commands[this._cursor];if(void 0!==a){if(a instanceof bulletml.Action)return this.pushStack(),this._action=a,this._localScope=this.newScope(a.params),this.next();if(a instanceof bulletml.ActionRef)return this.pushStack(),this._action=this._root.findActionOrThrow(a.label),
this._localScope=this.newScope(a.params),this.next();if(a instanceof bulletml.Repeat)return this._localScope.loopCounter=0,this._localScope.loopEnd=this.evalParam(a.times),this.pushStack(),this._action=a.action.clone(),this._localScope=this.newScope(a.params),this.next();if(a instanceof bulletml.Fire){var b=new bulletml.Fire;b.bullet=a.bullet.clone(this);null!==a.direction&&(b.direction=new bulletml.Direction(this.evalParam(a.direction.value)),b.direction.type=a.direction.type);null!==a.speed&&(b.speed=
new bulletml.Speed(this.evalParam(a.speed.value)),b.speed.type=a.speed.type);return b}return a instanceof bulletml.FireRef?(this.pushStack(),this._action=new bulletml.Action,this._action.commands=[this._root.findFireOrThrow(a.label)],this._localScope=this.newScope(a.params),this.next()):a instanceof bulletml.ChangeDirection?(b=new bulletml.ChangeDirection,b.direction.type=a.direction.type,b.direction.value=this.evalParam(a.direction.value),b.term=this.evalParam(a.term),b):a instanceof bulletml.ChangeSpeed?
(b=new bulletml.ChangeSpeed,b.speed.type=a.speed.type,b.speed.value=this.evalParam(a.speed.value),b.term=this.evalParam(a.term),b):a instanceof bulletml.Accel?(b=new bulletml.Accel,b.horizontal.type=a.horizontal.type,b.horizontal.value=this.evalParam(a.horizontal.value),b.vertical.type=a.vertical.type,b.vertical.value=this.evalParam(a.vertical.value),b.term=this.evalParam(a.term),b):a instanceof bulletml.Wait?new bulletml.Wait(this.evalParam(a.value)):null}this.popStack();if(null===this._action)return null;
if((a=this._action.commands[this._cursor])&&"repeat"==a.commandName)this._localScope.loopCounter++,this._localScope.loopCounter<this._localScope.loopEnd&&(this.pushStack(),this._action=a.action.clone(),this._localScope=this.newScope(a.params));return this.next()}return null};bulletml.Walker.prototype.pushStack=function(){this._stack.push({action:this._action,cursor:this._cursor,scope:this._localScope});this._cursor=-1};bulletml.Walker.prototype.popStack=function(){var a=this._stack.pop();a?(this._cursor=
a.cursor,this._action=a.action,this._localScope=a.scope):(this._cursor=-1,this._action=null,this._localScope={})};bulletml.Walker.prototype.evalParam=function(a){var b;if("number"===typeof a)return a;if(isNaN(b=Number(a))){if((b=this._localScope[a])||(b=this._globalScope[a]))return b;if("$rand"==a)return Math.random()}else return b;b={};for(var c in this._globalScope)this._globalScope.hasOwnProperty(c)&&(b[c]=this._globalScope[c]);for(c in this._localScope)this._localScope.hasOwnProperty(c)&&(b[c]=
this._localScope[c]);b.$rand=Math.random();return eval("bulletml._temp = function() { return "+a.split("$").join("this.$")+"}").bind(b)()};bulletml.Walker.prototype.newScope=function(a){var b={};if(a)for(var c=0,d=a.length;c<d;c++)b["$"+(c+1)]=this.evalParam(a[c]);else for(c in this._localScope)this._localScope.hasOwnProperty(c)&&(b[c]=this._localScope[c]);return b};bulletml.Bullet=function(){this.root=this.label=null;this.direction=new bulletml.Direction(0);this.speed=new bulletml.Speed(1);this.actions=
[];this._localScope={}};bulletml.Bullet.prototype.getWalker=function(a){var a=new bulletml.Walker(this.root,a),b=new bulletml.Action;b.root=this.root;b.commands=this.actions;a._action=b;a._localScope=this._localScope;return a};bulletml.Bullet.prototype.clone=function(a){var b=new bulletml.Bullet;b.label=this.label;b.root=this.root;b.actions=this.actions;b.direction=new bulletml.Direction(a.evalParam(this.direction.value));b.direction.type=this.direction.type;b.speed=new bulletml.Speed(a.evalParam(this.speed.value));
b.speed.type=this.speed.type;b._localScope=a._localScope;return b};bulletml.Bullet.prototype.setRoot=function(a){this.root=a;for(var b=0,c=this.actions.length;b<c;b++)this.actions[b].setRoot(a)};bulletml.BulletRef=function(){this.label=this.root=null;this.params=[]};bulletml.BulletRef.prototype.clone=function(a){var b=a._localScope;a._localScope=a.newScope(this.params);var c=this.root.findBulletOrThrow(this.label).clone(a);a._localScope=b;return c};bulletml.BulletRef.prototype.setRoot=function(a){this.root=
a};bulletml.Command=function(){this.commandName=""};bulletml.Command.prototype.setRoot=function(a){this.root=a};bulletml.Action=function(){this.commandName="action";this.root=this.label=null;this.commands=[];this.params=[]};bulletml.Action.prototype=new bulletml.Command;bulletml.Action.prototype.setRoot=function(a){this.root=a;for(var b=0,c=this.commands.length;b<c;b++)this.commands[b].setRoot(a)};bulletml.Action.prototype.clone=function(){var a=new bulletml.Action;a.label=this.label;a.root=this.root;
a.commands=this.commands;return a};bulletml.ActionRef=function(){this.commandName="actionRef";this.root=this.label=null;this.params=[]};bulletml.ActionRef.prototype=new bulletml.Command;bulletml.Fire=function(){this.commandName="fire";this.bullet=this.speed=this.direction=this.root=this.label=null};bulletml.Fire.prototype=new bulletml.Command;bulletml.Fire.prototype.setRoot=function(a){this.root=a;this.bullet&&this.bullet.setRoot(a)};bulletml.FireRef=function(){this.commandName="fireRef";this.label=
null;this.params=[]};bulletml.FireRef.prototype=new bulletml.Command;bulletml.ChangeDirection=function(){this.commandName="changeDirection";this.direction=new bulletml.Direction;this.term=0};bulletml.ChangeDirection.prototype=new bulletml.Command;bulletml.ChangeSpeed=function(){this.commandName="changeSpeed";this.speed=new bulletml.Speed;this.term=0};bulletml.ChangeSpeed.prototype=new bulletml.Command;bulletml.Accel=function(){this.commandName="accel";this.horizontal=new bulletml.Horizontal;this.vertical=
new bulletml.Vertical;this.term=0};bulletml.Accel.prototype=new bulletml.Command;bulletml.Wait=function(a){this.commandName="wait";this.value=a||0};bulletml.Wait.prototype=new bulletml.Command;bulletml.Vanish=function(){this.commandName="vanish"};bulletml.Vanish.prototype=new bulletml.Command;bulletml.Repeat=function(){this.commandName="repeat";this.times=0;this.action=null;this.params=[]};bulletml.Repeat.prototype=new bulletml.Command;bulletml.Repeat.prototype.setRoot=function(a){this.root=a;this.action&&
this.action.setRoot(a)};bulletml.Direction=function(a){this.type="aim";this.value=a||0};bulletml.Speed=function(a){this.type="absolute";this.value=void 0===a?1:a};bulletml.Horizontal=function(a){this.type="absolute";this.value=a||0};bulletml.Vertical=function(a){this.type="absolute";this.value=a||0};bulletml.dsl=function(){for(var a in bulletml.dsl)bulletml.dsl.hasOwnProperty(a)&&(bulletml.GLOBAL[a]=bulletml.dsl[a])};bulletml.dsl.action=function(a){for(var b=0,c=arguments.length;b<c;b++)arguments[b]instanceof
Function&&(arguments[b]=arguments[b]());var d=new bulletml.Action;if(a instanceof Array){if(a.some(function(a){return!(a instanceof bulletml.Command)}))throw Error("argument type error.");d.commands=a}else{b=0;for(c=arguments.length;b<c;b++)if(arguments[b]instanceof bulletml.Command)d.commands[b]=arguments[b];else throw Error("argument type error.");}return d};bulletml.dsl.actionRef=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());
if(void 0===a)throw Error("label is required.");d=new bulletml.ActionRef;d.label=""+a;if(b instanceof Array)d.params=b;else for(c=1;c<arguments.length;c++)d.params.push(arguments[c]);return d};bulletml.dsl.bullet=function(a,b,c,d){for(var e=0,f=arguments.length;e<f;e++)arguments[e]instanceof Function&&(arguments[e]=arguments[e]());f=new bulletml.Bullet;for(e=0;e<arguments.length;e++)arguments[e]instanceof bulletml.Direction?f.direction=arguments[e]:arguments[e]instanceof bulletml.Speed?f.speed=arguments[e]:
arguments[e]instanceof bulletml.Action?f.actions.push(arguments[e]):arguments[e]instanceof bulletml.ActionRef?f.actions.push(arguments[e]):"string"===typeof arguments[e]&&(f.label=arguments[e]);return f};bulletml.dsl.bulletRef=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("label is required.");d=new bulletml.BulletRef;d.label=""+a;if(b instanceof Array)d.params=b;else for(c=1;c<arguments.length;c++)d.params.push(arguments[c]);
return d};bulletml.dsl.fire=function(a,b,c){for(var d=0,e=arguments.length;d<e;d++)arguments[d]instanceof Function&&(arguments[d]=arguments[d]());e=new bulletml.Fire;for(d=0;d<arguments.length;d++)arguments[d]instanceof bulletml.Direction?e.direction=arguments[d]:arguments[d]instanceof bulletml.Speed?e.speed=arguments[d]:arguments[d]instanceof bulletml.Bullet?e.bullet=arguments[d]:arguments[d]instanceof bulletml.BulletRef&&(e.bullet=arguments[d]);if(void 0===e.bullet)throw Error("bullet (or bulletRef) is required.");
return e};bulletml.dsl.fireRef=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("label is required.");d=new bulletml.FireRef;d.label=""+a;if(b instanceof Array)d.params=b;else for(c=1;c<arguments.length;c++)d.params.push(arguments[c]);return d};bulletml.dsl.changeDirection=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("direction is required.");
if(void 0===b)throw Error("term is required.");c=new bulletml.ChangeDirection;c.direction=a instanceof bulletml.Direction?a:new bulletml.Direction(a);c.term=b;return c};bulletml.dsl.changeSpeed=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("speed is required.");if(void 0===b)throw Error("term is required.");c=new bulletml.ChangeSpeed;c.speed=a instanceof bulletml.Speed?a:new bulletml.Speed(a);c.term=b;
return c};bulletml.dsl.accel=function(a,b,c){for(var d=0,e=arguments.length;d<e;d++)arguments[d]instanceof Function&&(arguments[d]=arguments[d]());e=new bulletml.Accel;for(d=0;d<arguments.length;d++)arguments[d]instanceof bulletml.Horizontal?e.horizontal=a:arguments[d]instanceof bulletml.Vertical?e.vertical=b:e.term=arguments[d];if(void 0===e.horizontal&&void 0===e.vertical)throw Error("horizontal or vertical is required.");if(void 0===e.term)throw Error("term is required.");return e};bulletml.dsl.wait=
function(a){for(var b=0,c=arguments.length;b<c;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===a)throw Error("value is required.");return new bulletml.Wait(a)};bulletml.dsl.vanish=function(){return new bulletml.Vanish};bulletml.dsl.repeat=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("times is required.");if(void 0===b)throw Error("action is required.");c=new bulletml.Repeat;
c.times=a;b instanceof bulletml.Action||b instanceof bulletml.ActionRef?c.action=b:b instanceof Array&&(c.action=bulletml.dsl.action(b));return c};bulletml.dsl.direction=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("value is required.");c=new bulletml.Direction(a);void 0!==b&&(c.type=b);return c};bulletml.dsl.speed=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=
arguments[c]());if(void 0===a)throw Error("value is required.");c=new bulletml.Speed(a);b&&(c.type=b);return c};bulletml.dsl.horizontal=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("value is required.");c=new bulletml.Horizontal(a);b&&(c.type=b);return c};bulletml.dsl.vertical=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===
a)throw Error("value is required.");c=new bulletml.Vertical(a);b&&(c.type=b);return c}})();var BulletML=bulletml;tm.bulletml=tm.bulletml||{};
(function(){function m(f){for(;f<=-Math.PI;)f+=2*Math.PI;for(;Math.PI<f;)f-=2*Math.PI;return f}tm.bulletml.AttackPattern=tm.createClass({init:function(f){if(!f)throw Error("argument is invalid.",f);this._bulletml=f},createTicker:function(f,e){var h=this._bulletml.getTopActionLabels();if(void 0===e&&0<h.length){for(var g=[],i=0,j=h.length;i<j;i++)g[g.length]=this._createTicker(f,h[i]);for(var d=function(){for(var e=g.length;e--;)g[e].call(this);d.compChildCount==g.length&&(d.completed=!0,this.dispatchEvent(tm.event.Event("completeattack")))},
i=g.length;i--;)g[i].parentTicker=d;d.compChildCount=0;d.completeChild=function(){this.compChildCount++};d.compChildCount=0;d.completed=!1;d.isDanmaku=!0;return d}return this._createTicker(f,e)},_createTicker:function(f,e){var h=f,g={},i=tm.bulletml.AttackPattern.defaultConfig,j;for(j in i)i.hasOwnProperty(j)&&(g[j]=i[j]);for(j in h)h.hasOwnProperty(j)&&(g[j]=h[j]);f=g;if(!f.target)throw Error("target is undefined in config.");var d=function(){d.age+=1;this.age=d.age;var e=d.config,f=d._pattern;if(f)if(d.age<
d.chDirEnd?d.direction+=d.dirIncr:d.age===d.chDirEnd&&(d.direction=d.dirFin),d.age<d.chSpdEnd?d.speed+=d.spdIncr:d.age===d.chSpdEnd&&(d.speed=d.spdFin),d.age<d.aclEnd?(d.speedH+=d.aclIncrH,d.speedV+=d.aclIncrV):d.age===d.aclEnd&&(d.speedH=d.aclFinH,d.speedV=d.aclFinV),this.x+=Math.cos(d.direction)*d.speed*e.speedRate,this.y+=Math.sin(d.direction)*d.speed*e.speedRate,this.x+=d.speedH*e.speedRate,this.y+=d.speedV*e.speedRate,e.isInsideOfWorld(this)){if(e.updateProperties&&(this.rotation=(d.direction+
0.5*Math.PI)*Math.RAD_TO_DEG,this.speed=d.speed),!(d.age<d.waitTo||d.completed)){for(var a;a=d.walker.next();)switch(a.commandName){case "fire":f._fire.call(this,a,e,d,f);break;case "wait":e=0;d.waitTo="number"===typeof a.value?d.age+a.value:0!==(e=~~a.value)?d.age+e:d.age+eval(a.value);return;case "changeDirection":f._changeDirection.call(this,a,e,d);break;case "changeSpeed":f._changeSpeed.call(this,a,d);break;case "accel":f._accel.call(this,a,d);break;case "vanish":this.remove(),this.dispatchEvent(tm.event.Event("removed"))}d.completed=
!0;d.parentTicker?d.parentTicker.completeChild():this.dispatchEvent(tm.event.Event("completeattack"))}}else this.remove(),d.completed=!0,d.parentTicker?d.parentTicker.completeChild():this.dispatchEvent(tm.event.Event("completeattack"))},e=e||"top";if("string"===typeof e)d.walker=this._bulletml.getWalker(e,f.rank);else if(e instanceof bulletml.Bullet)d.walker=e.getWalker(f.rank);else throw window.console.error(f,e),Error("\u5f15\u6570\u304c\u4e0d\u6b63");d._pattern=this;d.config=f;d.waitTo=-1;d.completed=
!1;d.direction=0;d.lastDirection=0;d.speed=0;d.lastSpeed=0;d.speedH=0;d.speedV=0;d.dirIncr=0;d.dirFin=0;d.chDirEnd=-1;d.spdIncr=0;d.spdFin=0;d.chSpdEnd=-1;d.aclIncrH=0;d.aclFinH=0;d.aclIncrV=0;d.aclFinV=0;d.aclEnd=-1;d.age=-1;d.isDanmaku=!0;return d},_fire:function(f,e,h,g){var i=e.bulletFactory({label:f.bullet.label});if(i){var j=g.createTicker(e,f.bullet),d=this;h.lastDirection=j.direction=function(f){var g=eval(f.value)*Math.DEG_TO_RAD;switch(f.type){case "aim":return e.target?Math.atan2(e.target.y-
d.y,e.target.x-d.x)+g:g-Math.PI/2;case "absolute":return g-Math.PI/2;case "relative":return h.direction+g;default:return h.lastDirection+g}}(f.direction||f.bullet.direction);h.lastSpeed=j.speed=function(d){var e=eval(d.value);switch(d.type){case "relative":return h.speed+e;case "sequence":return h.lastSpeed+e;default:return e}}(f.speed||f.bullet.speed);i.x=this.x;i.y=this.y;i.addEventListener("enterframe",j);i.addEventListener("removed",function(){this.removeEventListener("enterframe",j)});e.addTarget?
e.addTarget.addChild(i):this.parent&&this.parent.addChild(i)}},_changeDirection:function(f,e,h){var g=eval(f.direction.value)*Math.DEG_TO_RAD,i=eval(f.term);switch(f.direction.type){case "aim":f=e.target;if(!f)return;h.dirFin=Math.atan2(f.y-this.y,f.x-this.x)+g;h.dirIncr=m(h.dirFin-h.direction)/i;break;case "absolute":h.dirFin=g-Math.PI/2;h.dirIncr=m(h.dirFin-h.direction)/i;break;case "relative":h.dirFin=h.direction+g;h.dirIncr=m(h.dirFin-h.direction)/i;break;case "sequence":h.dirIncr=g,h.dirFin=
h.direction+h.dirIncr*(i-1)}h.chDirEnd=h.age+i},_changeSpeed:function(f,e){var h=eval(f.speed.value),g=eval(f.term);switch(f.speed.type){case "absolute":e.spdFin=h;e.spdIncr=(e.spdFin-e.speed)/g;break;case "relative":e.spdFin=h+e.speed;e.spdIncr=(e.spdFin-e.speed)/g;break;case "sequence":e.spdIncr=h,e.spdFin=e.speed+e.spdIncr*g}e.chSpdEnd=e.age+g},_accel:function(f,e){var h=eval(f.term);e.aclEnd=e.age+h;if(f.horizontal){var g=eval(f.horizontal.value);switch(f.horizontal.type){case "absolute":case "sequence":e.aclIncrH=
(g-e.speedH)/h;e.aclFinH=g;break;case "relative":e.aclIncrH=g,e.aclFinH=(g-e.speedH)*h}}else e.aclIncrH=0,e.aclFinH=e.speedH;if(f.vertical)switch(g=eval(f.vertical.value),f.vertical.type){case "absolute":case "sequence":e.aclIncrV=(g-e.speedV)/h;e.aclFinV=g;break;case "relative":e.aclIncrV=g,e.aclFinV=(g-e.speedV)*h}else e.aclIncrV=0,e.aclFinV=e.speedV}});var q=tm.graphics.RadialGradient(4,4,0,4,4,4);q.addColorStopList([{offset:0,color:"rgba(255, 255, 255, 1.0)"},{offset:0.5,color:"rgba(255, 255, 255, 1.0)"},
{offset:0.8,color:"rgba(255,   0,   0, 0.8)"},{offset:1,color:"rgba(255,   0,   0, 0.0)"}]);tm.bulletml.defaultBulletFactory=function(f){var e=tm.app.CircleShape(8,8,{strokeStyle:"none",fillStyle:q.toStyle()});e.blendMode="lighter";e.label=f.label;return e};tm.bulletml.defaultIsInsideOfWorld=function(){return!0};tm.bulletml.AttackPattern.defaultConfig={bulletFactory:tm.bulletml.defaultBulletFactory,isInsideOfWorld:tm.bulletml.defaultIsInsideOfWorld,rank:0,updateProperties:!1,speedRate:2,target:null}})();
