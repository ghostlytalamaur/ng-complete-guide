import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal',
        style(
          {
            'background-color': 'red',
            transform: 'translateX(0)'
          }
        )
      ),
      state('highlighted',
        style(
          {
            'background-color': 'blue',
            transform: 'translateX(100px)'
          }
        )
      ),
      state('shrunken',
        style(
          {
            backgroundColor: 'gray',
            transform: 'translate(0) scale(0.75)'
          }
        )
      ),
      transition('normal <=> highlighted',
        [
          animate(300,
            style(
              {
                backgroundColor: '#6f0',
                transform: 'scale(0.5)'
              }
            )
          ),
          animate(300)
        ]
      ),
      transition('shrunken <=> *',
        [
          style(
            {
              backgroundColor: 'orange'
            }
          ),
          animate(1000,
            style(
              {
                borderRadius: '50px'
              }
            )
          ),
          animate(500)
        ]
      )
    ]),

    trigger('wildState', [
      state('normal',
        style(
          {
            backgroundColor: 'red',
            transform: 'translateX(0) scale(1)'
          }
        )
      ),
      state('highlighted',
        style(
          {
            backgroundColor: 'blue',
            transform: 'translateX(100px) (scale(1)'
          }
        )
      ),
      state('shrunken',
        style(
          {
            backgroundColor: 'green',
            transform: 'translateX(50px) scale(0.5)'
          }
        )
      ),
      transition('normal => highlighted', animate(300)),
      transition('shrunken <=> *',
        animate(800,
          style({
              borderRadius: '50px'
            }
          )
        )
      )
    ]),

    trigger('list1', [

      state('in',
        style(
          {
            opacity: 1,
            transform: 'translateX(0)'
          }
        )
      ),

      transition('void => in',
        [
          style(
            {
              opacity: 0,
              transform: 'translateX(-100px)'
            }
          ),
          animate(300)
        ]
      )
    ]),
  ]
})

export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onDelete(item: string) {
    this.list = this.list.filter(i => i !== item);
  }

  onShrink() {
    this.state === 'shrunken' ? this.state = 'normal' : this.state = 'shrunken';
    this.wildState === 'shrunken' ? this.wildState = 'normal' : this.wildState = 'shrunken';
  }
}
