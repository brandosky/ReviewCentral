import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn =(req,next)=>{
//se busca el token en el local storage
const token=localStorage.getItem('Token');


//si existe se clona la peticon y se agrega el token al header
if(token){
    const authReq=req.clone({
        setHeaders:{
            Authorization:`Bearer ${token}`
        }
    });
    return next(authReq);
}else{
    return next(req);
}

}
