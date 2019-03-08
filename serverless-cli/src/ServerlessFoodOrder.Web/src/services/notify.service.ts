import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotifyService {
    constructor(private toastr: ToastrService) { }

    success(title: string, body?: string): void {
        this.toastr.success(title, body);
    }

    error(title: string, body?: string): void {
        this.toastr.error(title, body);
    }
}
