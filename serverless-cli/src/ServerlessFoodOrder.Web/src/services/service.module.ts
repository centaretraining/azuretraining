import { NgModule } from '@angular/core';
import { MenuService } from './menu.service';
import { UrlService } from './url.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';
import { OrderService } from './order.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyService } from './notify.service';

@NgModule({
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [
        CartService,
        MenuService,
        NotifyService,
        OrderService,
        UrlService
    ]
})
export class ServiceModule { }
