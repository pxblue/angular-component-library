import { navItems } from './basic-config.stories';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export const navItems2 = [
    {
        title: 'Settings',
        itemID: 'group2_item1',
        icon: 'settings',
        onSelect: action('Settings'),
    },
    {
        title: 'Legal',
        itemID: 'group2_item2',
        icon: 'gavel',
        onSelect: action('Selected: Legal'),
    },
];

export const withMultiNavGroups = (): any => ({
    template: `
        <pxb-drawer [open]="state.open">
           <pxb-drawer-header title="PX Blue Drawer" subtitle="with multiple Nav Groups">
             <button pxb-icon mat-icon-button (click)="toggleDrawer(state)">
               <mat-icon>menu</mat-icon>
             </button>
           </pxb-drawer-header>
           <pxb-drawer-body>
              <pxb-drawer-nav-group [title]="groupTitle1" [divider]="true">
                 <pxb-drawer-nav-item *ngFor="let navItem of navItems1"
                    [title]="navItem.title"
                    [selected]="state.selected === navItem.title"
                    (select)="navItem.onSelect(); setActive(navItem.title, state);">
                    <mat-icon pxb-icon>{{ navItem.icon }}</mat-icon>
                 </pxb-drawer-nav-item>
              </pxb-drawer-nav-group>
              <pxb-spacer *ngIf="spacer"></pxb-spacer> 
              <pxb-drawer-nav-group [title]="groupTitle2" [divider]="true">
                 <pxb-drawer-nav-item *ngFor="let navItem of navItems2"
                    [title]="navItem.title"
                    [hidePadding]="true"
                    [selected]="state.selected === navItem.title"
                    (select)="navItem.onSelect(); setActive(navItem.title, state);">
                    <mat-icon pxb-icon>{{ navItem.icon }}</mat-icon>
                 </pxb-drawer-nav-item>
              </pxb-drawer-nav-group>
           </pxb-drawer-body>
        </pxb-drawer>
      `,
    props: {
        navItems1: navItems,
        navItems2: navItems2,
        groupTitle1: text('NavGroup 1 title', 'Group 1'),
        groupTitle2: text('NavGroup 2 title', 'Group 2'),
        spacer: boolean('Add Spacer', true),
    },
});
