(this.webpackJsonpfokus=this.webpackJsonpfokus||[]).push([[0],{41:function(n,e,t){},48:function(n,e,t){"use strict";t.r(e);var r=t(2),a=t(1),i=t.n(a),c=t(10),o=t.n(c),s=(t(41),t(3)),d=t(8),u=t(9),l=t(35),f=t(6),x=t(22),b=Object(x.b)({name:"tasks",initialState:{taskArray:[],labels:{},meta:{globalKey:0,completedTaskStartIndex:-1,focussedTaskIndex:-1,showCompletedTasks:!0,completedTasksCount:0}},reducers:{create:function(n,e){var t=e.payload;n.taskArray.unshift(t),-1!=n.meta.completedTaskStartIndex&&++n.meta.completedTaskStartIndex},remove:function(n,e){var t=e.payload;n.taskArray=n.taskArray.filter((function(e){return e.id!==t||(e.isCompleted?(n.meta.completedTasksCount--,n.meta.completedTaskStartIndex==n.taskArray.length-1&&(n.meta.completedTaskStartIndex=-1)):-1!=n.meta.completedTaskStartIndex&&--n.meta.completedTaskStartIndex,!1)}))},addLabel:function(n,e){var t=e.payload;void 0!==n.labels[t]?n.labels[t]=n.labels[t]+1:n.labels[t]=1},updateTask:function(n,e){var t=e.payload;n.taskArray=n.taskArray.map((function(n){return n.id===t.id?t:n}))},updateTaskContent:function(n,e){var t=n.taskArray,r=e.payload;t.forEach((function(n){n.id===r.id&&(n.content=r.updatedTaskContent)}))},updateTaskTime:function(n,e){var t=n.taskArray,r=e.payload;t.forEach((function(n){n.id===r.id&&(n.remainingTime=60*r.updatedTime,n.time=60*r.updatedTime)}))},updateTaskTimeByVal:function(n,e){var t=e.payload;n.taskArray[t.focussedTaskIndex].remainingTime+=60*t.val,n.taskArray[t.focussedTaskIndex].time+=60*t.val,n.taskArray[t.focussedTaskIndex].remainingTime<0&&(n.taskArray[t.focussedTaskIndex].remainingTime=0),n.taskArray[t.focussedTaskIndex].time<0&&(n.taskArray[t.focussedTaskIndex].time=0)},updateOrder:function(n,e){var t=e.payload;n.taskArray=t},focusOnTask:function(n,e){var t=e.payload;n.meta.focussedTaskIndex=t},resetFocussedTask:function(n){n.meta.focussedTaskIndex=-1},tick:function(n,e){var t=e.payload;--n.taskArray[t].remainingTime},resetTaskTimer:function(n,e){var t=e.payload;n.taskArray[t].isRunning=!1,n.taskArray[t].remainingTime=n.taskArray[t].time},toggleIsRunning:function(n,e){var t=e.payload;void 0!==t.val?n.taskArray[t.idx].isRunning=t.val:n.taskArray[t.idx].isRunning=!n.taskArray[t.idx].isRunning},toggleShowCompletedTasks:function(n){n.meta.showCompletedTasks=!n.meta.showCompletedTasks},toggleIsCompleted:function(n,e){var t=e.payload;n.taskArray.forEach((function(e){e.id===t&&(e.isCompleted?--n.meta.completedTasksCount:++n.meta.completedTasksCount,e.isCompleted=!e.isCompleted)}))},clearCompletedTasks:function(n){-1!==n.meta.completedTaskStartIndex&&(n.taskArray.length=n.meta.completedTaskStartIndex,n.meta.completedTaskStartIndex=-1,n.meta.completedTasksCount=0)},incrementGlobalKey:function(n){++n.meta.globalKey},rearrange:function(n,e){var t=e.payload,r=t.id;if(t.markedAsComplete)if(-1===n.meta.completedTaskStartIndex){n.meta.completedTaskStartIndex=n.taskArray.length-1;for(var a=!1,i=0;i<n.taskArray.length-1;i++)if(a){var c=n.taskArray[i];n.taskArray[i]=n.taskArray[i+1],n.taskArray[i+1]=c}else if(n.taskArray[i].id===r){a=!0;var o=n.taskArray[i];n.taskArray[i]=n.taskArray[i+1],n.taskArray[i+1]=o}n.meta.completedTaskStartIndex=n.taskArray.length-1}else{for(var s,d,u=0;u<n.taskArray.length;u++)if(n.taskArray[u].id===r){s=n.taskArray[u],d=u;break}for(var l=-1,f=n.meta.completedTaskStartIndex;f<n.taskArray.length;f++)if(!(n.taskArray[f].globalKey>s.globalKey)){l=f;break}-1===l?n.taskArray.push(s):n.taskArray.splice(l,0,s),n.taskArray.splice(d,1),n.meta.completedTaskStartIndex-=1}else{if(0==n.meta.completedTaskStartIndex){for(var x,b,p=n.meta.completedTaskStartIndex;p<n.taskArray.length;p++)if(n.taskArray[p].id===r){x=n.taskArray[p],b=p;break}n.taskArray.splice(b,1),n.taskArray.unshift(x),n.meta.completedTaskStartIndex=1}else{for(var j,h,g=n.meta.completedTaskStartIndex;g<n.taskArray.length;g++)if(n.taskArray[g].id===r){j=n.taskArray[g],h=g;break}for(var m=-1,k=n.meta.completedTaskStartIndex-1;k>=0;k--)if(!(n.taskArray[k].globalKey<j.globalKey)){m=k;break}n.taskArray.splice(h,1),-1===m?n.taskArray.unshift(j):(m++,n.taskArray.splice(m,0,j)),n.meta.completedTaskStartIndex+=1}n.meta.completedTaskStartIndex==n.taskArray.length&&(n.meta.completedTaskStartIndex=-1)}}}}),p=b.actions,j=p.create,h=p.remove,g=p.addLabel,m=(p.updateTask,p.updateTaskContent),k=p.updateTaskTime,O=p.updateTaskTimeByVal,v=p.focusOnTask,y=p.resetFocussedTask,w=p.tick,T=p.resetTaskTimer,C=p.toggleIsRunning,I=p.toggleShowCompletedTasks,A=p.toggleIsCompleted,S=p.clearCompletedTasks,D=p.updateOrder,K=p.incrementGlobalKey,z=p.rearrange,R=b.reducer,F=t(4),E=t(17),B=t(12),M=t(33);function P(n){var e=n%60,t=Math.floor(n/60);return 0==e?e="00":e<10&&(e="0".concat(e)),0==t?t="00":t<10&&(t="0".concat(t)),"".concat(t,":").concat(e)}function W(n){var e=n%60,t=Math.floor(n/60);return 0==e?e="00":e<10&&(e="0".concat(e)),0==t?t="00":t<10&&(t="0".concat(t)),"".concat(t,"m ").concat(e,"s")}var L=t.p+"static/media/bulb.3da54d2d.svg",G=t.p+"static/media/glowBulb.c67ad172.svg",N=t.p+"static/media/tickmark.ce1bc136.svg";function H(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    height: 25%;\n    /* background-color: #fffa91; */\n    svg {\n        font-size: 0.8em;\n        margin: 5px;\n    }\n"]);return H=function(){return n},n}function U(){var n=Object(s.a)(["\n    height: 80%;\n    cursor: pointer;\n    margin-left: auto;\n    color: #0000cd;\n    &:hover {\n        color: red;\n    }\n"]);return U=function(){return n},n}function J(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    border-radius: 5px;\n    margin: 5px;\n    cursor: pointer;\n    &:hover {\n        background-color: #0000cd;\n        p {\n            color: #fff;\n        }\n    }\n    p {\n        margin: 5px;\n        font-weight: bold;\n        font-size: 0.65em;\n    }\n"]);return J=function(){return n},n}function V(){var n=Object(s.a)(["\n    height: 15px;\n    width: 30px;\n    margin-top: 5px;\n    text-align: center;\n    font-weight: bold;\n    &:focus {\n        outline: none;\n        border: 2px #0000cd dashed;\n        border-radius: 2px;\n    }\n"]);return V=function(){return n},n}function $(){var n=Object(s.a)(["\n    resize: none;\n    height: 90%;\n    width: 100%;\n    font-size: 0.9em;\n    overflow: hidden;\n    vertical-align: center;\n    font-weight: bold;\n    &:focus {\n        outline: none;\n        border: 2px #0000cd dashed;\n        border-radius: 5px;\n    }\n"]);return $=function(){return n},n}function q(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    height: 65%;\n    margin: 0 0 0 5px;\n    word-wrap: break-word;\n    /* background-color: #fffcec; */\n    p {\n        font-size: 0.9em;\n        font-weight: bold;\n        min-width: 0;\n        &:hover {\n            cursor: text;\n        }\n    }\n"]);return q=function(){return n},n}function Q(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    height: 100%;\n    width: 75%;\n    margin: 0 0 0 10px;\n    /* background-color: #fff1fc; */\n"]);return Q=function(){return n},n}function X(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    width: 15%;\n    /* background-color: #f8f8ff; */\n    position: relative;\n    p {\n        margin: 5px;\n        font-weight: bold;\n        font-size: 0.7em;\n    }\n    img {\n        width: ",";\n    }\n"]);return X=function(){return n},n}function Y(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: space-around;\n    flex-direction: row;\n    height: 100%;\n    width: 376px;\n    border-radius: 10px;\n    background-color: #fff;\n    -webkit-box-shadow: ",";\n    box-shadow: ",";\n"]);return Y=function(){return n},n}function Z(){var n=Object(s.a)(['\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    width: 25px;\n    height: 100%;\n    /* background-color: #ff09ac; */\n    svg {\n        cursor: url("https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur"), default !important;\n        opacity: 0.7;\n    }\n']);return Z=function(){return n},n}function _(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    width: 420px;\n    height: 100px;\n    margin-top: 15px;\n    /* background-color: #fff4e1; */\n"]);return _=function(){return n},n}var nn=F.a.div(_()),en=F.a.div(Z()),tn=F.a.div(Y(),(function(n){return n.isFocussed?"0 1px 8px rgb(248,185,23,0.8)":"0 5px 10px rgba(166,173,201,0.2)"}),(function(n){return n.isFocussed?"0 1px 8px rgb(248,185,23,0.8)":"0 5px 10px rgba(166,173,201,0.2)"})),rn=F.a.div(X(),(function(n){return n.isCompleted?"35px":"60px"})),an=F.a.div(Q()),cn=F.a.div(q()),on=F.a.textarea($()),sn=F.a.input(V()),dn=F.a.div(J()),un=F.a.div(U()),ln=F.a.div(H());function fn(n){var e,t=n.task,i=n.taskIndex,c=n.focussedTaskGlobalKey,o=n.forwardRBDProvided,s=n.isFocussed,l=n.focussedTaskIndex,x=Object(f.c)(),b=Object(a.useState)(!1),p=Object(d.a)(b,2),j=p[0],g=p[1],O=Object(a.useState)(t.content),w=Object(d.a)(O,2),T=w[0],I=w[1],S=Object(a.useState)(!1),D=Object(d.a)(S,2),K=D[0],R=D[1],F=Object(a.useState)(Math.floor(t.time/60)),W=Object(d.a)(F,2),H=W[0],U=W[1],J=Object(a.useState)(!1),V=Object(d.a)(J,2),$=V[0],q=V[1];return Object(r.jsx)(B.a,{flipId:"".concat(t.id),children:Object(r.jsxs)(nn,Object(u.a)(Object(u.a)(Object(u.a)({ref:o.innerRef},o.draggableProps),o.dragHandleProps),{},{onMouseEnter:function(){return q(!t.isCompleted&&!0)},onMouseLeave:function(){return q(!t.isCompleted&&!1)},children:[Object(r.jsx)(en,{children:$&&Object(r.jsx)(M.a,{})}),Object(r.jsxs)(tn,{isFocussed:s,children:[Object(r.jsxs)(rn,{isFocussed:s,isCompleted:t.isCompleted,children:[t.isCompleted?Object(r.jsx)("img",{src:N,alt:"Done"}):s?Object(r.jsx)("img",{src:G,alt:"Focussed"}):Object(r.jsx)("img",{src:L,alt:"Unfocussed"}),!t.isCompleted&&(K?Object(r.jsx)(sn,{autoFocus:!0,value:H,onBlur:function(){x(k({id:t.id,updatedTime:H})),R(!1)},onKeyDown:function(n){"Enter"===n.key&&(x(k({id:t.id,updatedTime:H})),R(!1))},onChange:function(n){return U(n.target.value)}}):Object(r.jsx)("p",{onDoubleClick:function(){return R(!0)},children:P(t.remainingTime)}))]}),Object(r.jsxs)(an,{children:[Object(r.jsx)(cn,{children:j?Object(r.jsx)(on,{autoFocus:!0,value:T,onBlur:function(){x(m({id:t.id,updatedTaskContent:T})),g(!1)},onKeyDown:function(n){if("Enter"===n.key&&T.trim().length>=3){T.trim().split(" ");x(m({id:t.id,updatedTaskContent:T})),g(!1)}},onChange:function(n){return I(n.target.value)}}):Object(r.jsx)("p",{onDoubleClick:function(){return g(!0)},children:(e=t.content,e.length<=60?e:e.substring(0,60)+"...")})}),Object(r.jsxs)(ln,{children:[!t.isCompleted&&Object(r.jsx)(dn,{isDoneBtn:!1,onClick:s?function(){t.isRunning&&x(C({idx:l})),x(y())}:function(){-1!==l&&x(C({idx:l,val:!1})),x(v(i))},children:Object(r.jsx)("p",{children:s?"Unfocus":"Focus"})}),Object(r.jsx)(dn,{isDoneBtn:!0,onClick:t.isCompleted?function(n){-1!==l&&c<t.globalKey&&x(v(l+1)),x(A(t.id)),x(z({id:t.id,markedAsComplete:!1})),n.stopPropagation()}:function(n){i<l&&x(v(l-1)),t.isRunning&&x(C({idx:i})),s&&x(y()),x(A(t.id)),x(z({id:t.id,markedAsComplete:!0})),n.stopPropagation()},children:Object(r.jsx)("p",{children:t.isCompleted?"Undone":"Done"})}),null!==t.label?Object(r.jsx)("p",{children:t.label}):Object(r.jsx)("p",{children:"add label"}),!s&&Object(r.jsx)(un,{onClick:function(n){i<l&&x(v(l-1)),x(h(t.id)),n.stopPropagation()},children:Object(r.jsx)(E.c,{})})]})]})]})]}))})}var xn=t(23),bn=t(18);function pn(){var n=Object(s.a)(["\n    height: 100%;\n    width: 30%;\n    font-size: 0.9em;\n    text-align: center;\n    background-color: #fff;\n    border: 0;\n    outline: none;\n    font-weight: bold;\n    &::placeholder {\n        color: #c1c1d7;\n    }\n    &::-webkit-inner-spin-button,\n    &::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        appearance: none;\n        margin: 0;\n    }\n"]);return pn=function(){return n},n}function jn(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    height: 90%;\n    width: 25%;\n    color: #c1c1d7;\n    span {\n        font-size: 0.8em;\n        font-weight: bold;\n    }\n    svg {\n        font-size: 1.2em;\n        color: #c1c1d7;\n    }\n"]);return jn=function(){return n},n}function hn(){var n=Object(s.a)(["\n    height: 100%;\n    width: 90%;\n    font-size: 0.9em;\n    background-color: #fff;\n    border: 0;\n    outline: none;\n    font-weight: bold;\n    &::placeholder {\n        color: #c1c1d7;\n    }\n"]);return hn=function(){return n},n}function gn(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 90%;\n    width: 70%;\n    margin-left: 10px;\n    svg {\n        font-size: 1.3em;\n        margin-right: 5px;\n        color: #c1c1d7;\n    }\n"]);return gn=function(){return n},n}function mn(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin: 20px;\n    width: 420px;\n    border-radius: 10px;\n    background-color: #fff;\n    height: 50px;\n    -webkit-box-shadow: 0 5px 10px rgba(166, 173, 201, 0.2);\n    box-shadow: 0 5px 10px rgba(166, 173, 201, 0.2);\n"]);return mn=function(){return n},n}var kn=F.a.div(mn()),On=F.a.div(gn()),vn=F.a.input(hn()),yn=F.a.div(jn()),wn=F.a.input(pn());function Tn(){var n,e,t=Object(a.useState)(""),i=Object(d.a)(t,2),c=i[0],o=i[1],s=Object(a.useState)(20),u=Object(d.a)(s,2),l=u[0],x=u[1],b=Object(f.d)((function(n){return n.tasks.meta})),p=Object(f.c)();function h(t){if("Enter"===t.key&&c.trim().length>=1){var r=c.trim().split(" "),a=l,i=null;1!==r.length&&(isNaN(parseInt(r[r.length-1]))?"#"===r[r.length-1][0]&&r[r.length-1].length>1&&(i=(i=r.pop().substring(1)).toLowerCase()):a=parseInt(r.pop())),r=r.join(" ");var s={id:Math.floor(1e4*Math.random()),globalKey:b.globalKey,content:r,time:60*a,remainingTime:60*a,isRunning:!1,isCompleted:!1,createdAt:(new Date).toISOString(),label:i};-1!==b.focussedTaskIndex&&p(v(b.focussedTaskIndex+1)),p(j(s)),null!==i&&p(g(i)),p(K()),o(""),x(20),n.value="",e.value="",n.focus()}}return Object(r.jsxs)(kn,{children:[Object(r.jsxs)(On,{children:[Object(r.jsx)(bn.b,{onClick:function(){return n.focus()}}),Object(r.jsx)(vn,{type:"text",placeholder:"i have to focus on ...",ref:function(e){return n=e},onChange:function(n){return o(n.target.value)},onKeyDown:h})]}),Object(r.jsxs)(yn,{children:[Object(r.jsx)(bn.a,{onClick:function(){return e.focus()}}),Object(r.jsx)(wn,{type:"number",placeholder:"20",ref:function(n){return e=n},onChange:function(n){return x(n.target.value)},onKeyDown:h}),Object(r.jsx)("span",{children:"mins"})]})]})}var Cn=t(26);function In(){var n=Object(s.a)(["\n    display: flex;\n    width: 70px;\n    height: 30px;\n    justify-content: space-around;\n    align-items: center;\n    border-radius: 5px;\n    background-color: #fff;\n    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);\n    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);\n    svg {\n        color: #0000cd;\n        cursor:pointer;\n    }\n"]);return In=function(){return n},n}function An(){var n=Object(s.a)(["\n    width: 90px;\n    position: relative;\n    top: 3px;\n    color: #0000cd;\n    p {\n        margin: 0;\n        font-weight: bold;\n        letter-spacing:",";\n    }\n"]);return An=function(){return n},n}function Sn(){var n=Object(s.a)(["\n    width: 100%;\n    position: relative;\n    margin: 15px;\n    border-bottom: 3px solid #0000cd;\n"]);return Sn=function(){return n},n}function Dn(){var n=Object(s.a)(["\n    display: flex;\n    margin: 15px 0 15px 25px;\n"]);return Dn=function(){return n},n}var Kn=F.a.div(Dn()),zn=F.a.div(Sn()),Rn=F.a.div(An(),(function(n){return n.showCompletedTasks?"3px":"1px"})),Fn=F.a.div(In());function En(){var n=Object(a.useState)(!1),e=Object(d.a)(n,2),t=e[0],i=e[1],c=Object(f.d)((function(n){return n.tasks.meta.showCompletedTasks})),o=Object(f.d)((function(n){return n.tasks.meta.completedTasksCount})),s=Object(f.c)();return Object(r.jsx)(B.a,{flipId:"-1",children:Object(r.jsxs)(Kn,{children:[Object(r.jsx)(zn,{}),Object(r.jsx)(Rn,{showCompletedTasks:c,onMouseEnter:function(){return i(!0)},onMouseLeave:function(){return i(!1)},children:t?Object(r.jsxs)(Fn,{children:[c?Object(r.jsx)(Cn.a,{onClick:function(){return s(I())}}):Object(r.jsx)(Cn.b,{onClick:function(){return s(I())}}),Object(r.jsx)(bn.c,{onClick:function(){return s(S())}})]}):Object(r.jsx)("p",{children:c?"DONE":"DONE(".concat(o,")")})}),Object(r.jsx)(zn,{})]})})}var Bn=t.p+"static/media/tasksDone.1ee36799.svg";function Mn(){var n=Object(s.a)(["\n    p {\n        font-weight: bold;\n        margin: 0;\n        color: #c1c1d7;\n    }\n"]);return Mn=function(){return n},n}function Pn(){var n=Object(s.a)(["\n    img {\n        width: 60px;\n    }\n"]);return Pn=function(){return n},n}function Wn(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: space-evenly;\n    width: 246px;\n    height: 140px;\n    background-color: #fff;\n    border-radius: 10px;\n    margin: 20px;\n    -webkit-box-shadow: 0 3px 6px rgba(166, 173, 201, 0.2);\n    box-shadow: 0 3px 6px rgba(166, 173, 201, 0.2);\n"]);return Wn=function(){return n},n}var Ln=F.a.div(Wn()),Gn=F.a.div(Pn()),Nn=F.a.div(Mn());function Hn(n){var e=n.allCompleted;return Object(r.jsxs)(Ln,{children:[Object(r.jsx)(Gn,{children:Object(r.jsx)("img",{src:Bn,alt:"Tasks Done"})}),Object(r.jsx)(Nn,{children:e?Object(r.jsx)("p",{children:"create some more tasks"}):Object(r.jsx)("p",{children:"create a new task"})})]})}function Un(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: #f7f7fa;\n    flex: 2 1 0;\n    -webkit-box-shadow: inset -3px 0 10px rgba(166, 173, 201, 0.3);\n    box-shadow: inset -3px 0 10px rgba(166, 173, 201, 0.3);\n"]);return Un=function(){return n},n}var Jn=F.a.div(Un());function Vn(){var n=Object(f.d)((function(n){return n.tasks.taskArray})),e=Object(f.d)((function(n){return n.tasks.meta})),t=-1!==e.focussedTaskIndex?n[e.focussedTaskIndex]:null,a=Object(f.c)();function i(n){return null!==t&&t.id===n}return Object(r.jsxs)(Jn,{children:[Object(r.jsx)(Tn,{focussedTaskIndex:e.focussedTaskIndex}),0===n.length?Object(r.jsx)(Hn,{}):n.length===e.completedTasksCount&&Object(r.jsx)(Hn,{allCompleted:!0}),Object(r.jsxs)(B.b,{flipKey:function(){var t="";return n.forEach((function(n){t+="".concat(n.globalKey)})),t+="".concat(e.completedTaskStartIndex)}(),children:[Object(r.jsx)(xn.a,{onDragEnd:function(t){if(t.destination){var r=Object(l.a)(n.map((function(n){return Object(u.a)({},n)}))),i=r.splice(t.source.index,1),c=Object(d.a)(i,1)[0];r.splice(t.destination.index,0,c);for(var o=t.source.index,s=t.destination.index>t.source.index;o!=t.destination.index;)s?(r[o].globalKey=n[o].globalKey,o++):(r[o].globalKey=n[o].globalKey,o--),o==t.destination.index&&(r[o].globalKey=n[o].globalKey);if(-1!==e.focussedTaskIndex){var f=Math.max(t.destination.index,t.source.index),x=Math.min(t.destination.index,t.source.index);t.source.index===e.focussedTaskIndex?a(v(t.destination.index)):e.focussedTaskIndex>=x&&e.focussedTaskIndex<=f&&(t.destination.index>t.source.index?a(v(e.focussedTaskIndex-1)):a(v(e.focussedTaskIndex+1)))}a(D(r))}},children:Object(r.jsx)(xn.c,{droppableId:"dropArea",children:function(t){return Object(r.jsxs)("div",Object(u.a)(Object(u.a)({},t.droppableProps),{},{ref:t.innerRef,children:[n.map((function(t,a){return t.isCompleted?"":Object(r.jsx)(xn.b,{isDragDisabled:t.isCompleted,draggableId:"".concat(t.id),index:a,children:function(c){return Object(r.jsx)(fn,{focussedTaskIndex:e.focussedTaskIndex,focussedTaskGlobalKey:-1!==e.focussedTaskIndex?n[e.focussedTaskIndex].globalKey:-1,taskIndex:a,forwardRBDProvided:c,task:t,isFocussed:i(t.id)})}},t.id)})),t.placeholder]}))}})}),-1!==e.completedTaskStartIndex&&Object(r.jsx)(En,{}),e.showCompletedTasks&&n.map((function(t,a){return t.isCompleted?Object(r.jsx)(fn,{focussedTaskIndex:e.focussedTaskIndex,focussedTaskGlobalKey:-1!==e.focussedTaskIndex?n[e.focussedTaskIndex].globalKey:-1,taskIndex:a,forwardRBDProvided:{innerRef:null},task:t,isFocussed:i(t.id)},t.id):""}))]})]})}t(15);var $n=t(14),qn=function(){return Object(r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})},Qn=t.p+"static/media/ding.86b39a2c.mp3";function Xn(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 20%;\n    margin-bottom: 10px;\n"]);return Xn=function(){return n},n}function Yn(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    text-align: center;\n    margin: 5px;\n    height: 30%;\n    width: 90%;\n    word-wrap: break-word;\n    p {\n        min-width: 0;\n        font-weight: bold;\n        margin: 3px;\n    }\n"]);return Yn=function(){return n},n}function Zn(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    background-color: ",";\n    border-radius: 50%;\n    width: 30px;\n    height: 30px;\n    top: 7px;\n    right: 7px;\n    cursor: ",";\n    svg {\n        color: #fff;\n        width:20px;\n    }\n"]);return Zn=function(){return n},n}function _n(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 30px;\n    height: 30px;\n    cursor: pointer;\n"]);return _n=function(){return n},n}function ne(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 55px;\n    height: 55px;\n    background-color: #0000cd;\n    border-radius: 50%;\n    margin: 10px 20px;\n    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);\n    -webkit-box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);\n    svg {\n        color: #fff;\n        font-size: 1.8em;\n        margin-left:",";\n    }\n    cursor: pointer;\n"]);return ne=function(){return n},n}function ee(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 90px;\n    height: 90px;\n    background-color: #fff;\n    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);\n    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);\n    border-radius: 50%;\n    & > p {\n        font-size: 0.9em;\n        font-weight: bold;\n        color: ",";\n    }\n"]);return ee=function(){return n},n}function te(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 50%;\n"]);return te=function(){return n},n}function re(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n"]);return re=function(){return n},n}var ae=new Audio(Qn),ie=F.a.div(re()),ce=F.a.div(te()),oe=F.a.div(ee(),(function(n){return n.isDisabled?"#c1c1d7":"#000"})),se=F.a.div(ne(),(function(n){return n.isPlayBtn?"3px":"0"})),de=F.a.div(_n()),ue=F.a.div(Zn(),(function(n){return n.isDisabled?"#c1c1d7":"#0000cd"}),(function(n){return n.isDisabled?"default":"pointer"})),le=F.a.div(Yn()),fe=F.a.div(Xn());function xe(){var n=Object(f.d)((function(n){return n.tasks.meta.focussedTaskIndex})),e=Object(f.d)((function(e){return-1!==n?e.tasks.taskArray[n]:null})),t=Object(f.c)();function i(r){e.isCompleted||(e.isRunning&&t(C({idx:n})),t(O({focussedTaskIndex:n,val:r})))}return function(n,e){var t=Object(a.useRef)();Object(a.useEffect)((function(){t.current=n}),[n]),Object(a.useEffect)((function(){if(null!==e){var n=setInterval((function(){t.current()}),e);return function(){return clearInterval(n)}}}),[e])}((function(){null!==e&&(e.remainingTime>0?t(w(n)):0===e.remainingTime&&(t(C({idx:n})),ae.play()))}),null!==e&&e.isRunning?1e3:null),Object(r.jsxs)(ie,{children:[Object(r.jsx)(ce,{children:Object(r.jsx)("div",{style:{width:120,height:120},children:Object(r.jsx)($n.a,{value:0!==e.time?Math.floor(e.remainingTime/e.time*100):0,styles:Object($n.b)({strokeLinecap:"butt",pathColor:"#0000cd",trailColor:"#EFF7FF"}),strokeWidth:7,children:Object(r.jsx)(oe,{children:Object(r.jsx)("p",{children:W(e.remainingTime)})})})})}),Object(r.jsx)(le,{children:Object(r.jsx)("p",{children:e.content})}),Object(r.jsxs)(fe,{children:[Object(r.jsx)(de,{onClick:function(){return i(-5)},children:Object(r.jsx)("h4",{children:"-5"})}),Object(r.jsx)(se,{isPlayBtn:!e.isRunning,onClick:function(){return t(C({idx:n}))},children:e.isRunning?Object(r.jsx)(E.a,{}):Object(r.jsx)(E.b,{})}),Object(r.jsx)(de,{onClick:function(){return i(5)},children:Object(r.jsx)("h4",{children:"+5"})})]}),Object(r.jsx)(ue,{onClick:function(){return t(T(n))},children:Object(r.jsx)(qn,{})})]})}var be=t(34);function pe(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    text-align: center;\n    margin: 10px;\n    height: 20%;\n    width: 90%;\n    p {\n        margin-bottom: 10px;\n        display: inline-block;\n        font-weight: bold;\n        color: #c1c1d7;\n    }\n"]);return pe=function(){return n},n}function je(){var n=Object(s.a)(["\n    display: flex;\n    height: 30%;\n    svg {\n        font-size: 80px;\n        color: #c1c1d7;\n    }\n"]);return je=function(){return n},n}function he(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n"]);return he=function(){return n},n}function ge(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    background-color: ",";\n    border-radius: 50%;\n    width: 30px;\n    height: 30px;\n    top: 7px;\n    right: 7px;\n    cursor: ",";\n    svg {\n        color: #fff;\n        width: 20px;\n    }\n"]);return ge=function(){return n},n}function me(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 90px;\n    height: 90px;\n    background-color: #fff;\n    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);\n    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.2);\n    border-radius: 50%;\n    & > p {\n        font-size: 0.9em;\n        font-weight: bold;\n        color: ",";\n    }\n"]);return me=function(){return n},n}function ke(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 50%;\n"]);return ke=function(){return n},n}var Oe=F.a.div(ke()),ve=F.a.div(me(),(function(n){return n.isDisabled?"#c1c1d7":"#000"})),ye=F.a.div(ge(),(function(n){return n.isDisabled?"#c1c1d7":"#0000cd"}),(function(n){return n.isDisabled?"default":"pointer"})),we=F.a.div(he()),Te=F.a.div(je()),Ce=F.a.div(pe());function Ie(){return Object(r.jsxs)(we,{children:[Object(r.jsx)(Oe,{children:Object(r.jsx)("div",{style:{width:120,height:120},children:Object(r.jsx)($n.a,{value:100,styles:Object($n.b)({pathColor:"#c1c1d7"}),strokeWidth:6,children:Object(r.jsx)(ve,{isDisabled:!0,children:Object(r.jsx)("p",{children:"00m 00s"})})})})}),Object(r.jsx)(Te,{children:Object(r.jsx)(be.a,{})}),Object(r.jsx)(Ce,{children:Object(r.jsx)("p",{children:"Choose a task to focus on"})}),Object(r.jsx)(ye,{isDisabled:!0,children:Object(r.jsx)(qn,{})})]})}var Ae=t(21);function Se(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    position: absolute;\n    bottom: 5px;\n    right: 15px;\n    p {\n        font-weight: bold;\n    }\n    span {\n        font-size: 0.5em;\n    }\n"]);return Se=function(){return n},n}function De(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    width: 40%;\n    margin-top: 5px;\n    margin-left: 3px;\n    /* background-color: #c1c1c1; */\n    p {\n        font-size: 1.2em;\n        font-weight: bold;\n        margin: 0;\n        margin-right: 3px;\n    }\n    span {\n        font-size: 0.5em;\n    }\n"]);return De=function(){return n},n}function Ke(){var n=Object(s.a)(["\n    width: 18px;\n    height: 18px;\n    background-color: ",";\n    border-radius: 50%;\n    margin-right: 10px;\n"]);return Ke=function(){return n},n}function ze(){var n=Object(s.a)(["\n    display: flex;\n    /* justify-content: space-evenly; */\n    align-items: center;\n    width: 90%;\n    height: 60%;\n    /* background-color: #f5f5fa; */\n"]);return ze=function(){return n},n}function Re(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    position: relative;\n    width: 100%;\n    height: 100%;\n"]);return Re=function(){return n},n}var Fe=F.a.div(Re()),Ee=F.a.div(ze()),Be=F.a.div(Ke(),(function(n){return n.color})),Me=F.a.div(De()),Pe=F.a.div(Se());function We(){var n=Object(f.d)((function(n){return n.tasks.meta.completedTasksCount})),e=Object(f.d)((function(n){return n.tasks.taskArray.length})),t=0!==e?Math.floor(n/e*100):100;return Object(r.jsxs)(Fe,{children:[Object(r.jsxs)(Ee,{children:[Object(r.jsxs)(Me,{children:[Object(r.jsx)(Be,{color:"#0000cd"}),Object(r.jsx)("p",{children:n}),Object(r.jsx)("span",{children:"done"})]}),Object(r.jsxs)(Me,{children:[Object(r.jsx)(Be,{color:"#c1c1d7"}),Object(r.jsx)("p",{children:e}),Object(r.jsx)("span",{children:"tasks"})]}),Object(r.jsxs)(Pe,{children:[Object(r.jsx)("p",{children:t}),Object(r.jsx)("span",{children:"%"})]})]}),Object(r.jsx)("div",{style:{width:"90%"},children:Object(r.jsx)(Ae.a,{percent:t,strokeWidth:"5",trailWidth:"5",trailColor:"#C1C1D7",strokeColor:"#0000CD"})})]})}function Le(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content:center;\n    width: 90%;\n    height: 60%;\n    span{\n        font-weight:bold;\n        font-size:0.8em;\n        color:#c1c1d7;\n    }\n"]);return Le=function(){return n},n}function Ge(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    position: relative;\n    width: 100%;\n    height: 100%;\n"]);return Ge=function(){return n},n}var Ne=F.a.div(Ge()),He=F.a.div(Le());function Ue(){return Object(r.jsxs)(Ne,{children:[Object(r.jsx)(He,{children:Object(r.jsx)("span",{children:"create tasks and track summary"})}),Object(r.jsx)("div",{style:{width:"90%"},children:Object(r.jsx)(Ae.a,{percent:70,strokeWidth:"5",trailWidth:"5",trailColor:"#C1C1D7",strokeColor:"#0000CD"})})]})}function Je(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    position: relative;\n    width: 276px;\n    height: 346px;\n    margin: 20px;\n    border-radius: 10px;\n    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5);\n    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.5);\n    background-color: #f7f7fa;\n"]);return Je=function(){return n},n}function Ve(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    position: relative;\n    width: 276px;\n    height: 90px;\n    margin: 20px;\n    border-radius: 10px;\n    -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);\n    box-shadow: 0 2px 10px rgba(166, 173, 201, 0.4);\n    background-color: #fff;\n"]);return Ve=function(){return n},n}function $e(){var n=Object(s.a)(["\n    flex: 3 1 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n"]);return $e=function(){return n},n}var qe=F.a.div($e()),Qe=F.a.div(Ve()),Xe=F.a.div(Je());function Ye(){var n=Object(f.d)((function(n){return n.tasks.meta.focussedTaskIndex})),e=Object(f.d)((function(n){return n.tasks.taskArray.length}));return Object(r.jsxs)(qe,{children:[Object(r.jsx)(Qe,{children:0!==e?Object(r.jsx)(We,{}):Object(r.jsx)(Ue,{})}),Object(r.jsx)(Xe,{children:-1!==n?Object(r.jsx)(xe,{}):Object(r.jsx)(Ie,{})})]})}function Ze(){var n=Object(s.a)(["\n    flex: 1 1 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color:#0000cd;\n"]);return Ze=function(){return n},n}var _e=F.a.div(Ze());function nt(){return Object(r.jsx)(_e,{})}function et(){var n=Object(s.a)(["\n    display: flex;\n    height:100%;\n"]);return et=function(){return n},n}var tt=F.a.div(et());var rt=function(){return Object(r.jsxs)(tt,{children:[Object(r.jsx)(nt,{}),Object(r.jsx)(Ye,{}),Object(r.jsx)(Vn,{})]})},at=Object(x.a)({reducer:{tasks:R}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(f.a,{store:at,children:Object(r.jsx)(rt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()}))}},[[48,1,2]]]);
//# sourceMappingURL=main.2e9c383b.chunk.js.map