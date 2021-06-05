(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"3ysS":function(t,n,r){"use strict";r.r(n),r.d(n,"LoginLayoutModule",(function(){return st}));var o=r("tyNb"),e=r("ofXK"),i=r("3Pt+"),a=r("lGQG"),s=r("zD6u");let c={username:"",password:""},m={username:{required:"User name is required.",minlength:"User name must be at least 4 characters long.",maxlength:"User name must be at most 20 characters long."},password:{required:"Password is required.",minlength:"Password must be at least 6 characters long."}};var p=r("fXoL"),b=r("XiUz"),l=r("Wp6s"),d=r("kmnG"),u=r("qFsG"),f=r("bTqV"),g=r("NFeN"),h=r("Xa2L");function w(t,n){if(1&t&&(p.Ub(0,"mat-error"),p.Mc(1),p.Tb()),2&t){const t=p.kc();p.Bb(1),p.Nc(t.formErrors.username)}}function M(t,n){if(1&t&&(p.Ub(0,"mat-error"),p.Mc(1),p.Tb()),2&t){const t=p.kc();p.Bb(1),p.Nc(t.formErrors.password)}}function y(t,n){if(1&t&&(p.Ub(0,"mat-error"),p.Mc(1),p.Tb()),2&t){const t=p.kc();p.Bb(1),p.Nc(t.validationErrors.errmsg)}}function x(t,n){1&t&&p.Pb(0,"mat-spinner",12),2&t&&p.qc("diameter",35)}function j(t,n){1&t&&(p.Ub(0,"mat-label"),p.Mc(1," Log in"),p.Tb())}const v=[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:(()=>{class t{constructor(t,n,r,o){this.formBuilder=t,this.authService=n,this.interactionService=r,this.router=o,this.submitted=!1,this.hide=!0}ngOnInit(){this.buildLoginForm()}buildLoginForm(){this.loginForm=this.formBuilder.group({username:[{value:"",disabled:this.submitted},[i.v.required,i.v.minLength(4),i.v.maxLength(20)]],password:[{value:"",disabled:this.submitted},[i.v.required,i.v.minLength(6)]]}),this.loginForm.valueChanges.subscribe(t=>{this.formErrors=function(t,n){if(console.log(n),!n)return;const r=n;for(const o in c)if(c.hasOwnProperty(o)){c[o]="";const t=r.get(o);if(t&&t.dirty&&!t.valid){const n=m[o];for(const r in t.errors)t.errors.hasOwnProperty(r)&&(c[o]+=n[r]+" ")}}return c}(0,this.loginForm),console.log(this.formErrors)})}login(){this.submitted=!0,this.authService.login(this.loginForm.value.password,this.loginForm.value.username).then(t=>{this.submitted=!1,t&&0!=t?this.goToDashboard():this.showSnackBar("Something Went Wrong !","ERROR")}).catch(t=>{this.submitted=!1,this.validationErrors=t,console.log(t),this.showSnackBar(t.errmsg+" !","ERROR")})}goToDashboard(){this.showSnackBar("WELCOM","SUCCESS"),this.router.navigate(["dashboard"])}showSnackBar(t,n=""){this.interactionService.openSnackBar(t,"bottom","center",n)}}return t.\u0275fac=function(n){return new(n||t)(p.Ob(i.d),p.Ob(a.a),p.Ob(s.a),p.Ob(o.b))},t.\u0275cmp=p.Ib({type:t,selectors:[["app-login"]],decls:22,vars:11,consts:[["fxLayout","row","fxLayoutAlign","center center",1,"login-wrapper"],[1,"box"],["novalidate","",1,"login-form",3,"formGroup"],[1,"full-width"],["matInput","","placeholder","Username","formControlName","username"],[4,"ngIf"],["matInput","","placeholder","Password","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["mat-stroked-button","","color","accent",1,"btn-block",3,"disabled","click"],["mode","indeterminate",3,"diameter",4,"ngIf"],[1,"absolute-position"],["src","../../../assets/img/image-background.jpg"],["mode","indeterminate",3,"diameter"]],template:function(t,n){1&t&&(p.Ub(0,"div",0),p.Ub(1,"mat-card",1),p.Ub(2,"mat-card-header"),p.Ub(3,"mat-card-title"),p.Mc(4,"Log in"),p.Tb(),p.Tb(),p.Ub(5,"form",2),p.Ub(6,"mat-card-content"),p.Ub(7,"mat-form-field",3),p.Pb(8,"input",4),p.Kc(9,w,2,1,"mat-error",5),p.Tb(),p.Ub(10,"mat-form-field",3),p.Pb(11,"input",6),p.Ub(12,"button",7),p.gc("click",(function(){return n.hide=!n.hide})),p.Ub(13,"mat-icon"),p.Mc(14),p.Tb(),p.Tb(),p.Kc(15,M,2,1,"mat-error",5),p.Tb(),p.Kc(16,y,2,1,"mat-error",5),p.Tb(),p.Ub(17,"button",8),p.gc("click",(function(){return n.login()})),p.Kc(18,x,1,1,"mat-spinner",9),p.Kc(19,j,2,0,"mat-label",5),p.Tb(),p.Tb(),p.Tb(),p.Ub(20,"div",10),p.Pb(21,"img",11),p.Tb(),p.Tb()),2&t&&(p.Bb(5),p.qc("formGroup",n.loginForm),p.Bb(4),p.qc("ngIf",n.formErrors&&n.formErrors.username),p.Bb(2),p.qc("type",n.hide?"password":"text"),p.Bb(1),p.Cb("aria-label","Hide password")("aria-pressed",n.hide),p.Bb(2),p.Nc(n.hide?"visibility_off":"visibility"),p.Bb(1),p.qc("ngIf",n.formErrors&&n.formErrors.password),p.Bb(1),p.qc("ngIf",n.validationErrors&&2==n.validationErrors.errcode),p.Bb(1),p.qc("disabled",n.loginForm.invalid||n.submitted),p.Bb(1),p.qc("ngIf",n.submitted),p.Bb(1),p.qc("ngIf",!n.submitted))},directives:[b.b,b.a,l.a,l.c,l.e,i.x,i.o,i.h,l.b,d.c,u.b,i.c,i.n,i.f,e.m,f.a,d.g,g.a,d.b,h.b,d.f],styles:['body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{height:100%!important}body[_ngcontent-%COMP%]{margin:0!important;font-family:Roboto,Helvetica Neue,sans-serif!important;min-height:100vh!important;background:#e2e2e2!important}.app-header[_ngcontent-%COMP%]{justify-content:space-between!important;position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:2!important;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)!important}.login-wrapper[_ngcontent-%COMP%]{height:100%!important;background-color:#f4f3ef}.positronx[_ngcontent-%COMP%]{text-decoration:none!important;color:#fff!important}.box[_ngcontent-%COMP%]{position:relative!important;top:0!important;opacity:1!important;float:left!important;padding:60px 50px 40px!important;width:100%!important;background:#fff!important;border-radius:10px!important;transform:scale(1)!important;-webkit-transform:scale(1)!important;-ms-transform:scale(1)!important;z-index:5!important;max-width:330px!important}.box.back[_ngcontent-%COMP%]{top:-20px!important;opacity:.8!important}.box.back[_ngcontent-%COMP%], .box[_ngcontent-%COMP%]:before{transform:scale(.95)!important;-webkit-transform:scale(.95)!important;-ms-transform:scale(.95)!important;z-index:-1!important}.box[_ngcontent-%COMP%]:before{content:""!important;width:100%!important;height:30px!important;border-radius:10px!important;position:absolute!important;top:-10px!important;background:hsla(0,0%,100%,.6)!important;left:0!important}.login-wrapper[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{min-width:100%!important;max-width:300px!important;width:100%!important}.login-wrapper[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{width:100%!important;height:60px;margin-top:15px}.login-wrapper[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]{width:100%!important;height:50px}.login-wrapper[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{text-align:center!important;width:100%!important;display:block!important;font-weight:700!important}.login-wrapper[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:30px!important;margin:0!important}.login-wrapper[_ngcontent-%COMP%]   .mat-card[_ngcontent-%COMP%]{padding:40px 70px 50px!important}.login-wrapper[_ngcontent-%COMP%]   .mat-stroked-button[_ngcontent-%COMP%]{border:1px solid!important;line-height:54px!important;background:#fff7fa!important}.login-wrapper[_ngcontent-%COMP%]   .mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]{padding:.8375em 0!important}mat-spinner[_ngcontent-%COMP%]{margin:0 auto}.absolute-position[_ngcontent-%COMP%]{position:absolute}.absolute-position[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}']}),t})()},{path:"**",redirectTo:"login"}];var O=r("rDax");r("0EQZ"),r("7+OI"),r("XNiG"),r("2Vo4"),r("LRne"),r("IzEk"),r("pLZG"),r("1G5W"),r("8LU1"),r("cH1L");let P=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)}}),t})();var C=r("+rOU"),L=r("u47x"),_=r("nLfN"),k=r("FKr1"),U=(r("quSY"),r("NXyV"),r("VRyK"),r("xgIS"),r("vxfF"));r("FtGj"),r("eIep"),r("lJxs"),r("vkgz"),r("3E0/");const S={provide:new p.s("mat-autocomplete-scroll-strategy"),deps:[O.c],useFactory:function(t){return()=>t.scrollStrategies.reposition()}};let T=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},providers:[S],imports:[[O.f,k.o,k.j,e.c],U.b,k.o,k.j]}),t})(),B=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[k.j,k.t],k.j]}),t})();var E=r("bSwM"),q=r("A5z7");let I=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[k.j],k.j]}),t})(),F=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)}}),t})();r("/uUt"),r("JX91"),r("R1ws"),r("EY2u"),r("R0Ic");let N=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[e.c,k.j,F,C.f]]}),t})(),G=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[k.l,k.t,k.j,k.r,e.c],k.l,k.j,k.r,I]}),t})();r("7Hc7");const R={provide:new p.s("mat-menu-scroll-strategy"),deps:[O.c],useFactory:function(t){return()=>t.scrollStrategies.reposition()}};let K=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},providers:[R],imports:[k.j]}),t})(),z=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},providers:[R],imports:[[e.c,k.j,k.t,O.f,K],U.b,k.j,K]}),t})();var X=r("M9IT"),D=r("d3UM");r("7o/Q"),r("Kj3r");let V=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[e.c,k.j,_.b,U.b],U.b,k.j]}),t})();var W=r("dNgK"),H=r("Dh3D"),J=r("+0xr"),Q=r("GU7r");r("PqYM");let Y=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[e.c,k.j,C.f,k.t,Q.c,L.a],k.j]}),t})(),A=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[k.j],k.j]}),t})(),Z=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[P,k.j],k.j]}),t})(),$=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[L.a,k.j],k.j]}),t})(),tt=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[k.l,k.j],k.l,k.j]}),t})(),nt=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[k.t,k.j],k.j]}),t})();var rt=r("iadO"),ot=r("Qu3c"),et=r("1kSV"),it=r("YUcS");const at=[P,T,f.b,l.d,E.a,q.a,I,N,g.b,u.c,G,z,h.a,X.b,k.t,D.b,V,W.b,H.c,J.m,Y,A,d.e,B,Z,O.f,C.f,$,tt,nt,rt.e,ot.b];let st=(()=>{class t{}return t.\u0275mod=p.Mb({type:t}),t.\u0275inj=p.Lb({factory:function(n){return new(n||t)},imports:[[e.c,o.e.forChild(v),i.i,et.f,i.t,it.a,at]]}),t})()}}]);