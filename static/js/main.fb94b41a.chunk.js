(this["webpackJsonpgoit-react-hw-04-hooks-images"]=this["webpackJsonpgoit-react-hw-04-hooks-images"]||[]).push([[0],{13:function(e,t,a){e.exports={Overlay:"Modal_Overlay__QVtZw",Modal:"Modal_Modal__1fY3k",Image:"Modal_Image__1VpLV"}},17:function(e,t,a){e.exports={ImageGalleryItem:"ImageGalleryItem_ImageGalleryItem__6_0Is","ImageGalleryItem-image":"ImageGalleryItem_ImageGalleryItem-image__1jey7"}},32:function(e,t,a){e.exports={Button:"Button_Button__12Mo7"}},33:function(e,t,a){e.exports={App:"App_App__2JPUB"}},38:function(e,t,a){},7:function(e,t,a){e.exports={Searchbar:"Searchbar_Searchbar__JxX5M",SearchForm:"Searchbar_SearchForm__1b84S","SearchForm-button":"Searchbar_SearchForm-button__3ltFN","SearchForm-button-label":"Searchbar_SearchForm-button-label__2D9dt","SearchForm-input":"Searchbar_SearchForm-input__3TwKa"}},80:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(5),o=a.n(c),s=(a(38),a(4)),i=a(6),u=(a(19),a(7)),l=a.n(u),h=a(1);function m(e){var t=e.onSubmitSearchQuery,a=Object(r.useState)(""),n=Object(s.a)(a,2),c=n[0],o=n[1],u=function(){o("")};return Object(h.jsx)("header",{className:l.a.Searchbar,children:Object(h.jsxs)("form",{className:l.a.SearchForm,onSubmit:function(e){if(e.preventDefault(),c.trim())return t(c),void u();Object(i.b)("Please, enter your request in search field",{toastId:"Searchbar-toast"})},children:[Object(h.jsx)("button",{type:"submit",className:l.a["SearchForm-button"],children:Object(h.jsx)("span",{className:l.a["SearchForm-button-label"],children:"Search"})}),Object(h.jsx)("input",{className:l.a["SearchForm-input"],type:"text",autoComplete:"off",autoFocus:!0,placeholder:"Search images and photos",value:c,onChange:function(e){var t=e.target.value;o(t)}})]})})}var b=a(18),g=a(15),j=a.n(g),f=a(28),d=a(29),O=a(30),p=a(16),_=a.n(p),y=function(){function e(){Object(d.a)(this,e),this.BASE_URL="https://pixabay.com/api/",this.KEY="23997684-9eb4ec0071398138bd37e685f",this.IMAGE_TYPE="photo",this.ORIENTATION="horizontal",this.PER_PAGE=12,this.MAX_PAGES=42,this.searchQuery="",this.page=1}return Object(O.a)(e,[{key:"fetchPictures",value:function(){var e=Object(f.a)(j.a.mark((function e(){var t,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _.a.defaults.baseURL=this.BASE_URL,t="?image_type=".concat(this.IMAGE_TYPE,"&orientation=").concat(this.ORIENTATION,"&q=").concat(this.searchQuery,"&page=").concat(this.page,"&per_page=").concat(this.PER_PAGE,"&key=").concat(this.KEY,"\n"),e.next=4,_.a.get(t);case 4:if(200!==(a=e.sent).status){e.next=7;break}return e.abrupt("return",a.data);case 7:return e.abrupt("return",Promise.reject(new Error("Error fetching data")));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"query",set:function(e){this.searchQuery=e}},{key:"incPage",value:function(){this.page+=1}},{key:"resetPage",value:function(){this.page=1}},{key:"reachMaxPage",value:function(){return this.page>=this.MAX_PAGES}}]),e}(),I=a(31),S=a.n(I),x=(a(79),a(9)),v=a.n(x),P=a(17),E=a.n(P);function G(e){var t=e.galleryImageURL,a=e.largeImageURL,r=e.tags,n=e.openModal;return Object(h.jsx)("li",{className:E.a.ImageGalleryItem,onClick:function(){n(a,r)},children:Object(h.jsx)("img",{className:E.a["ImageGalleryItem-image"],src:t,"data-src":a,alt:r})})}var L=a(32),M=a.n(L);function w(e){var t=e.loadMorePictures;return Object(h.jsx)("button",{className:M.a.Button,onClick:t,children:"Load more"})}var F="idle",N="pending",R="resolved",k="rejected",A=new y;function U(e){var t=e.searchQuery,a=e.openModal,n=Object(r.useState)(F),c=Object(s.a)(n,2),o=c[0],u=c[1],l=Object(r.useState)([]),m=Object(s.a)(l,2),g=m[0],j=m[1],f=Object(r.useState)(null),d=Object(s.a)(f,2),O=d[0],p=d[1],_=Object(r.useState)(!1),y=Object(s.a)(_,2),I=y[0],x=y[1],P=""===t,E=0!==g.length,L=Object(r.useRef)(!1),M=Object(r.useCallback)((function(){A.fetchPictures().then((function(e){return e.hits.map((function(e){return{webformatURL:e.webformatURL,largeImageURL:e.largeImageURL,tags:e.tags}}))})).then((function(e){L.current=e.length<12,0!==e.length||U("There are no results on your search query. Please, enter another request."),j((function(t){return[].concat(Object(b.a)(t),Object(b.a)(e))})),u(R)})).catch((function(e){p(e),u(k)}))}),[]);Object(r.useEffect)((function(){P||(A.query=t,A.resetPage(),j([]),u(N),M(),window.scroll(0,0))}),[M,P,t]),Object(r.useEffect)((function(){P||I&&(A.incPage(),x(!1),u(N),M())}),[M,I,P]);var U=function(e){Object(i.b)(e,{toastId:"ImageGallery-toast"})};return o===F?Object(h.jsx)("p",{className:v.a["ImageGallery-text"],children:"Please, enter your search query to find pictures"}):o===k?(U(O.message),Object(h.jsx)("p",{className:v.a["ImageGallery-text"],children:"Error fetching data"})):Object(h.jsxs)(h.Fragment,{children:[E&&Object(h.jsx)("ul",{className:v.a.ImageGallery,children:g.map((function(e,t){var r=e.webformatURL,n=e.largeImageURL,c=e.tags;return Object(h.jsx)(G,{galleryImageURL:r,largeImageURL:n,tags:c,openModal:a},t)}))}),o===N&&Object(h.jsx)("div",{className:v.a["Loader-container"],children:Object(h.jsx)(S.a,{type:"Puff",color:"#00BFFF",height:300,width:300})}),!L.current&&o===R&&!A.reachMaxPage()&&Object(h.jsx)(w,{loadMorePictures:function(){x(!0)}})]})}var B=a(13),T=a.n(B),C=document.querySelector("#modal-root");function q(e){var t=e.closeModal,a=e.largeImageURL,n=e.tags;Object(r.useEffect)((function(){return window.addEventListener("keydown",o),function(){window.removeEventListener("keydown",o)}}));var o=function(e){"Escape"===e.code&&t()};return Object(c.createPortal)(Object(h.jsx)("div",{className:T.a.Overlay,onClick:function(e){e.target===e.currentTarget&&t()},children:Object(h.jsx)("div",{className:T.a.Modal,children:Object(h.jsx)("img",{className:T.a.Image,src:a,alt:n})})}),C)}var Q=a(33),Y=a.n(Q);function J(){var e=Object(r.useState)(""),t=Object(s.a)(e,2),a=t[0],n=t[1],c=Object(r.useState)(!1),o=Object(s.a)(c,2),u=o[0],l=o[1],b=Object(r.useState)(""),g=Object(s.a)(b,2),j=g[0],f=g[1],d=Object(r.useState)(""),O=Object(s.a)(d,2),p=O[0],_=O[1],y=function(){l((function(e){return!e}))};return Object(h.jsxs)("div",{className:Y.a.App,children:[Object(h.jsx)(m,{onSubmitSearchQuery:function(e){n(e)}}),Object(h.jsxs)("main",{children:[Object(h.jsx)(U,{searchQuery:a,openModal:function(e,t){y(),f(e),_(t)}}),u&&Object(h.jsx)(q,{closeModal:y,largeImageURL:j,tags:p}),Object(h.jsx)(i.a,{autoClose:3e3})]})]})}var D=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,81)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,o=t.getTTFB;a(e),r(e),n(e),c(e),o(e)}))};o.a.render(Object(h.jsx)(n.a.StrictMode,{children:Object(h.jsx)(J,{})}),document.getElementById("root")),D()},9:function(e,t,a){e.exports={ImageGallery:"ImageGallery_ImageGallery__1S6AB","ImageGallery-text":"ImageGallery_ImageGallery-text__1s-lj","Loader-container":"ImageGallery_Loader-container__268L4"}}},[[80,1,2]]]);
//# sourceMappingURL=main.fb94b41a.chunk.js.map