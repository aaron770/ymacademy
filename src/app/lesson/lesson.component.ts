import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { FromEventObservable  } from 'rxjs/observable/fromeventobservable'

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements AfterViewInit  {
  constructor() { }

  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // Observable
    //   // this will capture all mousedown events from teh canvas element
    //   .FromEventObservable(canvasEl, 'mousedown')
    //   .switchMap((e) => {
    //     return Observable
    //       // after a mouse down, we'll record all mouse moves
    //       .fromEvent(canvasEl, 'mousemove')
    //       // we'll stop (and unsubscribe) once the user releases the mouse
    //       // this will trigger a 'mouseup' event
    //       .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
    //       // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
    //       .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
    //       // pairwise lets us get the previous value to draw a line from
    //       // the previous point to the current point
    //       .pairwise()
    //   })
    //   .subscribe((res: [MouseEvent, MouseEvent]) => {
    //     const rect = canvasEl.getBoundingClientRect();

    //     // previous and current position with the offset
    //     const prevPos = {
    //       x: res[0].clientX - rect.left,
    //       y: res[0].clientY - rect.top
    //     };

    //     const currentPos = {
    //       x: res[1].clientX - rect.left,
    //       y: res[1].clientY - rect.top
    //     };

    //     // this method we'll implement soon to do the actual drawing
    //     this.drawOnCanvas(prevPos, currentPos);
    //   });
  }

}
