"use strict";(self["webpackChunkvue_week6"]=self["webpackChunkvue_week6"]||[]).push([[505],{505:function(t,s,c){c.r(s),c.d(s,{default:function(){return m}});var r=c(252),o=c(577);const a=(0,r._)("h2",null,"單一產品",-1),e={class:"container"},u={class:"row row-clos-1 row-cols-lg-4 g-3"},d={class:"col"},i={class:"card h-100"},l=["src"],n={class:"card-body"},p={class:"card-title"},h={class:"card-text"},v={class:"footer px-3"};function g(t,s,c,g,_,k){return(0,r.wg)(),(0,r.iD)(r.HY,null,[a,(0,r._)("div",e,[(0,r._)("div",u,[(0,r._)("div",d,[(0,r._)("div",i,[(0,r._)("img",{src:_.product.imageUrl,class:"card-img-top",alt:"product.title"},null,8,l),(0,r._)("div",n,[(0,r._)("h5",p,(0,o.zw)(_.product.title),1),(0,r._)("p",h,(0,o.zw)(_.product.description),1)]),(0,r._)("div",v,[(0,r._)("input",{type:"button",onClick:s[0]||(s[0]=(...t)=>k.goBack&&k.goBack(...t)),class:"btn btn-primary",value:"上一頁"})])])])])])],64)}var _={data(){return{product:{}}},methods:{getProduts(){const{id:t}=this.$route.params;this.$http(`https://vue3-course-api.hexschool.io/v2/api/vuetestproducts/product/${t}`).then((t=>{this.product=t.data.product})).catch((t=>{alert(t.data.message)}))},goBack(){this.$router.go(-1)}},mounted(){this.getProduts()}},k=c(744);const w=(0,k.Z)(_,[["render",g]]);var m=w}}]);
//# sourceMappingURL=505.d53fadbc.js.map