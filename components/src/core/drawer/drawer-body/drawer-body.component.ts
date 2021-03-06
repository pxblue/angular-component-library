import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { StateListener } from '../state-listener.component';
import { DrawerService } from '../service/drawer.service';

@Component({
    selector: 'pxb-drawer-body',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="pxb-drawer-body-content" [class.pxb-drawer-body-closed]="!isOpen()">
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `
            .pxb-drawer-body-content {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .pxb-drawer-body-closed {
                overflow: hidden;
            }
        `,
    ],
    host: {
        class: 'pxb-drawer-body',
    },
})
export class DrawerBodyComponent extends StateListener {
    constructor(drawerService: DrawerService, changeDetectorRef: ChangeDetectorRef) {
        super(drawerService, changeDetectorRef);
    }
}
