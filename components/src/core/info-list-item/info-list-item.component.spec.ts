import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { count } from '../../utils/test-utils';
import { InfoListItemModule } from './info-list-item.module';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <pxb-info-list-item
            [statusColor]="statusColor"
            [chevron]="chevron"
            [dense]="dense"
            [avatar]="avatar"
            [hidePadding]="hidePadding"
            [wrapSubtitle]="wrapSubtitle"
            [wrapTitle]="wrapTitle"
            [divider]="divider"
        >
            <div title>Test Title</div>
            <div subtitle>Test Subtitle</div>
            <mat-icon icon>mail</mat-icon>
        </pxb-info-list-item>
    `,
})
class TestBasicUsage {
    @Input() statusColor;
    @Input() chevron;
    @Input() dense;
    @Input() avatar;
    @Input() hidePadding;
    @Input() wrapSubtitle;
    @Input() wrapTitle;
    @Input() divider: any;
}

@Component({
    template: `
        <pxb-info-list-item>
            <div title>title</div>
            <mat-icon icon>mail</mat-icon>
        </pxb-info-list-item>
    `,
})
class TestIconComponent {}

@Component({
    template: `
        <pxb-info-list-item> </pxb-info-list-item>
    `,
})
class TestMissingTitle {}

@Component({
    template: `
        <pxb-info-list-item>
            <div title>title</div>
            <div leftContent class="test-left">lefty</div>
        </pxb-info-list-item>
    `,
})
class TestLeftContent {}

@Component({
    template: `
        <pxb-info-list-item>
            <div title>title</div>
            <div rightContent class="test-right">righty</div>
        </pxb-info-list-item>
    `,
})
class TestRightContent {}

describe('InfoListItemComponent', () => {
    let component: TestBasicUsage;
    let fixture: ComponentFixture<TestBasicUsage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestBasicUsage, TestMissingTitle, TestIconComponent, TestLeftContent, TestRightContent],
            imports: [InfoListItemModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBasicUsage);
        component = fixture.componentInstance;
    });

    it('should initialize', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render a title', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pxb-info-list-item-title-wrapper').innerHTML).toContain(
            'Test Title'
        );
    });

    it('should render a subtitle', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.pxb-info-list-item-subtitle-wrapper').innerHTML).toContain(
            'Test Subtitle'
        );
    });

    it('should throw a warning if a title is not provided', () => {
        const customFixture = TestBed.createComponent(TestMissingTitle);
        const warnSpy = spyOn(console, 'warn').and.stub();
        customFixture.detectChanges();
        expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('should render an icon', () => {
        const customFixture = TestBed.createComponent(TestIconComponent);
        customFixture.detectChanges();
        expect(customFixture.nativeElement.querySelector('mat-icon').innerHTML).toBe('mail');
    });

    it('should render a left component', () => {
        const customFixture = TestBed.createComponent(TestLeftContent);
        customFixture.detectChanges();
        expect(customFixture.nativeElement.querySelector('.test-left').innerHTML).toBe('lefty');
    });

    it('should render a right component', () => {
        const customFixture = TestBed.createComponent(TestRightContent);
        customFixture.detectChanges();
        expect(customFixture.nativeElement.querySelector('.test-right').innerHTML).toBe('righty');
    });

    it('should have a default height of 72px', () => {
        fixture.detectChanges();
        const root = fixture.debugElement.query(By.css('.pxb-info-list-item'));
        expect(root.nativeElement.children[0].offsetHeight).toBe(72);
    });

    it('should have a dense height of 52px', () => {
        component.dense = true;
        fixture.detectChanges();
        const root = fixture.debugElement.query(By.css('.pxb-info-list-item'));
        expect(root.nativeElement.children[0].offsetHeight).toBe(52);
    });

    it('should enforce class naming conventions', () => {
        component.divider = 'full';
        component.avatar = true;
        component.hidePadding = true;
        fixture.detectChanges();
        const classList = [
            '.pxb-info-list-item',
            '.pxb-info-list-item-icon-wrapper',
            '.pxb-info-list-item-left-content-wrapper',
            '.pxb-info-list-item-title-wrapper',
            '.pxb-info-list-item-subtitle-wrapper',
            '.pxb-info-list-item-spacer',
            '.pxb-info-list-item-divider',
            '.pxb-info-list-item-avatar',
            '.pxb-info-list-item-hide-padding',
            '.pxb-info-list-item-right-content',
            '.pxb-info-list-item-right-content-wrapper',
        ];
        for (const className of classList) {
            count(fixture, className);
        }
    });
});
