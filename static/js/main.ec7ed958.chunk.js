(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e){e.exports={A:{id:"A",optimisticTime:5,mostLikelyTime:6,pessimisticTime:7,predecessors:[]},B:{id:"B",optimisticTime:1,mostLikelyTime:3,pessimisticTime:5,predecessors:[]},C:{id:"C",optimisticTime:1,mostLikelyTime:4,pessimisticTime:7,predecessors:[]},D:{id:"D",optimisticTime:1,mostLikelyTime:2,pessimisticTime:3,predecessors:["A"]},E:{id:"E",optimisticTime:1,mostLikelyTime:2,pessimisticTime:9,predecessors:["B"]},F:{id:"F",optimisticTime:1,mostLikelyTime:5,pessimisticTime:9,predecessors:["C"]},G:{id:"G",optimisticTime:2,mostLikelyTime:2,pessimisticTime:8,predecessors:["C"]},H:{id:"H",optimisticTime:4,mostLikelyTime:4,pessimisticTime:10,predecessors:["E","F"]},I:{id:"I",optimisticTime:2,mostLikelyTime:5,pessimisticTime:8,predecessors:["D"]},J:{id:"J",optimisticTime:2,mostLikelyTime:2,pessimisticTime:8,predecessors:["H","G"]}}},17:function(e,t,i){e.exports=i(33)},23:function(e,t,i){},33:function(e,t,i){"use strict";i.r(t);var s=i(0),c=i.n(s),r=i(10),n=i.n(r),a=(i(23),i(11)),l=i(12),m=i(15),o=i(13),d=i(16),u=i(1),p=i(4),T=i(2),h=i.n(T),b=i(14),k=h()(b),E=function(e,t){return e===T.START||e===T.END?"blue":t.criticalPath.indexOf(e)>-1?"red":"green"},y=function(e){function t(e){var i;return Object(a.a)(this,t),(i=Object(m.a)(this,Object(o.a)(t).call(this,e))).state={selected:void 0},i.handleSelect=i.handleSelect.bind(Object(u.a)(Object(u.a)(i))),i}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleSelect",value:function(e){this.setState({selected:e})}},{key:"renderSelected",value:function(){return this.state.selected&&k.activitiesParams[this.state.selected]?c.a.createElement("div",{style:{float:"right"}},"Selected node: ",this.state.selected,c.a.createElement("br",null),"Expected Time: ",k.activitiesParams[this.state.selected].expectedTime,c.a.createElement("br",null),"Slack: ",k.slack[this.state.selected],c.a.createElement("br",null),c.a.createElement("br",null),"Earliest Start: ",k.earliestStartTimes[this.state.selected],c.a.createElement("br",null),"Earliest Finish: ",k.earliestFinishTimes[this.state.selected],c.a.createElement("br",null),c.a.createElement("br",null),"Latest Start: ",k.latestStartTimes[this.state.selected],c.a.createElement("br",null),"Latest Finish: ",k.latestFinishTimes[this.state.selected],c.a.createElement("br",null)):null}},{key:"render",value:function(){var e=this;return c.a.createElement("div",null,c.a.createElement("p",null,"Probability to complete in 19 days: ",Object(T.pertProbability)(k,19)),"Click on the node for details",this.renderSelected(),c.a.createElement("div",null,c.a.createElement(p.InteractiveForceGraph,{zoom:!0,onDeselectNode:function(){return e.handleSelect()},onSelectNode:function(t,i){return e.handleSelect(i.id)},simulationOptions:{height:800,width:800,strength:{collide:127,charge:5}}},Object.keys(k.network).map(function(e){return c.a.createElement(p.ForceGraphNode,{node:{id:e,radius:10},fill:E(e,k),showLabel:!0,key:"node|".concat(e)})}),Object.keys(k.network).map(function(e){return k.network[e].successors.map(function(t){return c.a.createElement(p.ForceGraphArrowLink,{link:{source:e,target:t},targetRadius:5,key:"arrow|".concat(e,"=>").concat(t)})})}))))}}]),t}(s.Component);n.a.render(c.a.createElement(y,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.ec7ed958.chunk.js.map